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

async function listModels() {
    console.log("Fetching available models...");
    try {
        // There isn't a direct listModels method on the genAI instance in the simplified SDK sometimes,
        // but let's try the model manager if available, or just test a few common ones.
        // Actually, the SDK *does* have a way to get model info, but it might be via the API directly if the SDK wrapper is thin.

        // Let's try a direct fetch to the API endpoint for listing models as it's more reliable for debugging.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name.replace('models/', '')} (${m.displayName})`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
