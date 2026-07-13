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

model = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")
 
_saver_context = None
chatbot = None

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

async def initialize():
    print("initialzation.....")
    global _saver_context, chatbot
    _saver_context = AsyncSqliteSaver.from_conn_string(
    "agent_memory.db"
    )

    saver = await _saver_context.__aenter__()
    saver.setup()
    chatbot=graph.compile(checkpointer=saver)
        
        

async def answering_prompt(question):
    global _saver_context,chatbot
    print("Generating answer.....",_saver_context,chatbot)
    thread_id='1'
    config={'configurable': {'thread_id':thread_id}}
    async for item in chatbot.astream({'message':[HumanMessage(content=question)]},config=config,stream_mode="messages",version="v2"):
        if(item['type']=="messages" and len(item['data'][0].content) != 0):
            yield item['data'][0].content[0]['text']
            # print(item['data'][0].content[0]['text'])


async def main():
    await initialize()
    await answering_prompt(
        "write essay in 200 words in topic of Indian economy"
    )

if __name__ == "__main__":
    asyncio.run(main())


