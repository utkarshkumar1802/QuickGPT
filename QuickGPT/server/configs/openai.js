import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: "https://api.x.ai/v1",
    maxRetries: 3,
    timeout: 20 * 1000
});

export default openai;