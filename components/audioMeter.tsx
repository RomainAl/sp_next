import { useAudioAdminStore } from "@/store/audio.admin.store";
import { useEffect, useRef } from "react";

export const AudioMeter = ({
  stream,
  index,
  analyser_admin = null,
}: {
  stream: MediaStream | null;
  index: number;
  analyser_admin?: AnalyserNode | null;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const refAudio = useRef<HTMLAudioElement>(null);
  const audioContext = useAudioAdminStore((store) => store.audioContext);
  const merger = useAudioAdminStore((store) => store.merger);
  const analyser = audioContext?.createAnalyser();
  const splitter = audioContext?.createChannelSplitter(1);
  const requestRef = useRef<number>(null);
  const ch = index % (audioContext?.destination.maxChannelCount ?? 2);
  let source: MediaStreamAudioSourceNode | undefined;

  if (stream) {
    if (refAudio.current) refAudio.current.srcObject = stream;
    source = audioContext?.createMediaStreamSource(stream);
    if (analyser && splitter && merger) source?.connect(splitter).connect(analyser).connect(merger, 0, ch);
  }

  const soundVisualizer = (div: HTMLDivElement, analyser: AnalyserNode) => {
    analyser.fftSize = 512;
    if (analyser_admin) analyser_admin.fftSize = 512;
    const times = new Uint8Array(analyser.frequencyBinCount);
    const times_admin = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteTimeDomainData(times);
      if (analyser_admin) analyser_admin.getByteTimeDomainData(times_admin);
      let sum = 0.0;
      let sum_admin = 0.0;
      for (const amplitude of times) {
        const value = 2 * (amplitude / 256 - 0.5);
        sum += value;
      }
      if (analyser_admin) {
        for (const amplitude of times_admin) {
          const value = amplitude / 256 - 0.5;
          sum_admin += value;
        }
      }
      if (sum_admin > 0.1) {
        div.style.backgroundColor = `rgb(229, 115, 51)`;
      } else {
        div.style.backgroundColor = `rgb(${255 * sum}, ${255 * sum}, ${255 * sum})`;
      }
      requestRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    if (!analyser) return;
    if (ref.current && analyser) soundVisualizer(ref.current, analyser); // TODO : CHECK IF BUG ?
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      analyser?.disconnect();
      analyser_admin?.disconnect();
      splitter?.disconnect();
      source?.disconnect();
    };
  }, [analyser]);

  return (
    <div className="size-full" ref={ref}>
      <audio className="hidden" ref={refAudio} autoPlay={false} controls={false} muted></audio>
    </div>
  );
};
