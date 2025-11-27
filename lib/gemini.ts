import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
    role: "user" | "model";
    parts: string;
}

export const getGeminiResponse = async (
    history: ChatMessage[],
    message: string,
    transcript: string
) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Gemini API Key is missing");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are an AI Tutor. You are helpful, friendly, and concise.
  You have been provided with the following video transcript:
  "${transcript}"
  
  CRITICAL INSTRUCTIONS:
  1. Answer the user's questions based ONLY on the content of the transcript above.
  2. If the answer is not in the transcript, politely say: "I'm sorry, but that information isn't covered in this video."
  3. Do not use outside knowledge.
  4. Keep your responses conversational and suitable for a voice interface (avoid long lists or complex formatting unless necessary).
  5. Your response will be spoken out loud, so use natural language.`;

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: systemPrompt }],
            },
            {
                role: "model",
                parts: [{ text: "Understood. I am ready to answer questions based strictly on the video transcript provided." }],
            },
            ...history.map((msg) => ({
                role: msg.role,
                parts: [{ text: msg.parts }],
            })),
        ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
};
