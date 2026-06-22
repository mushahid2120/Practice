from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
google_api_key=os.getenv('GOOGLE_API_KEY')

model = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=google_api_key)
result=model.invoke("hi, how are you?")
print(result.content[0]['text'])

