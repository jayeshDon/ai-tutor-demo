// Test Browser TTS Voices
// Run this in browser console or as a standalone HTML file

console.log("=== Testing Browser TTS Voices ===\n");

// Get all available voices
const voices = window.speechSynthesis.getVoices();

if (voices.length === 0) {
    console.log("⚠️ No voices loaded yet. Waiting...");
    // Voices might load asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
        const voicesLoaded = window.speechSynthesis.getVoices();
        console.log(`✅ Loaded ${voicesLoaded.length} voices\n`);
        listAndTestVoices(voicesLoaded);
    };
} else {
    listAndTestVoices(voices);
}

function listAndTestVoices(voices) {
    console.log("📋 All Available Voices:\n");
    voices.forEach((voice, index) => {
        console.log(`${index + 1}. ${voice.name}`);
        console.log(`   Language: ${voice.lang}`);
        console.log(`   Local: ${voice.localService ? 'Yes' : 'No'}`);
        console.log(`   Default: ${voice.default ? 'Yes' : 'No'}\n`);
    });

    // Find Indian English voices
    console.log("\n🇮🇳 Indian English Voices (en-IN):");
    const indianVoices = voices.filter(v => v.lang === 'en-IN');
    if (indianVoices.length > 0) {
        indianVoices.forEach(v => console.log(`  ✓ ${v.name}`));
    } else {
        console.log("  ❌ No Indian English voices found");
    }

    // Find all English voices
    console.log("\n🌍 All English Voices:");
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    englishVoices.forEach(v => console.log(`  • ${v.name} (${v.lang})`));

    // Test the voice selection logic (same as ChatInterface.tsx)
    console.log("\n🎯 Voice Selection (Current App Logic):");
    const preferredVoice = voices.find(v => v.lang === 'en-IN') ||
        voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural'))) ||
        voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
        console.log(`✅ Selected: ${preferredVoice.name} (${preferredVoice.lang})`);

        // Test the voice
        console.log("\n🔊 Testing selected voice...");
        const testText = "Hello! I am your AI tutor. This is a test of the text to speech system.";
        const utterance = new SpeechSynthesisUtterance(testText);
        utterance.voice = preferredVoice;
        utterance.rate = 1.1;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onstart = () => console.log("▶️ Playing...");
        utterance.onend = () => console.log("✅ Playback complete!");
        utterance.onerror = (err) => console.error("❌ Error:", err);

        window.speechSynthesis.speak(utterance);
    } else {
        console.log("❌ No suitable voice found");
    }
}

// Manual test function - call this to test any voice by index
window.testVoice = function (voiceIndex) {
    const voices = window.speechSynthesis.getVoices();
    if (voiceIndex < 0 || voiceIndex >= voices.length) {
        console.error(`❌ Invalid index. Use 0-${voices.length - 1}`);
        return;
    }

    const voice = voices[voiceIndex];
    console.log(`\n🔊 Testing: ${voice.name} (${voice.lang})`);

    const utterance = new SpeechSynthesisUtterance("Hello! This is a voice test.");
    utterance.voice = voice;
    utterance.rate = 1.1;

    window.speechSynthesis.speak(utterance);
};

console.log("\n💡 Tip: Use testVoice(index) to test any voice manually");
console.log("   Example: testVoice(0) to test the first voice\n");
