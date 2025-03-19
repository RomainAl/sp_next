import { setSoundVisualizerParamsRectSize_, useSoundVisualizerParamsStore } from "@/store/shared.store";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

type SoundwaveCanvasProps = ComponentPropsWithoutRef<"canvas"> & { analyser: AnalyserNode | null };

export const SoundwaveCanvas = ({ analyser, ...props }: SoundwaveCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(null);

  const soundVisualizer = (canvas: HTMLCanvasElement, analyser: AnalyserNode) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const isVertical = canvas.height / canvas.width > 1;
    const wOrh = isVertical ? "width" : "height";
    console.log("TODO : useHook dans fonction c'est pas trop");
    analyser.fftSize = useSoundVisualizerParamsStore.getState().fftSize;
    const times = new Uint8Array(analyser.frequencyBinCount);
    const rectSize = useSoundVisualizerParamsStore.getState().rectSize;
    let rectSize_ = useSoundVisualizerParamsStore.getState().rectSize_;
    const gain = useSoundVisualizerParamsStore.getState().gain;
    const barWidth = canvas[isVertical ? "height" : "width"] / analyser.frequencyBinCount;
    const stroke = useSoundVisualizerParamsStore.getState().stroke;
    const rand = useSoundVisualizerParamsStore.getState().rand;
    let meanVal = 0;

    const draw = () => {
      if (Math.random() * rand < 0.1) ctx.clearRect(0, 0, canvas.width, canvas.height);

      let value;
      analyser.getByteTimeDomainData(times);

      if (stroke) {
        for (let i = 0; i < analyser.frequencyBinCount; i++) {
          value = times[i] / 256 - 0.5;
          const z = Math.min(Math.max(value * canvas[wOrh] * gain + canvas[wOrh] * 0.5, 0), canvas[wOrh]) - rectSize / 2;
          value = Math.abs(value);
          ctx.strokeStyle = useSoundVisualizerParamsStore.getState().color;
          if (isVertical) {
            ctx.strokeRect(z, i * barWidth, rectSize_ * (1 - value), rectSize_ * (1 - value));
          } else {
            ctx.strokeRect(i * barWidth, z, rectSize_ * (1 - value), rectSize_ * (1 - value));
          }
          ctx.lineWidth = value * value * value * value * 10000;
        }
      } else {
        for (let i = 0; i < analyser.frequencyBinCount; i++) {
          value = times[i] / 256 - 0.5;
          if (Math.abs(value) < 0.01) value = 0;
          meanVal += Math.abs(value);
          const z = Math.min(Math.max(value * canvas[wOrh] * gain + canvas[wOrh] * 0.5, 0), canvas[wOrh]) - rectSize / 2;
          ctx.fillStyle = useSoundVisualizerParamsStore.getState().color;
          if (isVertical) {
            ctx.fillRect(z, i * barWidth, rectSize_, rectSize_);
          } else {
            ctx.fillRect(i * barWidth, z, rectSize_, rectSize_);
          }
        }
      }
      meanVal /= analyser.frequencyBinCount;
      if (meanVal > 0.25) {
        rectSize_ = rectSize * 5;
      } else {
        rectSize_ = rectSize;
      }
      setSoundVisualizerParamsRectSize_(rectSize_);
      requestRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  useEffect(() => {
    if (!analyser) return;
    if (canvasRef.current) soundVisualizer(canvasRef.current, analyser);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        analyser?.disconnect();
      }
    };
  }, [analyser]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};
