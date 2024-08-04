import axios from "axios";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const llamaGenerate = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are analyzing git commits and git diffs. Just output the sentence." },
      { role: "user", content: prompt },
    ],
    max_tokens: 1024,
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}

const llamaChat = async (messages: {
  role: string;
  content: string;
}[]) => {
  const URL = process.env.OLLAMA_API_URL + "/chat"

  return (await axios.post(URL, {
    model: "llama3",
    messages: messages,
    stream: false
  })).data
}

export { llamaGenerate, llamaChat }