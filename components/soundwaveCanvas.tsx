import { soundVisualiserParamsType, useSoundVisualizerParamsStore } from "@/store/shared.store";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

type SoundwaveCanvasProps = ComponentPropsWithoutRef<"canvas"> & { analyser: AnalyserNode | null };

export const SoundwaveCanvas = ({ analyser, ...props }: SoundwaveCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useSoundVisualizerParamsStore();
  const requestRef = useRef<number>(null);
  const soundVisualizer = (canvas: HTMLCanvasElement, analyser: AnalyserNode, params: soundVisualiserParamsType) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    analyser.fftSize = params.fftSize;
    const times = new Uint8Array(analyser.frequencyBinCount);
    const rectSize = params.rectSize;
    const gain = params.gain;
    const barWidth = canvas.width / analyser.frequencyBinCount;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let value;
      analyser.getByteTimeDomainData(times);

      for (let i = 0; i < analyser.frequencyBinCount; i++) {
        value = times[i] / 256 - 0.5;
        const y = Math.min(Math.max(value * canvas.height * gain + canvas.height * 0.5, 0), canvas.height) - rectSize / 2;
        ctx.fillStyle = params.color;
        ctx.fillRect(i * barWidth, y, rectSize, rectSize);
      }
      requestRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    if (!analyser) {
      return;
    }
    if (canvasRef.current) soundVisualizer(canvasRef.current, analyser, params);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        analyser?.disconnect();
      }
    };
  }, [analyser, params]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};
