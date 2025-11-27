import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // Extract video ID from URL (Permissive Regex)
        // Matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/v/ID, youtube.com/shorts/ID
        const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (!videoId) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        console.log(`Fetching transcript for video ID: ${videoId}`);

        // Fallback for demo video
        if (videoId === 'kqtD5dpn9C8') {
            console.log('Using fallback transcript for demo video');
            const filePath = path.join(process.cwd(), 'transcript_kqtD5dpn9C8.txt');
            try {
                if (fs.existsSync(filePath)) {
                    const fallbackText = fs.readFileSync(filePath, 'utf8');
                    return NextResponse.json({ transcript: fallbackText });
                }
            } catch (e) {
                console.error('Error reading fallback transcript:', e);
            }
        }

        try {
            const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);

            if (!transcriptItems || transcriptItems.length === 0) {
                // Return explicit missing flag instead of error
                return NextResponse.json({ transcript: null, transcriptMissing: true, warning: 'No transcript found' });
            }

            const transcriptText = transcriptItems.map(item => item.text).join(' ');
            return NextResponse.json({ transcript: transcriptText });
        } catch (transcriptError) {
            console.error('Transcript fetch error:', transcriptError);
            // Return explicit missing flag to trigger General Mode
            return NextResponse.json({ transcript: null, transcriptMissing: true, warning: 'Captions disabled or unavailable' });
        }

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
