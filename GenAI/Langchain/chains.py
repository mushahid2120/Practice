from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint

llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    task="text-generation",
)

huggingface_model = ChatHuggingFace(llm=llm)


google_model = ChatGoogleGenerativeAI(model="gemini-3-flash-preview", api_key=google_api_key)


prompt1=PromptTemplate.from_template('Generate short and simple notes form the following text \n {text}')
prompt2=PromptTemplate.from_template('Generate 5 short question answer from the following text \n {text}')
prompt3=PromptTemplate.from_template('Merge the provided notes and quiz into a single document \n notes=> {notes} and {quiz}')

parser=StrOutputParser()

# SEQUENTIAL CHAINING
# chain=prompt1 | model | prompt2 | model | parser

# PARALLEL CHAINING
parallel_chain=RunnableParallel({
        'notes': prompt1 | huggingface_model | parser,
        'quiz': prompt2 | google_model | parser
    })


merge_chain=prompt3 | google_model | parser
chain=parallel_chain | merge_chain
result=chain.invoke({'text': 'black hole'})
print(result)
