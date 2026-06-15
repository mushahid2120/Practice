import readline from "node:readline/promises";
import { Groq } from "groq-sdk";

import { vectorStore } from "./prepare.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function chat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  while (true) {
    const question = await rl.question("You: ");
    if (question === "/bye") {
      break;
    }

    // embedds the question then match it with the database and then return the matched content
    const relaventChunk = await vectorStore.similaritySearch(question, 3);

    // ########### OR ###################

    /**Convert the user query into embedding(vector)

    const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
    });
 
 const queryVector = await embeddings.embedQuery(question);   

     Search Relevant document into vector DB

    import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
    });
 
 const queryVector = await embeddings.embedQuery(question);   

    Search Relevant document into vector DB

    
   import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);

const searchResults = await pineconeIndex.query({
    topK: 10,
    vector: queryVector,
    includeMetadata: true,
    });
    
    
const context = searchResults.matches
                   .map(match => match.metadata.text)
                   .join("\n\n---\n\n");


                
    const context = relaventChunk
      .map((chunk) => chunk.pageContent)
      .join("\n\n");

        */

    const SYSTEM_PROMPT = `You are assistant for question-answer taks. Use the following relavant
        pieces fo retrieved context too answer the question
        If you don't know the answer, say I don't know`;

    const userQuery = `Question: ${question}
        Relavant Context: ${context}
        Answer: `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: userQuery,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    console.log("Answer: ", completion.choices[0].message.content);
  }
  rl.close();
}

await chat();
