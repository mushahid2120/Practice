// load the doc
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenAI } from "@google/genai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-embedding-001",
});

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index("chatbotrag");
export const vectorStore = new PineconeStore(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});

export async function pdf_loader(filePath) {
  try {
    const loader = new PDFLoader(filePath, { splitPages: false });
    const doc = await loader.load();
    return doc;
  } catch (error) {
    console.log(error);
  }
}

//split the doc

export async function text_splitter(text) {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });
    const texts = await splitter.splitText(text);
    return texts;
  } catch (error) {
    console.log(error);
  }
}

//Generate Embeddings

export async function generateTextEmbedding(textToEmbed) {
  try {
    // 2. Specify the embedding model

    const ai = new GoogleGenAI({});

    const response = await ai.models.embedContent({
      model: "gemini-embedding-2",
      contents: "What is the meaning of life?",
    });

    return response.embeddings;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}


// console.log(response);
