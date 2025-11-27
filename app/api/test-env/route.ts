import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        env: {
            NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 'Set' : 'Missing',
            GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS ? 'Set' : 'Missing',
            GEMINI_MODEL: process.env.GEMINI_MODEL,
            TTS_VOICE_NAME: process.env.TTS_VOICE_NAME,
            TTS_LANGUAGE_CODE: process.env.TTS_LANGUAGE_CODE,
            TTS_GENDER: process.env.TTS_GENDER,
            TTS_PITCH: process.env.TTS_PITCH,
            TTS_SPEAKING_RATE: process.env.TTS_SPEAKING_RATE,
        }
    });
}
