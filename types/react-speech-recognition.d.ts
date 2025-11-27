declare module 'react-speech-recognition' {
    export interface SpeechRecognition {
        startListening: (options?: { continuous?: boolean; language?: string }) => Promise<void>;
        stopListening: () => Promise<void>;
        abortListening: () => Promise<void>;
        browserSupportsSpeechRecognition: boolean;
    }

    export interface useSpeechRecognitionOptions {
        transcribing?: boolean;
        clearTranscriptOnListen?: boolean;
        commands?: any[];
    }

    export interface useSpeechRecognitionResult {
        transcript: string;
        interimTranscript: string;
        finalTranscript: string;
        listening: boolean;
        resetTranscript: () => void;
        browserSupportsSpeechRecognition: boolean;
        isMicrophoneAvailable: boolean;
    }

    export function useSpeechRecognition(options?: useSpeechRecognitionOptions): useSpeechRecognitionResult;

    const SpeechRecognition: SpeechRecognition;
    export default SpeechRecognition;
}
