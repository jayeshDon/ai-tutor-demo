"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Play, Loader2, Volume2 } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [error, setError] = useState("");

  const handleStart = async () => {
    if (!videoUrl) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch transcript");
      }

      if (data.transcriptMissing) {
        console.warn(data.warning);
        // Optional: You could set a UI warning state here
        // setError(data.warning); // Don't set error as it blocks the UI, maybe a toast?
        // For now, we just proceed. The ChatInterface handles null transcript.
      }

      setTranscript(data.transcript || ""); // Ensure it's a string or null, but state is initialized as string.
      // If null, we pass empty string? API expects null or string.
      // Let's pass null if missing to be explicit, but state is string.
      // Actually, let's just pass "" if null, and Chat API checks `if (transcript)`. Empty string is falsy.

      setIsChatActive(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!isChatActive ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  AI Video Tutor
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Have a live voice conversation with any YouTube video.
                  <br />
                  Just paste the link and start learning.
                </p>
              </div>

              <div className="w-full max-w-xl space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <input
                    type="text"
                    placeholder="Paste YouTube URL here..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="relative w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-lg"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => setVideoUrl("https://www.youtube.com/watch?v=kqtD5dpn9C8")}
                    className="text-sm text-slate-500 hover:text-blue-400 transition-colors underline"
                  >
                    Try a Demo Video (Python Tutorial)
                  </button>
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  onClick={handleStart}
                  disabled={isLoading || !videoUrl}
                  className="w-full bg-white text-slate-900 font-bold py-4 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Processing Video...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>Start Session</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <ChatInterface
              transcript={transcript}
              videoUrl={videoUrl}
              onBack={() => setIsChatActive(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
