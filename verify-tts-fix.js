
async function verifyTTS() {
    console.log("Verifying TTS API Fix...");
    try {
        const response = await fetch('http://localhost:3000/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: "Hello, testing the fix." })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.audioContent) {
                console.log("✅ Success! Audio content received.");
                console.log("Audio size:", data.audioContent.length, "bytes (base64)");
            } else {
                console.error("❌ Response OK but no audioContent:", data);
            }
        } else {
            const errorText = await response.text();
            console.error("❌ Failed:", response.status, errorText);
        }
    } catch (error) {
        console.error("❌ Error calling API:", error);
    }
}

verifyTTS();
