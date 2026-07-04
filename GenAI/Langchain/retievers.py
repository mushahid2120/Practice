from unittest import result

from dotenv import load_dotenv
import os
from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.documents import Document
from langchain_classic.retrievers import MultiQueryRetriever,ContextualCompressionRetriever
from langchain_classic.retrievers.document_compressors import LLMChainExtractor


load_dotenv()

model=ChatGoogleGenerativeAI(model="gemini-3-flash-preview")
embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")
vector_store = Chroma(
    collection_name="test",
    embedding_function=embeddings,
    tenant="2fd580c2-437e-4e8d-a7b3-8dbf91703586",
    database="practicing_vector_store",
    chroma_cloud_api_key=os.getenv('CHROMA_API_KEY')
)

doc = [
    Document(page_content="Employees are allowed to work from home up to three days per week, providing flexibility for a healthy work-life balance."),
    Document(page_content="Our policy grants staff the option to work remotely for 3 days each week to support flexible living."),
    Document(page_content="Eligible team members can spend 3 days a week working out of their home office instead of headquarters."),
    Document(page_content="The company provides a $500 stipend to help employees purchase ergonomic chairs and desks for their home office setups."),
    Document(page_content="Remote workers must log their working hours in the central HR portal by 5:00 PM every Friday.")
]

query = "Tell me about the work from home rules and policies."

# vector_store.add_documents(doc)

retriever=vector_store.as_retriever(search_kwargs={'k':3})
normal_retrieval_result=retriever.invoke(query)

# mmr_retreival=vector_store.as_retriever(search_type="mmr",search_kwargs={'k':3,"lambda_mult": 0.5})
# mmr_retreival=vector_store.as_retriever(search_type="mmr",search_kwargs={'k':3,"lambda_mult": 1})
# mmr_retreival=vector_store.as_retriever(search_type="mmr",search_kwargs={'k':3,"lambda_mult": 0})

# mmr_retreival_result05=mmr_retreival.invoke(query)
# mmr_retreival_result1=mmr_retreival.invoke(query)
# mmr_retreival_result0=mmr_retreival.invoke(query)

# print('normal_retrieval_result: ',normal_retrieval_result)
# print('\n\nmmr_retreival_result05: ',mmr_retreival_result05)
# print('\n\nmmr_retreival_result1: ',mmr_retreival_result1)
# print('\n\nmmr_retreival_result0: ',mmr_retreival_result0)


# multiquery_retriever=MultiQueryRetriever.from_llm(
#         retriever=retriever,
#         llm=model
#     )

# result=multiquery_retriever.invoke('who can be good employ')

compressor=LLMChainExtractor.from_llm(model)
compressor_retriever=ContextualCompressionRetriever(
        base_compressor=compressor,
        base_retriever=retriever
    )

result=compressor_retriever.invoke('how many days can employ work from home')
print(result)
