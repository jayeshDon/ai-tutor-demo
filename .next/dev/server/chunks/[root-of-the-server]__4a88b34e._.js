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
"[project]/.gemini/antigravity/scratch/ai_tutor_demo/app/api/tts/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
;
// WAV Header Helper Function
function createWavHeader(pcmLength, sampleRate = 24000, numChannels = 1, bitsPerSample = 16) {
    const buffer = Buffer.alloc(44);
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + pcmLength, 4);
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16);
    buffer.writeUInt16LE(1, 20);
    buffer.writeUInt16LE(numChannels, 22);
    buffer.writeUInt32LE(sampleRate, 24);
    buffer.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28);
    buffer.writeUInt16LE(numChannels * (bitsPerSample / 8), 32);
    buffer.writeUInt16LE(bitsPerSample, 34);
    buffer.write('data', 36);
    buffer.writeUInt32LE(pcmLength, 40);
    return buffer;
}
async function POST(req) {
    let text = '';
    try {
        const body = await req.json();
        text = body.text;
        if (!text) return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Text required'
        }, {
            status: 400
        });
        const apiKey = ("TURBOPACK compile-time value", "AIzaSyD1eExCl9U9IBsWYeUjcZgfhnLhXJyvZeo");
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-preview-tts"
        });
        console.log(`[Gemini TTS] Requesting Umbriel voice for: "${text.substring(0, 20)}..."`);
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text
                        }
                    ]
                }
            ],
            generationConfig: {
                responseModalities: [
                    "AUDIO"
                ],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: {
                            voiceName: "Sadachbia"
                        }
                    }
                }
            }
        });
        const audioPart = result.response.candidates?.[0]?.content.parts.find((p)=>p.inlineData);
        if (audioPart?.inlineData?.data) {
            const pcmData = Buffer.from(audioPart.inlineData.data, 'base64');
            const wavBuffer = Buffer.concat([
                createWavHeader(pcmData.length),
                pcmData
            ]);
            console.log(`[Gemini TTS] Success!`);
            return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                audioContent: wavBuffer.toString('base64'),
                metadata: {
                    source: 'Gemini',
                    voice: 'Sadachbia'
                }
            });
        }
        throw new Error('No audio from Gemini');
    } catch (error) {
        console.error('[Gemini TTS] Error:', error.message);
        // Fallback to Google Cloud TTS
        // if (text) {
        //     console.warn('[Gemini TTS] Failed, falling back to Google Cloud TTS (Neural2-C)');
        //     try {
        //         const client = new TextToSpeechClient({
        //             keyFilename: "C:\\Users\\jayesh_naphade\\Downloads\\jyoti-project-477506-882032744666.json"
        //         });
        //         const request = {
        //             input: { text },
        //             voice: { languageCode: 'en-IN', name: 'en-IN-Neural2-C' },
        //             audioConfig: { audioEncoding: 'MP3' },
        //         } as any;
        //         const [response] = await client.synthesizeSpeech(request);
        //         const audioContent = response.audioContent?.toString('base64');
        //         if (audioContent) {
        //             console.log(`[Fallback TTS] Success!`);
        //             return NextResponse.json({
        //                 audioContent,
        //                 metadata: { source: 'Google Cloud', voice: 'Neural2-C' }
        //             });
        //         }
        //     } catch (fallbackError: any) {
        //         console.error('[Fallback TTS] Error:', fallbackError.message);
        //     }
        // }
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'TTS Failed',
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4a88b34e._.js.map