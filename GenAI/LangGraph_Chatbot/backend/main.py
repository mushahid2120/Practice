from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel, Field
from chatbot import answering_prompt, initialize
from fastapi.middleware.cors import CORSMiddleware
import uuid
import aiofiles


@asynccontextmanager
async def lifespan(app: FastAPI):

    await initialize()
    print("Chatbot initialized")
    yield
    print("Shutting down")


app = FastAPI(lifespan=lifespan)


origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    message: str = Field(description="user prompt")


@app.middleware("http")
async def verify_cookie_middleware(request: Request, call_next):
    session_token = request.cookies.get("session_token")
    print("session_token: ", session_token)

    # 3. Modify the request state if you want to pass data to your endpoints
    request.state.user_session = session_token

    # 4. Pass the request forward to the endpoint
    response = await call_next(request)
    return response


@app.post("/generate")
async def generate(message: Message, response: Response, request: Request):
    print(request.state)
    stream = StreamingResponse(
        answering_prompt(message.message),
        media_type="text/plain",
    )

    if not request.state.user_session:
        user_id = str(uuid.uuid4())

        stream.set_cookie(
            key="session_token",
            value=user_id,
            httponly=True,
            max_age=60 * 60 * 24 * 7,  # 7 days
        )
    return stream
