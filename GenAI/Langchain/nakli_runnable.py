## Manual Runnable

import random
from unittest import result
from abc import ABC,abstractclassmethod

class Runnable(ABC):
    @abstractclassmethod
    def invoke(input_data):
        pass


class NakliLLM(Runnable):
    def __init__(self):
        print("LLM is created")

    def predict(self, prompt):
        random_list = [
            "Delhi is the capital of india",
            "IPL is a cricket League",
            "AI stands fro artificial intelligence"
        ]
        return {'response': random.choice(random_list)}

    def invoke(self, prompt):
        random_list = [
            "Delhi is the capital of india",
            "IPL is a cricket League",
            "AI stands fro artificial intelligence"
        ]
        return {'response': random.choice(random_list)}

class NakliPromptTemplate(Runnable):
    def __init__(self, template, input_variables):
        self.template=template
        self.input_variables=input_variables

    def format(self, input_dict):
        return self.template.format(**input_dict)
    
    def invoke(self, input_dict):
        return self.template.format(**input_dict)

class NakliChain(Runnable):
    def __init__(self,llm,prompt):
        self.llm=llm
        self.prompt=prompt

    def run(self,input_dict):
        final_prompt=self.prompt.format(input_dict)
        result=self.llm.predict(final_prompt)
        return result['response']
    
    def invoke(self,input_dict):
        final_prompt=self.prompt.format(input_dict)
        result=self.llm.predict(final_prompt)
        return result['response']

class RunnableConnector(Runnable):
    def __init__(self,runnable_list):
        self.runnable_list=runnable_list

    def invoke(self,input_data):
        for runnable in self.runnable_list:
            input_data=runnable.invoke(input_data)
            return input_data

llm=NakliLLM();
template=NakliPromptTemplate(template="Write a {length} poem about {topic}",
                             input_variables=['length','topic'])
# prompt=template.format({'length':'short','topic':'india'})
# chain=NakliChain(llm=llm,prompt=template)
# result=chain.run({'length':'long','topic':'india'})
chain =RunnableConnector([template,llm])
result=chain.invoke({'length':'long','topic':'india'})
print(result)
