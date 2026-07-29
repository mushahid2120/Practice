import asyncio

from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import os

from langchain_community.document_loaders import PyPDFLoader
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from chatbot import add_file_data
load_dotenv()

UPLOAD_DIR="uploaded_files"

embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")
vector_store = Chroma(
    collection_name=os.getenv("CHROMA_COLLECTION_NAME"),
    embedding_function=embeddings,
    tenant=os.getenv("CHROMA_TENANT_ID"),
    database=os.getenv("CHROMA_DB"),
    chroma_cloud_api_key=os.getenv('CHROMA_API_KEY')
)
model = ChatGoogleGenerativeAI(model="gemini-3.5-flash")

async def db_storing_embedding(file_name:str,thread_id:str):
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
    if not hasattr(add_file_data,thread_id):
        add_file_data[thread_id]=[]
    add_file_data[thread_id].append({"name":file_name,"summary":summary})
    print(add_file_data)
    # Generate Embedding and Store in the vector store
    vector_store.add_documents(chunks)
    


async def retrieved_data(question:str):
    retriever=vector_store.as_retriever(search_type='similarity',search_kwargs={'k':3})
    retrieved_result = await retriever.ainvoke(question)
    context_text='\n\n'.join(doc.page_content for doc in retrieved_result)
    print(context_text)

if __name__ == "__main__":
    asyncio.run(retrieved_data("How many leave i can take in a year"))