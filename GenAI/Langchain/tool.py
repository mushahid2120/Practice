from langchain_community.tools import DuckDuckGoSearchRun,tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import HumanMessagePromptTemplate,AIMessagePromptTemplate,ChatMessagePromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()
# search_tool=DuckDuckGoSearchRun()
# result=search_tool.invoke('Chief Minister of west begal')
# print(result)

model = ChatGoogleGenerativeAI(model="gemini-3.5-flash")

message=[]

query='Can you multiply 3 and 9'
message.append(query)

@tool
def multiply(a: int,b:int)->int:
    '''Multiply two numbers'''
    return a*b


llm_with_tools=model.bind_tools([multiply])
result=llm_with_tools.invoke(message)
message.append(result)

print(result)
tool_result=multiply.invoke(result.tool_calls[0])

message.append(tool_result)

# print(message)

response=llm_with_tools.invoke(message)
print(response)

