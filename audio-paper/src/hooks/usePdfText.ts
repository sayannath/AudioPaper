import { useState, useEffect } from "react";
import { extractTextFromPdf } from "../utils/pdfToText";

export function usePdfText(file: File | null) {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!file) return;
    (async () => {
      try {
        const t = await extractTextFromPdf(file);
        setText(t);
      } catch (e) {
        setError(e as Error);
      }
    })();
  }, [file]);

  return { text, error };
}
