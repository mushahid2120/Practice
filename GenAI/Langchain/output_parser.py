from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from pydantic  import BaseModel, Field


from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
google_api_key = os.getenv("GOOGLE_API_KEY")


model = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=google_api_key)
message1 = "write a detailed report on {topic}"
message2 = "write a 5 line summary on the following {text}"

# parser = StrOutputParser()
# template1=PromptTemplate.from_template(message1)
# template2=PromptTemplate.from_template(message2)

# chain=template1 | model| parser | template2 | model | parser
# result=chain.invoke({'topic': 'india gate'})
# print(result)

# parser = JsonOutputParser()
class Person(BaseModel):
    name: str=Field(...,description='Name of the fictional character')
    age: int=Field(...,description='age of the fictional character')
    city: str=Field(...,description='Name of the city fictional character is belongs to')

parser=PydanticOutputParser(pydantic_object=Person)    
template = PromptTemplate.from_template(
    template="give me the name, age and city of a fictional person \n {format_instructions}"
).partial(format_instructions=parser.get_format_instructions())


chain = template | model | parser
result=chain.invoke({})

print(result)