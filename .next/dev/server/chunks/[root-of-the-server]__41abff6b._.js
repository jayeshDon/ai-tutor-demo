module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/.gemini/antigravity/scratch/ai_tutor_demo/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
;
// Explicitly set absolute path to service account key to avoid ENOENT
process.env.GOOGLE_APPLICATION_CREDENTIALS = "C:\\Users\\jayesh_naphade\\.gemini\\antigravity\\scratch\\ai_tutor_demo\\service-account-key.json";
async function POST(req) {
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
        const apiKey = ("TURBOPACK compile-time value", "AIzaSyD1eExCl9U9IBsWYeUjcZgfhnLhXJyvZeo");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
        const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";
        console.log(`Using Gemini Model: ${modelName}`);
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 60
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
        const validHistory = Array.isArray(history) ? history.filter((msg)=>msg && msg.role && msg.parts) : [];
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: systemPrompt
                        }
                    ]
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "Understood. I am ready to answer questions."
                        }
                    ]
                },
                ...validHistory.map((msg)=>({
                        role: msg.role,
                        parts: [
                            {
                                text: String(msg.parts || "")
                            }
                        ]
                    }))
            ]
        });
        const modelStartTime = Date.now();
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();
        const modelEndTime = Date.now();
        console.log(`Model response time: ${modelEndTime - modelStartTime}ms`);
        console.log(`Total request time: ${modelEndTime - startTime}ms`);
        console.log("Response:", text);
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            response: text
        });
    } catch (error) {
        console.error('=== CHAT API ERROR ===');
        console.error('Error Type:', error.constructor?.name);
        console.error('Error Message:', error.message);
        console.error('Full Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error',
            details: error.message || String(error)
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__41abff6b._.js.map