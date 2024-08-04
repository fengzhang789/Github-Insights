import axios from "axios"

const llamaGenerate = async (prompt: string) => {
  const URL = process.env.OLLAMA_API_URL + "/generate"

  return (await axios.post(URL, {
    model: "llama3",
    prompt: prompt,
    stream: false
  })).data
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