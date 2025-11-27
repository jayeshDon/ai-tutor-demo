const http = require('http');

function makeRequest(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const startTime = Date.now();
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const endTime = Date.now();
                console.log(`[Client] Request to ${path} took ${endTime - startTime}ms`);
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ error: "Parse Error", raw: data });
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function measureLatency() {
    console.log("=== Measuring TTS Latency ===");
    try {
        // Test with a short sentence
        console.log("Sending short text...");
        await makeRequest('/api/tts', 'POST', { text: "Hello, this is a latency test." });

        // Test with a longer sentence (simulating AI response)
        console.log("\nSending long text...");
        await makeRequest('/api/tts', 'POST', { text: "This is a longer sentence to see how much time it takes for the Gemini model to generate audio for a more complex response." });

    } catch (e) {
        console.error("❌ Failed:", e.message);
    }
}

measureLatency();
