"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, Square, ArrowLeft, Volume2, Video } from "lucide-react";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ChatMessage {
    role: "user" | "model";
    parts: string;
}

interface ChatInterfaceProps {
    transcript: string;
    videoUrl: string;
    onBack: () => void;
}

export default function ChatInterface({ transcript, videoUrl, onBack }: ChatInterfaceProps) {
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [status, setStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");

    const {
        transcript: userTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // Silence detection logic
    const [silenceDuration, setSilenceDuration] = useState(0);
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const isSendingRef = useRef(false); // Lock to prevent double sends
    const SILENCE_THRESHOLD = 800; // 0.8s silence threshold for snappy response

    // Reset silence timer on transcript update
    useEffect(() => {
        if (status === "listening" && userTranscript.trim()) {
            setSilenceDuration(0);

            if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

            // Start visual timer (update state every 100ms for UI)
            const startTime = Date.now();
            const intervalId = setInterval(() => {
                const elapsed = Date.now() - startTime;
                setSilenceDuration(elapsed);

                if (elapsed >= SILENCE_THRESHOLD) {
                    clearInterval(intervalId);
                    // Trigger send
                    if (!isSendingRef.current) {
                        SpeechRecognition.stopListening();
                        handleSend(userTranscript);
                    }
                }
            }, 100);

            silenceTimerRef.current = intervalId;

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [userTranscript, status]);

    // Handle browser auto-stop (Network/Engine stop)
    useEffect(() => {
        if (!listening && status === "listening" && userTranscript.trim()) {
            // Only send if we haven't already sent (lock check)
            if (!isSendingRef.current) {
                handleSend(userTranscript);
            }
        }
    }, [listening, status, userTranscript]);


    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ttsAbortControllerRef = useRef<AbortController | null>(null);

    // Stop audio when user starts speaking (Barge-in)
    useEffect(() => {
        // If listening and ANY text is detected (even 1 char), stop audio immediately
        if (listening && userTranscript && isPlaying) {
            console.log("Barge-in triggered: Stopping audio");

            // 1. Stop Audio Element
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            // 2. Stop Browser TTS
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }

            // 3. Abort Pending TTS Request
            if (ttsAbortControllerRef.current) {
                ttsAbortControllerRef.current.abort();
                ttsAbortControllerRef.current = null;
            }

            setIsPlaying(false);
            // Ensure status remains listening
            if (status !== "listening") setStatus("listening");
        }
    }, [listening, userTranscript, isPlaying, status]);

    const handleMicToggle = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            if (userTranscript.trim() && !isSendingRef.current) {
                handleSend(userTranscript);
            } else {
                setStatus("idle");
            }
        } else {
            // Stop any playing audio when mic is manually activated
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
            }
            // Stop browser TTS
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            resetTranscript();
            setSilenceDuration(0);
            isSendingRef.current = false; // Reset lock
            setStatus("listening");
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    const handleSend = async (text: string) => {
        if (!text.trim() || isSendingRef.current) return;

        isSendingRef.current = true; // Set lock
        setStatus("processing");

        // Stop any existing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }

        const newHistory = [...history, { role: "user" as const, parts: text }];
        setHistory(newHistory);

        // Reset transcript immediately to prevent barge-in from triggering on the sent message
        resetTranscript();
        setSilenceDuration(0);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: newHistory, message: text, transcript }),
            });

            const data = await res.json();

            if (!res.ok) {
                const errorMsg = data.error || "Failed to get response";
                if (res.status === 429) {
                    alert("Too many requests! The AI is busy. Please wait a moment and try again.");
                } else if (res.status === 500) {
                    alert(`Server Error: ${data.details || errorMsg}`);
                } else {
                    alert(`Error: ${errorMsg}`);
                }
                throw new Error(errorMsg);
            }

            const aiResponseText = data.response;
            const updatedHistory = [...newHistory, { role: "model" as const, parts: aiResponseText }];
            setHistory(updatedHistory);

            // Play TTS
            await playTTS(aiResponseText);

        } catch (error) {
            console.error("Error getting response:", error);
            setStatus("idle");
        }
    };

    const playTTS = async (text: string) => {
        // Stop any currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Stop browser TTS if playing
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        // Abort any pending TTS fetch
        if (ttsAbortControllerRef.current) {
            ttsAbortControllerRef.current.abort();
        }
        utterance.rate = 1.1; // Slightly faster for snappier responses
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Try to use a good Indian English voice if available
        const voices = window.speechSynthesis.getVoices();
        console.log("[Browser TTS] Available voices:", voices.map(v => `${v.name} (${v.lang})`));

        // Priority: Indian English > Natural/Google voices > Any English
        const preferredVoice = voices.find(v => v.lang === 'en-IN') || // Indian English
            voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural'))) || // Natural voices
            voices.find(v => v.lang.startsWith('en')); // Any English

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log(`[Browser TTS] Using voice: ${preferredVoice.name} (${preferredVoice.lang})`);
        } else {
            console.log("[Browser TTS] Using default voice");
        }

        utterance.onend = () => {
            setIsPlaying(false);
            setStatus("idle");
        };

        utterance.onerror = (err) => {
            console.error("Browser TTS error:", err);
            setIsPlaying(false);
            setStatus("idle");
        };

        window.speechSynthesis.speak(utterance);
    };

    if (!browserSupportsSpeechRecognition) {
        return <div className="text-white">Browser does not support speech recognition.</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-slate-900 text-white">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Tutor
                </h1>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {/* Video Player (Compact) */}
                <div className="aspect-video bg-black rounded-lg overflow-hidden border border-slate-800 shadow-lg max-w-2xl mx-auto">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${(() => {
                            const match = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                            return match ? match[1] : '';
                        })()}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>

                {/* Chat History */}
                <div className="space-y-4 max-w-2xl mx-auto pb-32">
                    {history.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user"
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                                }`}>
                                {msg.parts}
                            </div>
                        </motion.div>
                    ))}

                    {/* Live Transcript / Processing Indicator */}
                    {(listening || status === "processing" || status === "speaking") && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center"
                        >
                            <div className="bg-slate-800/80 backdrop-blur px-6 py-3 rounded-full border border-slate-700 flex items-center gap-3">
                                {status === "listening" && (
                                    <>
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        <span className="text-slate-300 text-sm">
                                            {userTranscript || "Listening..."}
                                        </span>
                                        {/* Visual Silence Timer */}
                                        <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden ml-2">
                                            <motion.div
                                                className="h-full bg-blue-500"
                                                initial={{ width: "0%" }}
                                                animate={{ width: `${Math.min((silenceDuration / SILENCE_THRESHOLD) * 100, 100)}%` }}
                                                transition={{ duration: 0.1 }}
                                            />
                                        </div>
                                    </>
                                )}
                                {status === "processing" && (
                                    <>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                        <span className="text-slate-300 text-sm">Thinking...</span>
                                    </>
                                )}
                                {status === "speaking" && (
                                    <>
                                        <Volume2 className="w-4 h-4 text-green-400 animate-pulse" />
                                        <span className="text-slate-300 text-sm">Speaking...</span>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-900/80 backdrop-blur-lg border-t border-slate-800 fixed bottom-0 w-full">
                <div className="max-w-2xl mx-auto flex justify-center items-center gap-6">
                    <button
                        onClick={handleMicToggle}
                        className={`p-6 rounded-full transition-all duration-300 shadow-xl ${listening
                            ? "bg-red-500 hover:bg-red-600 shadow-red-500/30 scale-110"
                            : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
                            }`}
                    >
                        {listening ? (
                            <Square className="w-8 h-8 text-white fill-current" />
                        ) : (
                            <Mic className="w-8 h-8 text-white" />
                        )}
                    </button>

                    {/* Status Text */}
                    <div className="absolute bottom-2 text-xs text-slate-500">
                        {status === "idle" && "Tap to speak"}
                        {status === "listening" && "Listening..."}
                        {status === "processing" && "Processing..."}
                        {status === "speaking" && "Tap mic to interrupt"}
                    </div>
                </div>
            </div>
        </div>
    );
}
