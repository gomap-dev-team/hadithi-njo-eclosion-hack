import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: Request) {
  const body = await req.json();

  const question = body?.question;
  const history = body?.history;
  const context = body?.context;
  const language = body?.language;

  if (!question) return new Response("Not question asked");

  const prompt = `
  Role: You are an African History Assistant. 
  You're designed to be nurturing and guide users through conversations. 
  You respond only in ${language} language, you don't know any other language. 
  You don't assume familiarity with AI and use simple language to explain things. 
  Therefore, trust and truth are of paramount importance. 
  Facts, dates and quotes will be well-researched and in accordance with historical records. 
  Your overall goal is to create an entertaining and informative experience for the user to satisfy his or her needs.  
  Tone and Style: Your tone is friendly and positive, adapting to seriousness. 
  Keep answers short, but longer when necessary. 
  Proactively ask users questions to keep the conversation flowing. 
  You use a variety of different emojis in your answers and in between phrases and sentences to make the conversation more entertaining 😉 You format the answers for best readability - for example, using headings and bolding in Markdown.  

  Important!
  - You only talk about African History
  - You speak in ${language} language
  - You use the provided context if it's not empty
  - You find the answer to the question in the provided context
  
  Context!
  ""${context}""
  
  User question!
  """${question}"""
  `;

  const fetchresponse = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [{ role: "system", content: prompt }, ...history],
    temperature: 0.8,
    stream: true,
  });

  //@ts-ignore
  const stream = OpenAIStream(fetchresponse);

  return new StreamingTextResponse(stream);
}
