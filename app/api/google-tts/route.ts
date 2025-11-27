import { NextResponse } from 'next/server';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        console.log(`[Google Cloud TTS] Request received: "${text.substring(0, 50)}..."`);

        // Initialize Google Cloud TTS client with service account
        const client = new TextToSpeechClient({
            keyFilename: "C:\\Users\\jayesh_naphade\\Downloads\\jyoti-project-477506-882032744666.json"
        });

        const startTime = Date.now();

        // Configure the synthesis request
        const request = {
            input: { text: text },
            voice: {
                languageCode: 'en-IN', // Indian English
                name: 'en-IN-Neural2-C', // Neural2-C voice as requested

                // === WAVENET VOICES (High Quality) ===
                // 'en-IN-Wavenet-A' - Female, clear
                // 'en-IN-Wavenet-B' - Male, deep
                // 'en-IN-Wavenet-C' - Male, warm ⭐ SELECTED
                // 'en-IN-Wavenet-D' - Female, natural

                // === NEURAL2 VOICES (Newest, Best Quality) ===
                // 'en-IN-Neural2-A' - Female, very natural
                // 'en-IN-Neural2-B' - Male, very natural
                // 'en-IN-Neural2-C' - Female, expressive
                // 'en-IN-Neural2-D' - Male, expressive
            },
            audioConfig: {
                audioEncoding: 'MP3' as const,
                speakingRate: 1.1, // Slightly faster for responsiveness
                pitch: 0.0,
                volumeGainDb: 0.0,
            },
        };

        // Perform the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);
        const endTime = Date.now();

        console.log(`[Google Cloud TTS] Generation took ${endTime - startTime}ms`);

        if (!response.audioContent) {
            throw new Error("No audio content generated");
        }

        // Convert audio content to base64
        const audioBuffer = Buffer.from(response.audioContent as Uint8Array);
        const base64Audio = audioBuffer.toString('base64');

        console.log(`[Google Cloud TTS] Audio size: ${audioBuffer.length} bytes`);

        return NextResponse.json({
            audioContent: base64Audio,
            mimeType: 'audio/mpeg'
        });

    } catch (error: any) {
        console.error('[Google Cloud TTS] Error:', error);
        return NextResponse.json({
            error: 'TTS Failed',
            details: error.message
        }, { status: 500 });
    }
}
