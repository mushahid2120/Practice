from langgraph.graph import StateGraph,START,END
from typing import TypedDict,Annotated
from langchain_core.messages import BaseMessage,HumanMessage
from langgraph.graph.message import add_messages
from langchain_google_genai import ChatGoogleGenerativeAI
import aiosqlite
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver
from dotenv import load_dotenv
import asyncio
load_dotenv()

async with AsyncSqliteSaver.from_conn_string("agent_memory.db") as memory:
model = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")

class ChatState(TypedDict):
    message: Annotated[list[BaseMessage],add_messages]

async def chat_node(state:ChatState):
    messages=state['message']
    response=await model.ainvoke(messages)
    return {'message': [response]}

graph=StateGraph(ChatState)
graph.add_node('chat_node',chat_node)
graph.add_edge(START,'chat_node')
graph.add_edge('chat_node',END)

chatbot=graph.compile(checkpointer=checkpointer)

thread_id='1'
async def answering_prompt(question:str):
    config={'configurable': {'thread_id':thread_id}}
    async for item in chatbot.astream({'message':[HumanMessage(content=question)]},config=config,stream_mode="messages",version="v2"):
        if(item['type']=="messages" and len(item['data'][0].content) != 0):
            yield item['data'][0].content[0]['text']


if __name__=="__main__":
    asyncio.run(answering_prompt("write essay in 200 words in topic of Indian economy"))


