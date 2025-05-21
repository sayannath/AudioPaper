import React, { useState, useEffect } from "react";
import { usePdfText } from "../hooks/usePdfText";
import { recordSpeech } from "../utils/recorder";

interface Props {
  onAudioReady: (url: string) => void;
}

const PdfUploader: React.FC<Props> = ({ onAudioReady }) => {
  const [file, setFile] = useState<File | null>(null);
  const { text, error } = usePdfText(file);

  // When text extraction completes, generate speech
  useEffect(() => {
    if (!text) return;
    (async () => {
      try {
        const audioUrl = await recordSpeech(text);
        onAudioReady(audioUrl);
      } catch (err) {
        console.error("Error generating audio:", err);
      }
    })();
  }, [text, onAudioReady]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.type === "application/pdf") {
      setFile(f);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleChange} />
      {error && (
        <p style={{ color: "red" }}>Error extracting text: {error.message}</p>
      )}
    </div>
  );
};

export default PdfUploader;
