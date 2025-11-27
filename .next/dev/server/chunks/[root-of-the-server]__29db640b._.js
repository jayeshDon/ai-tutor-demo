module.exports = [
"[externals]/crypto [external] (crypto, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[externals]/crypto [external] (crypto, cjs)");
    });
});
}),
"[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/https-proxy-agent/dist/index.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/[root-of-the-server]__b58f0928._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/https-proxy-agent/dist/index.js [app-route] (ecmascript)");
    });
});
}),
"[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/node-fetch/src/index.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/104b2_node-fetch_src_utils_multipart-parser_edeea2e8.js",
  "server/chunks/104b2_c0a6dfe2._.js",
  "server/chunks/[root-of-the-server]__87f6e720._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/.gemini/antigravity/scratch/ai_tutor_demo/node_modules/node-fetch/src/index.js [app-route] (ecmascript)");
    });
});
}),
];