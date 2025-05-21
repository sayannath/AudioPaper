import React, { useState } from "react";
import PdfUploader from "./components/PdfUploader";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  return (
    <div className="App">
      <h1>🚀 PDF→Audio Tool</h1>
      <PdfUploader onAudioReady={setAudioUrl} />
      {audioUrl && (
        <div className="player-container">
          <AudioPlayer src={audioUrl} />
        </div>
      )}
    </div>
  );
}
