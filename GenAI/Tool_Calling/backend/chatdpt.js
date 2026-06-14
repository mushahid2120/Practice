import { Groq } from "groq-sdk";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export async function generate({ prompt, last_summary }) {
  console.log({ prompt, last_summary });
  const message = [
    {
      role: "system",
      content: `You are a smart personal assistant who answers user questions.
      
      CRITICAL HISTORICAL CONTEXT:
      Here is a summary of your previous conversation with this user:
      "${last_summary}"
      
      Always use the context above to remember critical details (like the user's name, preferences, or topics already handled). If the user asks for real-time data, current events, or details outside your base training, use the tools provided to find current internet information.`,
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  while (true) {
    const completions = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: message,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "Search the latest information and realtime data on internet",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform search on",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    message.push(completions.choices[0].message);

    console.log(completions.choices[0].message);

    const toolCall = completions.choices[0].message.tool_calls;

    if (!toolCall) {
      return completions.choices[0].message.content;
      break;
    }

    for (const tool of toolCall) {
      const functionName = tool.function.name;
      const functionParams = tool.function.arguments;

      if (functionName === "webSearch") {
        const toolResult = await webSearch(JSON.parse(functionParams));

        message.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: toolResult,
        });
      }
    }
  }
}

export async function summarize(data) {
  const message = [
    {
      role: "system",
      content: `You are a strict data compression engine. Your task is to update a running conversation summary.
      Take the provided JSON object containing the latest prompt, generated text, and previous summary, and synthesize them into a short, cohesive string of continuous facts.
      Retain operational user profiles like names, explicitly stated user identities, and ongoing requests. Keep it brief.`,
    },
    {
      role: "user",
      content: data,
    },
  ];
  const completions = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: message,
  });
  return completions.choices[0].message.content;
}

const webSearch = async ({ query }) => {
  console.log("Searching on web....");
  console.log("Query: ", query);

  const response = await tvly.search(query);
  const finalResponse = response.results
    .map((result) => result.content)
    .join("\n\n");
  return finalResponse;
};
