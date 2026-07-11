from urllib import response

from langgraph.graph import StateGraph, START, END
from langchain_google_genai import ChatGoogleGenerativeAI
from typing import Annotated, Literal, TypedDict
from dotenv import load_dotenv
from pydantic import BaseModel, Field
import operator

load_dotenv()

model = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite")


def sequential_workflow():
    class BlogState(TypedDict):
        title: str
        outline: str
        content: str

    def create_outline(state: BlogState) -> BlogState:
        title = state["title"]
        prompt = f"Generate a detailed outlined for a blog on the topic - \n {title}"
        outline = model.invoke(prompt).content
        state["outline"] = outline
        return state

    def create_blog(state: BlogState) -> BlogState:
        outline = state["outline"]
        title = state["title"]
        prompt = f"Write a detailed blog on the {title} using the following outline \n {outline}"
        content = model.invoke(prompt).content
        state["content"] = content
        return state

    graph = StateGraph(BlogState)

    graph.add_node("create_outline", create_outline)
    graph.add_node("create_blog", create_blog)

    graph.add_edge(START, "create_outline")
    graph.add_edge("create_outline", "create_blog")
    graph.add_edge("create_blog", END)

    workflow = graph.compile()
    initial_state = {"title": "Rise in AI in India"}
    final_state = workflow.invoke(initial_state)
    print(final_state)


def parallel_workflow():
    class EvaluationState(BaseModel):
        feedback: str = Field(description="Detailed feedback the essay")
        score: int = Field(description="Score out of 10", ge=0, le=10)

    class EssayState(TypedDict):
        title: str
        essay: str
        language_feedback: str
        analysis_feedback: str
        clarity_feedback: str
        overall_feedback: str
        indivial_scores: Annotated[list[int], operator.add]
        avg_score: float

    def generate_essay(state: EssayState):
        title = state["title"]
        prompt = f"Generate detail essay on this topic - {title}"
        response = model.invoke(prompt).content
        return {"essay": response[0]["text"]}

    def evaluate_language(state: EssayState):
        essay = state["essay"]
        structured_model = model.with_structured_output(EvaluationState)
        prompt = f"Evaluate the language quality of the following essay and provide a feedback and asssign a score out of 10 \n {essay}"
        response = structured_model.invoke(prompt)
        return {
            "language_feedback": response.feedback,
            "indivial_scores": [response.score],
        }

    def evaluate_deepth(state: EssayState):
        essay = state["essay"]
        structured_model = model.with_structured_output(EvaluationState)
        prompt = f"Evaluate the deepth of analysis of the following essay and provide a feedback and asssign a score out of 10 \n {essay}"
        response = structured_model.invoke(prompt)
        return {
            "analysis_feedback": response.feedback,
            "indivial_scores": [response.score],
        }

    def evaluate_clarity(state: EssayState):
        essay = state["essay"]
        structured_model = model.with_structured_output(EvaluationState)
        prompt = f"Evaluate the clarity of thought of the following essay and provide a feedback and asssign a score out of 10 \n {essay}"
        response = structured_model.invoke(prompt)
        return {
            "clarity_feedback": response.feedback,
            "indivial_scores": [response.score],
        }

    def final_evaluation(state: EssayState):
        prompt = f"Based on the following feedback create a summarized feedback \n language feedback-{state['language_feedback']} \n deepth of analysis feedback-{state['analysis_feedback']} \n clarity of thought-{state['clarity_feedback']}"
        overall_feedback = model.invoke(prompt).content[0]["text"]
        avg_score = sum(state["indivial_scores"]) / len(state["indivial_scores"])
        return {"overall_feedback": overall_feedback, "avg_score": avg_score}

    graph = StateGraph(EssayState)

    graph.add_node("generate_essay", generate_essay)
    graph.add_node("language_evaluation", evaluate_language)
    graph.add_node("deepth_of_analysis_evaluation", evaluate_deepth)
    graph.add_node("clarity_of_thought_evaluation", evaluate_clarity)
    graph.add_node("final_evaluation", final_evaluation)

    graph.add_edge(START, "generate_essay")
    graph.add_edge("generate_essay", "language_evaluation")
    graph.add_edge("generate_essay", "deepth_of_analysis_evaluation")
    graph.add_edge("generate_essay", "clarity_of_thought_evaluation")

    graph.add_edge("language_evaluation", "final_evaluation")
    graph.add_edge("deepth_of_analysis_evaluation", "final_evaluation")
    graph.add_edge("clarity_of_thought_evaluation", "final_evaluation")
    graph.add_edge("final_evaluation", END)

    workflow = graph.compile()
    initial_state = {"title": "Vocal for local"}
    result = workflow.invoke(initial_state)
    print(result)


