from langchain_core.prompts import PromptTemplate,ChatPromptTemplate

from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
google_api_key=os.getenv('GOOGLE_API_KEY')

model = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=google_api_key)
# *************Prompt Template****************** 
# template=PromptTemplate.from_template("Intro about {topic} in {length} word")
# prompt=template.format(topic='blackhole',length='50')
# result= model.invoke(prompt)
# chain=template | model
# result=chain.invoke({'topic':'football','length':'50'})
# print(result)



# *************Chat Prompt Template****************** 
template = ChatPromptTemplate(
    [
        ("system", "You are a helpful AI bot. Your name is {name}."),
        ("human", "Hello, how are you doing?"),
        ("ai", "I'm doing well, thanks!"),
        ("human", "{user_input}"),
    ]
)

# prompt_value = template.invoke(
#     {
#         "name": "Bob",
#         "user_input": "What is your name?",
#     }
# )


chains=template | model
result=chains.invoke({'name':'Rahul','user_input':'What is your name'})

# result=model.invoke(prompt_value)
print(result.content[0]['text'])