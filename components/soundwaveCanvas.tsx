import { useAudioStore } from "@/store/audio.user.store";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

type SoundwaveCanvasProps = ComponentPropsWithoutRef<"canvas">;

export function SoundwaveCanvas(props: SoundwaveCanvasProps) {
  console.log("TODO : RENDER CANVAS - SoundwaveCanvas");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyser = useAudioStore((store) => store.audioAnalyser);

  const visualizer = (canvas: HTMLCanvasElement, analyser: AnalyserNode) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    analyser.fftSize = 512;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const times = new Uint8Array(analyser.frequencyBinCount);
    const rectSize = 5;
    const gain = 10;
    const barWidth = canvas.width / analyser.frequencyBinCount;

    const draw = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      let value;
      analyser.getByteTimeDomainData(times);

      for (let i = 0; i < analyser.frequencyBinCount; i++) {
        value = times[i] / 256 - 0.5;
        const y = Math.min(Math.max(value * HEIGHT * gain + HEIGHT * 0.5, 0), HEIGHT) - rectSize / 2;
        ctx.fillStyle = "rgb(229, 115, 51)";
        ctx.fillRect(i * barWidth, y, rectSize, rectSize);
      }
      requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    if (!analyser) {
      return;
    }
    if (canvasRef.current) visualizer(canvasRef.current, analyser);
  }, [analyser]);

  return <canvas ref={canvasRef} {...props}></canvas>;
}
export default SoundwaveCanvas;
