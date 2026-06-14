import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const chatCompletion=await groq.chat.completions.create({
    response_format:{
        type: "json_object"
    },
    messages: [
        {
            role: 'system',
            content: `Your are Jarvis a smart review grader, Your taks is to analyse given review and return the centiment classify the review as prositive, neutral or negative. Output must be a single word
            You must return valid JSON structure
            example: {"sentiment": "Negative"}`
        },
        {
            role: "user",
            content: `Review : These headephones arrived quickly and look great, but the left earcup stopped working after a week
            Sentiment:
            `
        }
    ],
    model:"openai/gpt-oss-20b"
})

console.log(chatCompletion.choices[0].message.content)

// const getModels = async () => {
//     return await groq.models.list();
// };
// const availableModels=await getModels();
// console.log(availableModels)

