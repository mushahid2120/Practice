from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
load_dotenv()
from pydantic import BaseModel
# from typing import TypedDict

# class Movie(TypedDict):
#     name: str
#     year: int

# class Movie(BaseModel):
#     name: str
#     year: int

# class MovieList(BaseModel):
#     movies: list[Movie]

movie_json_schema={
    'title':'movie',
    'type':'object',
    'properties':{
        'name':{'type':'string','description':'Name of the movie'},
        'year':{'type':'number','description':'Year of the movie'}
        }
    }

movie_list_json_schema={
            'title':'movie_list',
            'type':'object',
            'properties':{
                    'movies':{'type':['array','null'],'description':'List of movie with their release year'}
                }
    }
google_api_key=os.getenv('GOOGLE_API_KEY')

model = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=google_api_key)

structured_model=model.with_structured_output(movie_list_json_schema)
result=structured_model.invoke("name best 10 bollywood movies with year")
print(result)
# print(result.content[0]['text'])

