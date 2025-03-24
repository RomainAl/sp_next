// import { useState } from "react";

// import { circOut } from "motion";
import { useAudioUserStore } from "@/store/audio.user.store";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { MouseEvent, useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

export function Knob({ indexI, indexP }: { indexI: number; indexP: number }) {
  const RNBOparam = useAudioUserStore(useShallow((store) => store.instrus[indexI].parameters[indexP]));

  const refPath = useRef<SVGPathElement>(null);
  const refLine = useRef<SVGLineElement>(null);
  const refDiv = useRef<HTMLDivElement>(null);
  const viewBoxSize = 110;
  const R = 50;
  const stroke = 10;
  const startCircle = useMemo(() => {
    const a = (2.5 * Math.PI) / 2;
    const x = R * Math.cos(a) + viewBoxSize / 2;
    const y = -(R * Math.sin(a)) + viewBoxSize / 2;
    return { x, y };
  }, []);
  const stopCircle = useMemo(() => {
    const a = (-0.5 * Math.PI) / 2;
    const x = R * Math.cos(a) + viewBoxSize / 2;
    const y = -(R * Math.sin(a)) + viewBoxSize / 2;
    return { x, y };
  }, []);

  const aa = useMotionValue(0);
  const aaa = useSpring(aa, { bounce: 0, duration: 500, restDelta: 0.1 });
  const pathD = useTransform(
    () =>
      `M${startCircle.x} ${startCircle.y} A 50 50 0 ${(2.5 * Math.PI) / 2 - aaa.get() > Math.PI ? 1 : 0} 1 ${
        R * Math.cos(aaa.get()) + viewBoxSize / 2
      } ${-(R * Math.sin(aaa.get())) + viewBoxSize / 2}`
  );
  const xl = useTransform(() => `${(R + stroke / 2) * Math.cos(aaa.get()) + viewBoxSize / 2}`);
  const yl = useTransform(() => `${-((R + stroke / 2) * Math.sin(aaa.get())) + viewBoxSize / 2}`);
  const percent = useTransform(() => `${Math.round((100 * (2.5 * Math.PI - 2 * aaa.get())) / (3 * Math.PI))}%`);

  useEffect(() => {
    const param = (RNBOparam.initialValue - RNBOparam.min) / (RNBOparam.max - RNBOparam.min);
    const a_ = (param * (3 * Math.PI)) / 2;
    const a = (2.5 * Math.PI) / 2 - a_;
    aa.set(a);
  }, [RNBOparam, aa]);

  useEffect(() => {
    const myDiv = refDiv.current;
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && myDiv) {
        const touch = e.touches[0];
        const param = Math.min(Math.max((touch.clientX - myDiv.offsetLeft) / myDiv.offsetWidth, 0), 1);
        RNBOparam.value = param * (RNBOparam.max - RNBOparam.min) + RNBOparam.min;
        const a_ = (param * (3 * Math.PI)) / 2;
        const a = (2.5 * Math.PI) / 2 - a_;
        aa.set(a);
      }
    };
    if (myDiv) {
      myDiv.addEventListener("touchmove", handleTouchMove, { passive: false });
    }
    return () => {
      if (myDiv) {
        console.log("TOCHECK = Close touche event ?");
        myDiv.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [aa, RNBOparam]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const myDiv = refDiv.current;
    if (myDiv) {
      const param = Math.min(Math.max((e.clientX - myDiv.offsetLeft) / myDiv.offsetWidth, 0), 1);
      RNBOparam.value = param * (RNBOparam.max - RNBOparam.min) + RNBOparam.min;
      const a_ = (param * (3 * Math.PI)) / 2;
      const a = (2.5 * Math.PI) / 2 - a_;
      aa.set(a);
    }
  };

  return (
    <div ref={refDiv} onClick={handleClick} className="flex size-full touch-none flex-col items-center justify-center">
      <p className="m-auto text-sm font-black text-white">{RNBOparam.name}</p>
      <div className="relative w-3/4">
        <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} fill="none" strokeWidth={stroke}>
          <path d={`M${startCircle.x} ${startCircle.y} A 50 50 0 1 1 ${stopCircle.x} ${stopCircle.y}`} className="stroke-accent" />
          <motion.path ref={refPath} d={pathD} className="stroke-primary" />
          <motion.line ref={refLine} x1={viewBoxSize / 2} y1={viewBoxSize / 2} x2={xl} y2={yl} className="stroke-primary" />
        </svg>
        <div className="absolute top-0 flex size-full items-end justify-center">
          <motion.p className="text-xs font-black text-primary">{percent}</motion.p>
        </div>
      </div>
    </div>
  );
}

// const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };

// export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
//   const x = useSpring(0, spring);
//   const y = useSpring(0, spring);

//   useEffect(() => {
//     if (!ref.current) return;

//     const handlePointerMove = (e: PointerEvent) => {
//       const element = ref.current!;

//       frame.read(() => {
//         x.set(e.clientX - element.offsetLeft - element.offsetWidth / 2);
//         y.set(e.clientY - element.offsetTop - element.offsetHeight / 2);
//       });
//     };

//     window.addEventListener("pointermove", handlePointerMove);

//     return () => window.removeEventListener("pointermove", handlePointerMove);
//   }, []);

//   return { x, y };
// }
