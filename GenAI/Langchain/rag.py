import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import ChatGoogleGenerativeAI,GoogleGenerativeAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableParallel,RunnableLambda,RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
load_dotenv()


model = ChatGoogleGenerativeAI(model="gemini-3.5-flash")
embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")

vector_store = Chroma(
    collection_name="test",
    embedding_function=embeddings,
    tenant="2fd580c2-437e-4e8d-a7b3-8dbf91703586",
    database="practicing_vector_store",
    chroma_cloud_api_key=os.getenv('CHROMA_API_KEY')
)

parser=StrOutputParser()


question="How many leave a employee and take in a year?"

## PDF Loader

# loader=PyPDFLoader(file_path='cg-internal-docs.pdf')
# docs=loader.load()

## Document Splitter
# splitter=RecursiveCharacterTextSplitter(chunk_size=700,chunk_overlap=140)
# chunks=splitter.split_documents(docs)


## Do it only one time
## Generate Embedding and Store in the vector store
# result=vector_store.add_documents(chunks)

## Create a Retriver

retriver=vector_store.as_retriever(search_type='similarity',search_kwargs={'k':4})


## Prompt

prompt=PromptTemplate.from_template('''
                            You are a smart assistant.
                            Answer only from the provided transcript context.
                            If you don't find the answer in the provided context, just say don't know.\n\n
                            Context: {context} \n\n
                            Question: {question}
                                    ''')

# retrieved_docs=retriver.invoke(question)

def format_docs(retrieved_docs):
    context_text='\n\n'.join(doc.page_content for doc in retrieved_docs)
    return context_text

# final_prompt=prompt.invoke({'context': context_text,'question': question})
# print(final_prompt)
# result=model.invoke(final_prompt)

parallel_chain=RunnableParallel({
    'context': retriver | RunnableLambda(format_docs),
    'question': RunnablePassthrough()
    })

main_chain=parallel_chain | prompt | model | parser
result=main_chain.invoke(question)
print(result)







