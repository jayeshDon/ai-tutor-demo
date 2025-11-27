import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// WAV Header Helper Function
function createWavHeader(pcmLength: number, sampleRate: number = 24000, numChannels: number = 1, bitsPerSample: number = 16) {
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

export async function POST(req: Request) {
    let text = '';
    try {
        const body = await req.json();
        text = body.text;
        if (!text) return NextResponse.json({ error: 'Text required' }, { status: 400 });

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) throw new Error('API Key missing');

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });

        console.log(`[Gemini TTS] Requesting Umbriel voice for: "${text.substring(0, 20)}..."`);

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Umbriel" } } }
            } as any
        });

        const audioPart = result.response.candidates?.[0]?.content.parts.find((p: any) => p.inlineData);
        if (audioPart?.inlineData?.data) {
            const pcmData = Buffer.from(audioPart.inlineData.data, 'base64');
            const wavBuffer = Buffer.concat([createWavHeader(pcmData.length), pcmData]);
            console.log(`[Gemini TTS] Success!`);
            return NextResponse.json({ audioContent: wavBuffer.toString('base64') });
        }
        throw new Error('No audio from Gemini');
    } catch (error: any) {
        console.error('[Gemini TTS] Error:', error.message);

        // Fallback to Google Cloud TTS
        if (text) {
            console.warn('[Gemini TTS] Failed, falling back to Google Cloud TTS (Wavenet-C)');
            try {
                const client = new TextToSpeechClient({
                    keyFilename: "C:\\Users\\jayesh_naphade\\Downloads\\jyoti-project-477506-882032744666.json"
                });

                const request = {
                    input: { text },
                    voice: { languageCode: 'en-IN', name: 'en-US-Journey-F' },
                    audioConfig: { audioEncoding: 'MP3' },
                } as any;

                const [response] = await client.synthesizeSpeech(request);
                const audioContent = response.audioContent?.toString('base64');

                if (audioContent) {
                    console.log(`[Fallback TTS] Success!`);
                    return NextResponse.json({ audioContent });
                }
            } catch (fallbackError: any) {
                console.error('[Fallback TTS] Error:', fallbackError.message);
            }
        }

        return NextResponse.json({ error: 'TTS Failed', details: error.message }, { status: 500 });
    }
}
