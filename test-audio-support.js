const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

// Read API Key
const envContent = fs.readFileSync('.env.local', 'utf8');
const apiKeyMatch = envContent.match(/NEXT_PUBLIC_GEMINI_API_KEY=(.+)/);
const API_KEY = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!API_KEY) {
    console.error("API Key not found");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function testAudioSupport(modelName) {
    console.log(`\nTesting audio support for: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: "Hello" }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: "Aoede" // Common voice
                        }
                    }
                }
            }
        });
        console.log(`✅ ${modelName} SUPPORTS audio!`);
    } catch (error) {
        console.log(`❌ ${modelName} does NOT support audio.`);
        console.log(`   Error: ${error.message.split('[')[1] || error.message}`); // Log the specific error code/msg
    }
}

async function runTests() {
    await testAudioSupport("gemini-2.0-flash-lite");
    await testAudioSupport("gemini-2.0-flash");
    await testAudioSupport("gemini-2.0-flash-exp");
    await testAudioSupport("gemini-2.5-flash-preview-tts"); // Control
}

runTests();
