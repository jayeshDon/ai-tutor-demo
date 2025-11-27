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
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

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
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
// Explicitly set absolute path to service account key to avoid ENOENT
process.env.GOOGLE_APPLICATION_CREDENTIALS = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(("TURBOPACK compile-time value", "/ROOT/.gemini/antigravity/scratch/ai_tutor_demo/app/api/chat"), '../../service-account-key.json');
async function POST(req) {
    try {
        const { history, message, transcript } = await req.json();
        const apiKey = ("TURBOPACK compile-time value", "AIzaSyCxN8e3-Z9Tz2_mQXcyObliDw9wNRWfUoM");
        console.log("API Key check:", ("TURBOPACK compile-time truthy", 1) ? "Found" : "TURBOPACK unreachable");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });
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
                            text: "Understood. I am ready to answer questions based strictly on the video transcript provided."
                        }
                    ]
                },
                ...history.map((msg)=>({
                        role: msg.role,
                        parts: [
                            {
                                text: msg.parts
                            }
                        ]
                    }))
            ]
        });
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            response: text
        });
    } catch (error) {
        console.error('=== CHAT API ERROR ===');
        console.error('Error Type:', error.constructor?.name);
        console.error('Error Message:', error.message);
        console.error('Error Status:', error.status || error.statusText);
        console.error('Full Error:', error);
        console.error('======================');
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error',
            details: error.message || String(error),
            errorType: error.constructor?.name,
            status: error.status || error.statusText
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__38b6fbd3._.js.map