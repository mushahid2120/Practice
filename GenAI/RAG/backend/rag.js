import { pdf_loader, text_splitter, vectorStore } from "./prepare";

const filePath =
  "C:\\Users\\saba\\Desktop\\GitHub-Local\\Practice\\GenAI\\RAG\\backend\\cg-internal-docs.pdf";
const doc = await pdf_loader(filePath);
const splitted_doc = await text_splitter(doc[0].pageContent);
const readyText = splitted_doc.map((chunk) => ({
  pageContent: chunk,
  metadata: doc[0].metadata,
}));

console.log("Uploading....");
const response = await vectorStore.addDocuments(readyText);
