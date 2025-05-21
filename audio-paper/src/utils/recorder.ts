export async function recordSpeech(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    const audioChunks: BlobPart[] = [];

    // Create a MediaStream destination
    const audioContext = new AudioContext();
    const dest = audioContext.createMediaStreamDestination();
    const source = audioContext.createMediaStreamSource(dest.stream);
    const recorder = new MediaRecorder(dest.stream);

    recorder.ondataavailable = (e) => audioChunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      resolve(url);
    };

    // Route speechSynth to MediaStream via AudioContext
    const utterSource = audioContext.createMediaStreamSource(dest.stream);
    // NOTE: Direct routing of speechSynthesis to AudioContext may not work in all browsers.

    recorder.start();
    utter.onend = () => recorder.stop();
    synth.speak(utter);
  });
}
