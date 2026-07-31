import asyncio

from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import os

from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain_core.tools import tool
load_dotenv()

UPLOAD_DIR="uploaded_files"

vector_store=None
embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")
def init_vector_store(thread_id: str="test"):
    global vector_store
    vector_store= Chroma(
        collection_name=str(thread_id),
        embedding_function=embeddings,
        tenant=os.getenv("CHROMA_TENANT_ID"),
        database=os.getenv("CHROMA_DB"),
        chroma_cloud_api_key=os.getenv("CHROMA_API_KEY"),
    )
model = ChatGoogleGenerativeAI(model="gemini-3.5-flash")

async def db_storing_embedding(file_name:str,thread_id:str):
    from chatbot import add_file_data
    # PDF Loader 
    loader=PyPDFLoader(file_path=f"{UPLOAD_DIR}/{file_name}")
    docs=await loader.aload()  

    # Document Splitter
    splitter=RecursiveCharacterTextSplitter(chunk_size=700,chunk_overlap=140)
    chunks=splitter.split_documents(docs)

    parser=StrOutputParser()    

    chain=model | parser
    summary=chain.invoke(f"Give  me short 40 words summary of this text  what these text all about- {chunks}")
    print(summary)
    if str(thread_id) not in add_file_data:
        add_file_data[thread_id]=[]
    add_file_data[thread_id].append({"name":file_name,"summary":summary})
    print(add_file_data)
    # Generate Embedding and Store in the vector store
    vector_store.add_documents(chunks)
    


async def retrieve_data(question:str):
    retriever=vector_store.as_retriever(search_type='similarity',search_kwargs={'k':3})
    docs = await retriever.ainvoke(question)
    return "\n\n".join(doc.page_content for doc in docs)

@tool
async def search_docs(query: str):
    """
    Search the user's uploaded documents using semantic search.

    Use this tool whenever the answer may be contained in one or more
    uploaded files for the current conversation. This includes questions
    about the contents, summaries, clauses, tables, code, reports,
    manuals, PDFs, Word documents, spreadsheets, or any other uploaded
    document.

    Do NOT use this tool for:
    - General world knowledge.
    - Common programming knowledge.
    - Mathematics.
    - Current events (use web_search if available).
    - Questions that can be answered without consulting the uploaded files.

    The input should be a concise search query, not the entire conversation.
    """

    print("Searching Docs ......")
    
    response_data=await retrieve_data(query)
    print(("response_data: ",response_data))
    return response_data
    

if __name__ == "__main__":
    asyncio.run(retrieve_data("How many leave i can take in a year"))