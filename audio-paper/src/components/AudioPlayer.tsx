import React, { useRef, useState } from "react";

interface Props {
  src: string;
}

const AudioPlayer: React.FC<Props> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [rate, setRate] = useState<number>(1);

  const changeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const r = parseFloat(e.target.value);
    setRate(r);
    if (audioRef.current) audioRef.current.playbackRate = r;
  };

  const handlePlay = () => {
    audioRef.current?.play();
  };

  const handlePause = () => {
    audioRef.current?.pause();
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div>
      <audio controls ref={audioRef} src={src} />
      <div style={{ margin: "1rem 0" }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <div>
        <label>Speed: {rate}×</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={changeRate}
        />
      </div>
      <a href={src} download="paper-audio.webm">
        Download Audio
      </a>
    </div>
  );
};

export default AudioPlayer;
