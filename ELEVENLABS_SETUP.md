# ElevenLabs TTS Setup Guide

## Problem
- Gemini TTS quota exhausted (15 requests/day limit)
- Browser TTS sounds robotic, not human-like

## Solution: ElevenLabs TTS
- **Quality**: Human-like, natural voices
- **Free Tier**: 10,000 characters/month (~ 10 minutes audio)
- **Latency**: Similar to Gemini TTS
- **Voices**: Rachel (Female), Adam (Male), and more

## Setup Steps

### 1. Get ElevenLabs API Key (FREE)

1. Go to https://elevenlabs.io
2. Sign up for free account
3. Click your profile (bottom left) → "API Keys"
4. Click "Create API Key"
5. Copy the key (starts with `sk_...`)

### 2. Add API Key to .env.local

Open `.env.local` and add:
```
ELEVENLABS_API_KEY=your_api_key_here
```

### 3. Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 4. Update ChatInterface.tsx

The ElevenLabs API route is already created at:
`app/api/elevenlabs-tts/route.ts`

You need to update `components/ChatInterface.tsx` to use it.

**Find this line (around line 219):**
```typescript
const res = await fetch("/api/tts", {
```

**Change to:**
```typescript
const res = await fetch("/api/elevenlabs-tts", {
```

**Also update the audio format (around line 240):**
```typescript
// OLD:
const audio = new Audio(`data:audio/wav;base64,${data.audioContent}`);

// NEW:
const mimeType = data.mimeType || 'audio/mpeg';
const audio = new Audio(`data:${mimeType};base64,${data.audioContent}`);
```

## Available Voices

In `app/api/elevenlabs-tts/route.ts`, change `voiceId`:

```typescript
// Rachel (American Female) - Natural and clear
const voiceId = "21m00Tcm4TlvDq8ikWAM";

// Other free voices:
// Adam (American Male): "pNInz6obpgDQGcFmaJgB"
// Antoni (American Male): "ErXwobaYiN019PkySvjV"  
// Elli (American Female): "MF3mGyEYCl7XYWbV9V6O"
// Josh (American Male): "TxGEqnHWrfWFTfGW9XjX"
// Arnold (American Male): "VR6AewLTigWG4xSOukaG"
// Sam (American Male): "yoZ06aMxZJJ28mfd3POQ"
```

## Fallback Chain

The app will try in this order:
1. **ElevenLabs** (best quality, human-like)
2. **Gemini TTS** (good quality, limited quota)
3. **Browser TTS** (instant, unlimited, robotic)

## Testing

1. Get API key from ElevenLabs
2. Add to `.env.local`
3. Update ChatInterface.tsx (2 lines)
4. Restart server
5. Test with a question

Console will show:
```
[TTS] Trying ElevenLabs...
[ElevenLabs TTS] Generation took XXXms
```

## Free Tier Limits

- 10,000 characters/month
- ~10 minutes of audio
- Resets monthly
- No credit card required

Perfect for testing and light usage!
