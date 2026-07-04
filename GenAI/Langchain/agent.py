from langchain_classic.agents import create_react_agent, AgentExecutor
from langchain_classic import hub
from langchain_community.tools import DuckDuckGoSearchRun,tool
from langchain_google_genai import ChatGoogleGenerativeAI
from langsmith import Client 
import os
from dotenv import load_dotenv
load_dotenv()


model = ChatGoogleGenerativeAI(model="gemini-3.5-flash")
search_tool=DuckDuckGoSearchRun()

client = Client()
prompt = client.pull_prompt('hwchase17/react', dangerously_pull_public_prompt=True)

agent=create_react_agent(llm=model,tools=[search_tool],prompt=prompt)
agent_exe=AgentExecutor(agent=agent,tools=[search_tool],verbose=True)
response=agent_exe.invoke({'input': '3 ways to reach goa from delhi'})
print(response)