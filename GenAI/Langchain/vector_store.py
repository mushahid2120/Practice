from dotenv import load_dotenv
import os
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

load_dotenv()

embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")
vector_store = Chroma(
    collection_name="test",
    embedding_function=embeddings,
    persist_directory="practicing_vector_store",
)

print(vector_store)
