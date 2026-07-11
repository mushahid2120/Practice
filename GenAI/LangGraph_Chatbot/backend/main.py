from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from chatbot import answering_prompt
from fastapi.middleware.cors import CORSMiddleware
import aiofiles

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message:str=Field(description="user prompt")           


@app.post("/generate")
async def generate(message:Message):
    print(message,type(message))
    # gen_text=await answering_prompt(message.message)
    return StreamingResponse(
        answering_prompt(message.message),
        media_type="text/plain",
    )

    
    