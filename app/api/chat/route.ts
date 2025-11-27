import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';

// Explicitly set absolute path to service account key to avoid ENOENT
process.env.GOOGLE_APPLICATION_CREDENTIALS = "C:\\Users\\jayesh_naphade\\.gemini\\antigravity\\scratch\\ai_tutor_demo\\service-account-key.json";

export interface ChatMessage {
    role: "user" | "model";
    parts: string;
}

export async function POST(req: Request) {
    try {
        const startTime = Date.now();
        const { history, message, transcript } = await req.json();

        console.log("=== CHAT API REQUEST ===");
        console.log("Message:", message);
        console.log("Transcript received:", transcript ? `YES (${transcript.length} chars)` : "NO");

        // Validate transcript is actually present and not empty
        const hasValidTranscript = transcript && transcript.trim().length > 0;
        if (hasValidTranscript) {
            console.log("Transcript preview:", transcript.substring(0, 200) + "...");
        }

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            console.error("API Key missing from environment");
            return NextResponse.json({ error: 'Gemini API Key is missing from environment' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
        console.log(`Using Gemini Model: ${modelName}`);
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 60,
            }
        });

        let systemPrompt = "";

        if (hasValidTranscript) {
            systemPrompt = `You are an AI Tutor helping a student understand a video.

CONTEXT (VIDEO TRANSCRIPT):
"""
${transcript}
"""

CRITICAL INSTRUCTIONS:
1. **PRIMARY SOURCE:** Answer ONLY using information from the VIDEO TRANSCRIPT above. Do NOT use any outside knowledge.
2. **STRICT BOUNDARY:** If the answer is not in the transcript, say "I cannot find that information in the video."
3. **CONCISENESS:** Keep responses to 1-2 sentences maximum.
4. **STYLE:** Be friendly and conversational, but strictly factual based on the video.
5. **FORMAT:** Plain text only, no markdown.`;
        } else {
            systemPrompt = `You are an AI Video Tutor.

The video transcript is unavailable. Answer general questions about the topic.

RULES:
1. Answer should be short and concise.
2. No markdown formatting
3. Be helpful`;
        }

        // Validate and sanitize history
        const validHistory = Array.isArray(history) ? history.filter((msg: any) => msg && msg.role && msg.parts) : [];

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to answer questions." }],
                },
                ...validHistory.map((msg: ChatMessage) => ({
                    role: msg.role,
                    parts: [{ text: String(msg.parts || "") }],
                })),
            ],
        });

        const modelStartTime = Date.now();
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();
        const modelEndTime = Date.now();

        console.log(`Model response time: ${modelEndTime - modelStartTime}ms`);
        console.log(`Total request time: ${modelEndTime - startTime}ms`);
        console.log("Response:", text);

        return NextResponse.json({ response: text });

    } catch (error: any) {
        console.error('=== CHAT API ERROR ===');
        console.error('Error Type:', error.constructor?.name);
        console.error('Error Message:', error.message);
        console.error('Full Error:', error);

        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message || String(error)
        }, { status: 500 });
    }
}