def conditional_workflow():
    class SentimentSchema(BaseModel):
        sentiment: Literal["positive", "negative"] = Field(
            description="Sentiment fo the review"
        )

    class DiagnosisSchema(BaseModel):
        issue_type: Literal["UI/UX", "performance", "Bug", "Support", "other"] = Field(
            description="The category of issue mentioned in the review"
        )
        tone: Literal["angry", "frustrated", "disappointed", "calm"] = Field(
            description="The emotional tone expressed by the user"
        )
        urgency: Literal["low", "medium", "high"] = Field(
            description="How  urgent ro critical the issue appears to be"
        )

    structured_model1 = model.with_structured_output(SentimentSchema)
    structured_model2 = model.with_structured_output(DiagnosisSchema)

    class ReviewState(TypedDict):
        review: str
        sentiment: Literal["positive", "negative"]
        diagnosis: dict
        response: str

    def find_sentiment(state: ReviewState):
        prompt = f'For the following review find out the sentiment \n {state["review"]}'
        sentiment = structured_model1.invoke(prompt).sentiment
        return {"sentiment": sentiment}

    def positive_response(state: ReviewState):
        prompt = f"""Write a warm thankyou message in the response to this review: {state['review']}
                    Also, kindly ask the user to leave feedback on out website
        """
        respone = model.prompt(prompt).content
        return {"response": response}

    def run_diagnosis(state: ReviewState):
        prompt = f"""
            Diagnosie this negative review: {state['review']}
            Return issue_type,tone,and urgency
        """
        response = structured_model2.invoke(prompt)
        return {"diagnosis": response.model_dump()}

    def negative_response(state: ReviewState):
        diagnosis = state["diagnosis"]
        prompt = f"""
            You are a support assistant.
            The user had a {diagnosis['issue_type']} issue sounded {diagnosis['tone']} and marked urgencyas {diagnosis['urgency']}
            Write an empathetic, helpful resolution message
        """
        response = model.invoke(prompt).content
        return {"response": response}

    def check_sentiment(
        state: ReviewState,
    ) -> Literal["positive_response", "run_diagnosis"]:
        if state["sentiment"] == "positive":
            return "positive_response"
        else:
            return "run_diagnosis"

    graph = StateGraph(ReviewState)
    graph.add_node("find_sentiment", find_sentiment)
    graph.add_node("positive_response", positive_response)
    graph.add_node("run_diagnosis", run_diagnosis)
    graph.add_node("negative_response", negative_response)

    graph.add_edge(START, "find_sentiment")
    graph.add_conditional_edges("find_sentiment", check_sentiment)
    graph.add_edge("positive_response", END)
    graph.add_edge("run_diagnosis", "negative_response")
    graph.add_edge("negative_response", END)

    workflow = graph.compile()
    result = workflow.invoke(
        {
            "review": "I have been trying to login for over an hour and now the app freeze on the authentication"
        }
    )
    print(result)


def iterative_workflow():
    class PostEvSchema(BaseModel):
        evaluation:Literal['approved','need_improvement']=Field(description="Evaluation of the post")
        
    class PostGenSchema(TypedDict):
        topic: str = Field(
            description="The linkden post will be generate about this topic"
        )
        template: str = Field(description="The template of the linkden post")
        post: str = Field(description="The post for linkden")
        evaluation: Literal["approved", "need_improvement"]
        iteration: int= Field(le=10,ge=0,description="current going iteration")
        max_itr:int=Field(le=10,ge=0,description="maximum iteration are allowed")

    def gen_template(state: PostGenSchema):
        prompt = "Genarate standard template for linkden post for learning on public"
        template = model.invoke(prompt).content[0]["text"]
        return {"template": template}

    def gen_post(state: PostGenSchema):
        prompt = f"Generate Linkden post on this topic - {state['topic']} \n by following this template- {state['template']}"
        post=model.invoke(prompt).content[0]['text']
        return {'post':post}

    def evaluate_post(state:PostGenSchema):
        prompt=f"Give me the evaluation of the generated post -{state['post']}"
        model_with_structured_output=model.with_structured_output(PostEvSchema)
        response=model_with_structured_output.invoke(prompt)
        return {'evaluation': response.evaluation}

    def optimize(state:PostGenSchema):
        prompt=f"Optimize this linkden post {state['post']} based on this template {state['template']}"
        new_post=model.invoke(prompt).content[0]['text']
        return {'post':new_post}

    def route_evaluation(state:PostGenSchema):
        if state["evaluation"]=='approved' or state['iteration']>=state['max_itr']:
            return "approved"
        else:
            return "needs_improvement"

    graph=StateGraph(PostGenSchema)
    graph.add_node('gen_template',gen_template)
    graph.add_node('gen_post',gen_post)
    graph.add_node('optimize',optimize)
    graph.add_node('evaluate_post',evaluate_post)

    graph.add_edge(START,'gen_template')
    graph.add_edge('gen_template','gen_post')
    graph.add_edge('gen_post','evaluate_post')
    graph.add_conditional_edges('evaluate_post',route_evaluation,{'approved':END,'needs_improvement':'optimize'})
    graph.add_edge('optimize','evaluate_post')
    
    workflow=graph.compile()
    initial_state={'topic':"Ansible service discovery"}
    result=workflow.invoke(initial_state)
    print(result)
    

# sequential_workflow()
# parallel_workflow()
# conditional_workflow()
iterative_workflow()
