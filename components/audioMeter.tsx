import { useAudioAdminStore } from "@/store/audio.admin.store";
import { useEffect, useRef } from "react";

export const AudioMeter = ({ stream }: { stream: MediaStream | null }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refAudio = useRef<HTMLAudioElement>(null);
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const analyser = audioContext?.createAnalyser();

  if (stream) {
    if (refAudio.current) refAudio.current.srcObject = stream;
    const source = audioContext?.createMediaStreamSource(stream);
    if (analyser) source?.connect(analyser);
  }
  const soundVisualizer = (div: HTMLDivElement, analyser: AnalyserNode) => {
    analyser.fftSize = 512;
    const times = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteTimeDomainData(times);
      let sum = 0.0;
      for (const amplitude of times) {
        const value = 2 * (amplitude / 256 - 0.5);
        sum += value;
      }
      // div.style.backgroundColor = "hsl(" + (1 - 2 * Math.sqrt(sum / params.fftSize)) * 500 + ", 100%, 50%)";
      div.style.backgroundColor = `rgb(${255 * sum}, ${255 * sum}, ${255 * sum})`;

      requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    if (!analyser) {
      return;
    }
    if (ref.current) soundVisualizer(ref.current, analyser);
  }, [analyser]);

  return (
    <div className="size-full" ref={ref}>
      <audio className="hidden" ref={refAudio} autoPlay={false} controls={false} muted></audio>
    </div>
  );
};
