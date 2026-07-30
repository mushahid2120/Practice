from langgraph.types import interrupt
from email import message
import json
from time import sleep
from click import BOOL
from fastapi import sse
from langgraph.graph import StateGraph, START, END
from typing import TypedDict, Annotated
from langchain_core.messages import (
    BaseMessage,
    HumanMessage,
    AIMessageChunk,
    AIMessage,
    ToolMessage,
    SystemMessage
)
from langgraph.graph.message import add_messages
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import ToolNode
from langgraph.types import interrupt, Command
from dotenv import load_dotenv
from tavily import AsyncTavilyClient
from langchain_core.tools import tool
import os
import asyncio

from rag import search_docs

load_dotenv()

tavily_client = AsyncTavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


running_tasks: dict[str, asyncio.Task] = {}
_saver_context = None
chatbot = None
saver = None
mcp_tools = None
model = None
tool_node = None
all_tools = None
graph = None
tools = None
add_file_data = {}


def sse(event: str, data: dict):
    return f"event: {event}\ndata: {json.dumps(data)}\n\n"


@tool
async def web_search(query: str) -> str:
    """Search the web using Tavily."""
    print("Web Searching....")
    response = await tavily_client.search(query=query, max_results=2)
    result = []
    for content in response["results"]:
        result.append(content["content"])
    return "\n".join(item["content"] for item in response["results"])



async def init_mcp():
    global mcp_tools
    client = MultiServerMCPClient(
        {
            "expense_tracker": {
                "transport": "http",
                "url": "https://mushahid-mcp-expense-tracker.fastmcp.app/mcp",
                # "url":"http://localhost:8000/mcp"
                "headers": {
                    "Authorization": f"Bearer {os.getenv('MCP_SERVER_API_KEY')}"
                },
            }
        }
    )

    mcp_tools = await client.get_tools()


def build_all_tool():
    global all_tools
    all_tools = [
        web_search,
        *mcp_tools,
    ]


async def build_tools(tool_list: list[str] | None):
    global tools, all_tools, chatbot, tool_node, saver
    if tool_node and set([*tool_node.tools_by_name]) == set(tool_list):
        return

    if not tool_list:
        tools = [search_docs]
    else:
        tools = [tool for tool in all_tools if tool.name in tool_list]
        tools.append(search_docs)
        build_model()
        graph = build_graph()

        chatbot = graph.compile(
            checkpointer=saver
        )


def build_model():
    global model

    if tools:
        print("with tool", tools)
        model = ChatGoogleGenerativeAI(
            model="gemini-3.1-flash-lite").bind_tools(tools)
    else:
        print("without tools")
        model = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")


class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    approved: bool


async def chat_node(state: ChatState):
    print("chatnode ....")
    messages = state["messages"]
    # decision = interrupt(
    #     {
    #         "type": "approval",
    #         "reason": "Model is about to answer a user question",
    #         "question": messages,
    #         "instruction": "Approve this question ? Yes / No",
    #     }
    # )
    response = await model.ainvoke(messages)
    return {"messages": [response]}


async def approval_node(state: ChatState):
    print("Approval node.....")
    last = state["messages"][-1]
    tool_calls = last.tool_calls
    decision = interrupt(
        {
            "type": "tool_approval",
            "tool_calls": tool_calls,
            "message": "Approve tool execution?",
        }
    )
    if decision["approved"]:
        return {"approved": True}

    return {
        "approved": False,
        "messages": [AIMessage(content="Tool execution was rejected by the user.")],
    }


def approval_router(state: ChatState):
    print("Approval Router ....")
    last = state["messages"][-1]
    if not last.tool_calls:
        return END
    elif(last.tool_calls[0]['name']=="search_docs"):
        return "search_docs"

    else:
        return "approval"
    



def after_approval_router(state: ChatState):
    if state.get("approved"):
        return "tool"
    return END


def build_graph():
    global tool_node, graph

    tool_node = ToolNode(tools)

    graph = StateGraph(ChatState)

    graph.add_node("chat_node", chat_node)
    graph.add_node("tool", tool_node)
    graph.add_node("approval", approval_node)

    graph.add_edge(START, "chat_node")

    graph.add_conditional_edges(
        "chat_node",
        approval_router,
        {
            "search_docs":"tool",
            "approval": "approval",
            END: END,
        },
    )     
    graph.add_conditional_edges(
        "approval",
        after_approval_router,
        {
            "tool": "tool",
            END: END,
        },
    )
    graph.add_edge("tool", "chat_node")
    return graph


async def initialize():
    print("initialzation.....")
    global _saver_context, chatbot, saver
    _saver_context = AsyncSqliteSaver.from_conn_string("agent_memory.db")

    saver = await _saver_context.__aenter__()
    await saver.setup()
    graph = build_graph()
    chatbot = graph.compile(checkpointer=saver)


