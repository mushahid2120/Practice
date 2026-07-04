from dotenv import load_dotenv
import os
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.documents import Document

load_dotenv()

embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")
vector_store = Chroma(
    collection_name="test",
    embedding_function=embeddings,
    tenant="2fd580c2-437e-4e8d-a7b3-8dbf91703586",
    database="practicing_vector_store",
    chroma_cloud_api_key=os.getenv('CHROMA_API_KEY')
)

doc = [
    Document(
        page_content="Apples are red, round, and delicious fruits.",
        metadata={"source": "fruit_facts"},
    ),
    Document(
        page_content="The moon orbits the Earth once every 27 days.",
        metadata={"source": "space_facts"},
    ),
]

# vector_store.add_documents(doc)
# print(vector_store.get(include=['metadatas','embeddings','documents']))
result=vector_store.similarity_search(query='duration of moon orbits',k=1)
print(result)

