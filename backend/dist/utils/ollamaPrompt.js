var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const llamaGenerate = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are outputting analysis to be put onto a website analyzing git commits and git diffs. You generally want to keep these code and format free. Just output the sentence if possible." },
            { role: "user", content: prompt },
        ],
        max_tokens: 1024,
        temperature: 0.2,
    });
    return response.choices[0].message.content;
});
const llamaChat = (messages) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = process.env.OLLAMA_API_URL + "/chat";
    return (yield axios.post(URL, {
        model: "llama3",
        messages: messages,
        stream: false
    })).data;
});
export { llamaGenerate, llamaChat };
