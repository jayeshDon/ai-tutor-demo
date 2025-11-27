
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found in .env.local");
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy model to get client
        // There isn't a direct listModels on the client instance in the node SDK easily exposed sometimes, 
        // but we can try a direct REST call or just test the specific model.

        console.log("Testing specific model: gemini-2.5-flash-preview-tts");
        const specificModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });
        try {
            const result = await specificModel.generateContent({
                contents: [{ role: "user", parts: [{ text: "test" }] }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: "Sadachbia" }
                        }
                    }
                }
            });
            console.log("✅ Model 'gemini-2.5-flash-preview-tts' works!");
        } catch (e) {
            console.error("❌ Model 'gemini-2.5-flash-preview-tts' failed:", e.message);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
