import itertools
import json
from time import sleep
import uuid

from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph.message import add_messages
from langchain_google_genai import ChatGoogleGenerativeAI
import aiosqlite
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver
from langgraph.types import interrupt
from dotenv import load_dotenv
import asyncio

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")

running_tasks: dict[str, asyncio.Task] = {}
_saver_context = None
chatbot = None


class ChatState(TypedDict):
    message: Annotated[list[BaseMessage], add_messages]


async def chat_node(state: ChatState):
    messages = state["message"]
    # decision = interrupt(
    #     {
    #         "type": "approval",
    #         "reason": "Model is about to answer a user question",
    #         "question": messages,
    #         "instruction": "Approve this question ? Yes / No",
    #     }
    # )
    response = await model.ainvoke(messages)
    return {"message": [response]}


graph = StateGraph(ChatState)
graph.add_node("chat_node", chat_node)
graph.add_edge(START, "chat_node")
graph.add_edge("chat_node", END)


async def initialize():
    print("initialzation.....")
    global _saver_context, chatbot
    _saver_context = AsyncSqliteSaver.from_conn_string("agent_memory.db")

    saver = await _saver_context.__aenter__()
    await saver.setup()
    chatbot = graph.compile(checkpointer=saver)


async def answering_prompt(question, thread_id):
    global _saver_context, chatbot, running_tasks
    config = {"configurable": {"thread_id": thread_id}}
    running_tasks[thread_id] = asyncio.current_task()
    try:
        async for item in chatbot.astream(
            {"message": [HumanMessage(content=question)]},
            config=config,
            stream_mode="messages",
            version="v2",
        ):
            if item["type"] == "messages" and len(item["data"][0].content) != 0:
                yield item["data"][0].content[0]["text"]
                # print(item['data'][0].content[0]['text'])
    except asyncio.CancelledError:
        print(f"Generation cancelled for {thread_id}")
        raise
    finally:
        running_tasks.pop(thread_id, None)


async def get_message_history(thread_id):
    global chatbot
    if not chatbot:
        print("Chatbot not initialized yet.")
        return []

    # 1. Target the specific thread
    config = {"configurable": {"thread_id": str(thread_id)}}

    # 2. Retrieve the snapshot of that thread's state
    state_snapshot = await chatbot.aget_state(
        config
    )  # Note: use aget_state for async savers

    # 3. Extract the messages array from your ChatState dict
    if state_snapshot and "message" in state_snapshot.values:
        messages = state_snapshot.values["message"]
        return messages

    return []


def history_generator(messages):
    thread_length = len(messages) - 1
    current_index = 0
    while current_index <= thread_length:
        # print(question.content)
        if current_index + 1 < len(messages):
            payload={
                    "question": messages[current_index].content,
                    "answer": messages[current_index + 1].content[0]["text"],
                }
            current_index += 2
        else:
            payload={"question": messages[current_index].content}
            current_index += 1
        yield json.dumps(payload) + "\n" 
 

async def main():
    await initialize()
    # await answering_prompt(
    #     "write essay in 200 words in topic of Indian economy"
    # )


if __name__ == "__main__":
    asyncio.run(main())
