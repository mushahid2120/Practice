from contextlib import asynccontextmanager
import os
from fastapi import FastAPI, File, HTTPException, Request, Response, UploadFile
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel, Field
from rag import db_storing_embedding, init_vector_store
from chatbot import (
    answering_prompt,
    build_all_tool,
    build_model,
    build_tools,
    delete_thread,
    get_message_history,
    get_tool_list,
    history_generator,
    initialize,
    resume_generation,
    running_tasks,
    add_file_data,
    init_mcp,
)


from fastapi.middleware.cors import CORSMiddleware
from langgraph.checkpoint.serde.jsonplus import JsonPlusSerializer
import uuid
import aiosqlite

serde = JsonPlusSerializer()

UPLOAD_DIR = "uploaded_files"


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_vector_store()
    await init_mcp()
    build_all_tool()
    await build_tools([])
    build_model()
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
    tool_list: list[str] = Field(description="list of the tools")


class ThreadState(BaseModel):
    thread_id: str = Field(description="thread id of the conversation")


class ResumeRequest(BaseModel):
    thread_id: str
    approved: bool


@app.post("/generate")
async def generate(message: Message, response: Response, request: Request):

    if message.tool_list:
        await build_tools(message.tool_list)

    if message.thread_id == "None" or message.thread_id == None:
        message.thread_id = uuid.uuid4()

    header = {
        "X-Thread-ID": str(message.thread_id),
        "Cache-Control": "no-cache",
    }

    stream = StreamingResponse(
        answering_prompt(message.message, message.thread_id),
        media_type="text/event-stream",
        headers=header,
    )

    return stream


@app.post("/resume")
async def resume(req: ResumeRequest):

    header = {
        "X-Thread-ID": str(req.thread_id),
        "Cache-Control": "no-cache",
    }

    return StreamingResponse(
        resume_generation(
            req.thread_id,
            req.approved,
        ),
        media_type="text/event-stream",
        headers=header,
    )


@app.get("/all-thread")
async def GetAllThread():
    final_list = []
    async with app.state.db.execute("""
                            SELECT DISTINCT thread_id,type, checkpoint 
                            FROM CHECKPOINTS
                            GROUP BY thread_id 
                                    """) as mycursor:
        message = await mycursor.fetchall()

        for row in message:
            checkpoint = serde.loads_typed((row[1], row[2]))
            # print(checkpoint)
            if "__start__" in checkpoint["channel_values"]:
                final_list.append(
                    {
                        row[0]: checkpoint["channel_values"]["__start__"]["messages"][
                            0
                        ].content
                    }
                )
    # final_list = [l[0] for l in list]
    return {"thread_id_list": final_list}


@app.post("/get-chat-by-thread-id")
async def GetChatByThreadID(thread: ThreadState):
    try:
        return StreamingResponse(
            history_generator(await get_message_history(thread_id=thread.thread_id)),
            media_type="application/x-ndjson",
        )

    except Exception as error:
        return error


@app.post("/stop/{thread_id}")
async def stop_generation(thread_id: str):
    task = running_tasks.get(thread_id)
    if task is None:
        raise HTTPException(
            status_code=404, detail="No active generation for this thread."
        )
    task.cancel()
    return {"success": True, "message": "Generation cancelled."}


@app.delete("/delete-thread/{thread_id}")
async def delete_by_thread(thread_id: str):
    if not thread_id:
        raise HTTPException(status_code=404, detail="Invalid thread_id")
    res = await delete_thread(thread_id)
    return {"success": True, "message": "Thread Deleted Successfully"}


@app.get("/get-all-tools")
def GetAllTool():
    list = get_tool_list()
    return {"list": list}


@app.post("/upload-file/")
async def upload_file(request: Request, file: UploadFile = File(...)):
    threadId = request.headers.get("threadId")
    if str(threadId) not in add_file_data:
        init_vector_store(str(threadId))
         
    # 1. Validate the file extension
    file_extension = file.filename.split(".")[-1].lower()
    # if file_extension not in ALLOWED_EXTENSIONS:
    #     raise HTTPException(
    #         status_code=400,
    #         detail=f"Invalid file type. Allowed types: {ALLOWED_EXTENSIONS}"
    #     )

    # 2. Define the destination file path
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    # 3. Read and save the file asynchronously
    try:
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to save file: {str(e)}")
    finally:
        await file.close()

    await db_storing_embedding(file.filename,threadId)
    return {
        "filename": file.filename,
        "saved_path": file_path,
        "content_type": file.content_type,
        "status": "success"
    }
