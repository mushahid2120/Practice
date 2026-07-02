from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core import prompts, output_parsers, runnables
from dotenv import load_dotenv
import os

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-3.5-flash")
parser = output_parsers.StrOutputParser()

## *********** Runnable Sequence **********
# prompt=prompts.PromptTemplate.from_template('Write a joke about {topic}');
# chain=runnables.RunnableSequence(prompt,model,parser)
# result=chain.invoke({'topic':'donal trump'})


## ******************* Runnable Parallel ************
# prompt1 = prompts.PromptTemplate.from_template('Generate a tweet on {topic}')
# prompt2=prompts.PromptTemplate.from_template('Generate a linkedn about {topic}')

# parallel_chain=runnables.RunnableParallel( {
#     'tweet': runnables.RunnableSequence(prompt1,model,parser),
#     'linkedn': runnables.RunnableSequence(prompt2,model,parser)
#     })

# result=parallel_chain.invoke({'topic':'inventory in terraform'})


## ******************* Runnable Passthrough *************

# prompt1 = prompts.PromptTemplate.from_template("Write a joke about {topic}")
# prompt2 = prompts.PromptTemplate.from_template("Explan the joke {joke}")

# gen_joke = runnables.RunnableSequence(prompt1, model, parser)

# parallel_chain = runnables.RunnableParallel(
#     {
#         "joke": runnables.RunnablePassthrough(),
#         "explanation": runnables.RunnableSequence(prompt2, model, parser),
#     }
# )

# final_chain = gen_joke | parallel_chain

# result = final_chain.invoke({"topic": "tiger"})

## *********** Runnable Lambda ***********

# def word_counter(text):
#     return len(text.split())

# runnable_word_counter=runnables.RunnableLambda(word_counter)
# prompt=prompts.PromptTemplate.from_template("Write a joke about {topic}")
# joke_gen_chain=prompt | model | parser
# parallel_chain=runnables.RunnableParallel({
#             'joke':runnables.RunnablePassthrough(),
#             'word_count': runnable_word_counter
#         })

# final_chain=joke_gen_chain | parallel_chain
# result=final_chain.invoke({'topic': 'cow'})

## ********** Runnable Branch ***********

prompt1 = prompts.PromptTemplate.from_template("write a detailed report on {topic}")
prompt2 = prompts.PromptTemplate.from_template("Summarize the following text {text}")

report_gen_chain = prompt1 | model | parser
branch_chain = runnables.RunnableBranch(
    (
        lambda x: len(x.split()) > 100,
        runnables.RunnableSequence(prompt2, model, parser),
    ),
    (runnables.RunnablePassthrough()),
)
final_chain = report_gen_chain | branch_chain
result = final_chain.invoke({"topic": "Apple"})

print(result)
