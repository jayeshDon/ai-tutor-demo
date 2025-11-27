// Direct REST API test - bypasses SDK
const apiKey = "AIzaSyCxN8e3-Z9Tz2_mQXcyObliDw9wNRWfUoM";

async function testDirectAPI() {
    try {
        console.log("Testing direct REST API call...");

        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        // fallback to gemini-pro if flash not available
        // const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "Say hello in one word" }]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API Error:");
            console.error("Status:", response.status, response.statusText);
            console.error("Response:", JSON.stringify(data, null, 2));

            if (response.status === 404) {
                console.log("\n🔴 404 NOT FOUND - This means:");
                console.log("1. The Generative Language API is NOT enabled in your Google Cloud project");
                console.log("2. OR the API key doesn't have permission to access this API");
                console.log("\n✅ Solution:");
                console.log("Go to: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com");
                console.log("Click ENABLE button");
            }
        } else {
            console.log("✅ SUCCESS!");
            console.log("Response:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Network error:", error);
    }
}

testDirectAPI();