async def resume_generation(thread_id: str, is_approved: bool):
    config = {"configurable": {"thread_id": thread_id}}

    async for item in chatbot.astream(
        Command(resume={"approved": is_approved}),
        config=config,
        stream_mode="messages",
        version="v2",
    ):
        if item["type"] != "messages":
            continue

        message = item["data"][0]

        if isinstance(message, AIMessageChunk):
            if message.content:
                text = message.content[0]["text"]
                yield sse(
                    "text",
                    {"content": text},
                )

        elif isinstance(message, AIMessage):
            yield sse(
                "text",
                {"content": message.content},
            )

    snapshot = await chatbot.aget_state(config)

    if snapshot.next:
        interrupt = snapshot.tasks[0].interrupts[0]

        yield sse("approval", interrupt.value)

    else:
        yield sse("done", {})


async def answering_prompt(question, thread_id):
    global _saver_context, chatbot, running_tasks
    if str(thread_id) in add_file_data:
        print("having system message....")
        context = add_file_data[thread_id]
        summaries = "\n\n".join(  
            f""" File: {f['name']}  
                    Summary:
                        {f['summary']}
                """ 
            for f in context
        )
        print("summaries: ",summaries)
        prompt = [SystemMessage(content=f"""
            The user has uploaded the following files.

            {summaries}

            If the user's question is likely answered by one of these files,
            call the search_docs tool before answering.

            if you go to the search_docs tool and don't get the clarity of by looking the tool result 
            then don't hallucinate simply say - 'I don't know the answer'

            Otherwise answer normally.
            """ 
        ), HumanMessage(content=question)]
        print("prompt: ",prompt)
    else:
        prompt = [HumanMessage(content=question)]

    config = {"configurable": {"thread_id": thread_id}}
    running_tasks[thread_id] = asyncio.current_task()
    try:
        async for item in chatbot.astream(
            {"messages": prompt},
            config=config,
            stream_mode="messages",
            version="v2",
        ):
            # print(item)

            if (
                item["type"] == "messages"
                and isinstance(item["data"][0], AIMessageChunk)
                and len(item["data"][0].content) != 0
            ):
                text = item["data"][0].content[0]["text"]

                yield sse("text", {"content": text})

        # Graph finished streaming
        snapshot = await chatbot.aget_state(config)

        for task in snapshot.tasks:
            if task.interrupts:
                yield sse(
                    "approval",
                    task.interrupts[0].value,
                )
                return

        yield sse("done", {})

    except asyncio.CancelledError:
        print(f"Generation cancelled for {thread_id}")
        raise
    finally:
        running_tasks.pop(thread_id, None)


async def get_message_history(thread_id):
    print("answering prompt...")
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
    # print(state_snapshot)
    # 3. Extract the messages array from your ChatState dict
    if state_snapshot and "messages" in state_snapshot.values:
        # print(state_snapshot.values)
        messages = state_snapshot.values["messages"]
        return messages

    return []


def history_generator(messages):
    current_question = None

    for message in messages:
        if not message.content:
            continue

        if isinstance(message, HumanMessage):
            current_question = message.content

        elif isinstance(message, AIMessage) and current_question:
            if isinstance(message.content, str):
                answer = message.content
            else:
                answer = "".join(
                    block.get("text", "")
                    for block in message.content
                    if isinstance(block, dict) and block.get("type") == "text"
                )

            yield (
                json.dumps(
                    {
                        "question": current_question,
                        "answer": answer,
                    }
                )
                + "\n"
            )

            current_question = None


async def delete_thread(thread_id: str):
    global saver
    print((thread_id))
    response = await saver.adelete_thread(thread_id=thread_id)
    return response


def get_tool_list():
    # print('hellow')
    t = [tool.name for tool in all_tools]
    return t


async def main():
    # await web_search("genz protest in the world")
    await init_mcp()
    build_all_tool()
    build_tools([])
    # build_model()
    # build_graph()
    get_tool_list()
    # await initialize()
    # async for item in resume_generation("a6345744-070d-4563-8d8f-20ac510c535c",True):
    #     print(item)
    # await delete_thread('thread-2')
    # async for item in answering_prompt(
    #     "total expense of this month 2026-07-07",
    #     "a6345744-070d-4563-8d8f-20ac510c535c",
    # ):
    #     print(item)

    # messages = await get_message_history(
    #     "27f1249b-1f40-46e4-8086-d4b6890fc4ab",
    # )

    # for item in history_generator(messages):
    #     print(item)


if __name__ == "__main__":
    asyncio.run(main())
