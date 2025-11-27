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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/.gemini/antigravity/scratch/ai_tutor_demo/app/api/transcript/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$youtube$2d$transcript$2f$dist$2f$youtube$2d$transcript$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/youtube-transcript/dist/youtube-transcript.esm.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
async function POST(req) {
    try {
        const { url } = await req.json();
        if (!url) {
            return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'URL is required'
            }, {
                status: 400
            });
        }
        // Extract video ID from URL (Permissive Regex)
        // Matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/v/ID, youtube.com/shorts/ID
        const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (!videoId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid YouTube URL'
            }, {
                status: 400
            });
        }
        console.log(`Fetching transcript for video ID: ${videoId}`);
        // Fallback for demo video
        if (videoId === 'kqtD5dpn9C8') {
            console.log('Using fallback transcript for demo video');
            const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'transcript_kqtD5dpn9C8.txt');
            try {
                if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) {
                    const fallbackText = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf8');
                    return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        transcript: fallbackText
                    });
                }
            } catch (e) {
                console.error('Error reading fallback transcript:', e);
            }
        }
        try {
            const transcriptItems = await __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$youtube$2d$transcript$2f$dist$2f$youtube$2d$transcript$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["YoutubeTranscript"].fetchTranscript(videoId);
            if (!transcriptItems || transcriptItems.length === 0) {
                // Return explicit missing flag instead of error
                return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    transcript: null,
                    transcriptMissing: true,
                    warning: 'No transcript found'
                });
            }
            const transcriptText = transcriptItems.map((item)=>item.text).join(' ');
            return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                transcript: transcriptText
            });
        } catch (transcriptError) {
            console.error('Transcript fetch error:', transcriptError);
            // Return explicit missing flag to trigger General Mode
            return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                transcript: null,
                transcriptMissing: true,
                warning: 'Captions disabled or unavailable'
            });
        }
    } catch (error) {
        console.error('API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f2e$gemini$2f$antigravity$2f$scratch$2f$ai_tutor_demo$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal Server Error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0669d23f._.js.map