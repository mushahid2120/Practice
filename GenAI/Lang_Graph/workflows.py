from langgraph.graph import StateGraph,START,END
from langchain_google_genai import ChatGoogleGenerativeAI
from typing import TypedDict
from dotenv import load_dotenv

load_dotenv()

model=ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")

def sequential_workflow():
    class BlogState(TypedDict):
        title:str
        outline: str
        content:str

    def create_outline(state:BlogState)->BlogState:
        title=state['title']
        prompt=f"Generate a detailed outlined for a blog on the topic - \n {title}"
        outline=model.invoke(prompt).content
        state['outline']=outline
        return state

    def create_blog(state:BlogState)->BlogState:
        outline=state['outline']
        title=state['title']
        prompt=f"Write a detailed blog on the {title} using the following outline \n {outline}"
        content=model.invoke(prompt).content
        state['content']=content
        return state

    graph=StateGraph(BlogState)

    graph.add_node('create_outline',create_outline)
    graph.add_node('create_blog',create_blog)

    graph.add_edge(START,'create_outline')
    graph.add_edge('create_outline','create_blog')
    graph.add_edge('create_blog',END)

    workflow=graph.compile()
    initial_state={'title':'Rise in AI in India'}
    final_state=workflow.invoke(initial_state)
    print(final_state)


sequential_workflow()