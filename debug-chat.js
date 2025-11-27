const http = require('http');

function makeRequest(path, method = 'POST', body = null) {
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

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(`Status Code: ${res.statusCode}`);
                try {
                    const json = JSON.parse(data);
                    resolve(json);
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

async function debugChat() {
    console.log("=== Debugging Chat API ===");
    try {
        const payload = {
            history: [],
            message: "Hello, testing chat API.",
            transcript: "This is a sample transcript."
        };

        console.log("Sending request...");
        const response = await makeRequest('/api/chat', 'POST', payload);
        const fs = require('fs');
        fs.writeFileSync('response.log', JSON.stringify(response, null, 2));
        console.log("Response written to response.log");

    } catch (e) {
        console.error("❌ Failed:", e.message);
        const fs = require('fs');
        fs.writeFileSync('error.log', JSON.stringify(e, null, 2));
    }
}

debugChat();
