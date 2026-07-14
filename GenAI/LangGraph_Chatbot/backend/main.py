from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel, Field
from chatbot import answering_prompt, get_message_history, history_generator, initialize
from fastapi.middleware.cors import CORSMiddleware
import uuid
import aiofiles
import aiosqlite


@asynccontextmanager
async def lifespan(app: FastAPI):

    app.state.db = await aiosqlite.connect("agent_memory.db")
    if app.state.db:
        print("DB Connection Stablished")
    await initialize()
    print("Chatbot initialized")
    yield
    await app.state.db.close()
    print("Shutting down")


app = FastAPI(lifespan=lifespan)


origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Thread-ID", "Cache-Control"],
)


class Message(BaseModel):
    message: str = Field(description="user prompt")
    thread_id: str | None = Field(
        default=None, description="thread Id of the conversation"
    )


class ThreadState(BaseModel):
    thread_id: str = Field(description="thread id of the conversation")


@app.post("/generate")
async def generate(message: Message, response: Response, request: Request):
    print(message)

    if message.thread_id=="None" or message.thread_id==None:
        message.thread_id=uuid.uuid4()   
        print("message: ",message.thread_id)
    
    header = {
        "X-Thread-ID": str(message.thread_id),
        "Cache-Control": "no-cache",
    }
 
        
    stream = StreamingResponse(
        answering_prompt(message.message, message.thread_id),
        media_type="text/plain",
        headers=header,
    )

    return stream


@app.get("/all-thread")
async def GetAllThread():
    async with app.state.db.execute("""
        SELECT DISTINCT thread_id FROM checkpoints;
    """) as cursor:
        list = await cursor.fetchall()

    final_list = [l[0] for l in list]
    return {"thread_id_list": final_list}


@app.post("/get-chat-by-thread-id")
async def GetChatByThreadID(thread: ThreadState):
    try:
        return StreamingResponse(
            history_generator(await get_message_history(thread_id=thread.thread_id)),
            media_type="text/event-stream",
        )

    except Exception as error:
        return error
