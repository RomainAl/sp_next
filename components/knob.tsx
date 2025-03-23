// import { useState } from "react";

import { useMemo, useRef } from "react";
import { useInterval } from "usehooks-ts";

export function Knob() {
  const refPath = useRef<SVGPathElement | null>(null);
  const refLine = useRef<SVGLineElement | null>(null);
  const refParams = useRef<HTMLParagraphElement>(null);
  const viewBoxSize = 110;
  const R = 50;
  const stroke = 10;
  const startCircle = useMemo(() => {
    const c = { x: viewBoxSize / 2, y: viewBoxSize / 2 };
    const a = (2.5 * Math.PI) / 2;
    const x = R * Math.cos(a) + c.x;
    const y = -(R * Math.sin(a)) + c.y;
    return { x, y };
  }, []);
  const stopCircle = useMemo(() => {
    const c = { x: viewBoxSize / 2, y: viewBoxSize / 2 };
    const a = (-0.5 * Math.PI) / 2;
    const x = R * Math.cos(a) + c.x;
    const y = -(R * Math.sin(a)) + c.y;
    return { x, y };
  }, []);

  useInterval(() => {
    const c = { x: viewBoxSize / 2, y: viewBoxSize / 2 };
    const param = Math.random();
    const aa = (param * (3 * Math.PI)) / 2;
    const a = (2.5 * Math.PI) / 2 - aa;
    const x = R * Math.cos(a) + c.x;
    const y = -(R * Math.sin(a)) + c.y;
    const xl = (R + stroke / 2) * Math.cos(a) + c.x;
    const yl = -((R + stroke / 2) * Math.sin(a)) + c.y;
    refPath.current?.setAttribute("d", `M${startCircle.x} ${startCircle.y} A 50 50 0 ${aa > Math.PI ? 1 : 0} 1 ${x} ${y}`);
    refLine.current?.setAttribute("x2", String(xl));
    refLine.current?.setAttribute("y2", String(yl));
    if (refParams.current) refParams.current.innerText = String(Math.round(param * 100)) + "%";
  }, 1000);

  return (
    <div className="flex flex-col gap-2">
      <p className="m-auto text-xl font-black text-white">Ta mère</p>
      <div className="relative">
        <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} fill="none" className={`stroke-[${stroke}]`}>
          <path d={`M${startCircle.x} ${startCircle.y} A 50 50 0 1 1 ${stopCircle.x} ${stopCircle.y}`} className="stroke-accent" />
          <path ref={refPath} d={`M${startCircle.x} ${startCircle.y} A 50 50 0 1 1 ${stopCircle.x} ${stopCircle.y}`} className="stroke-primary" />
          <line ref={refLine} x1={viewBoxSize / 2} y1={viewBoxSize / 2} x2="10" y2="10" className="stroke-primary" />
        </svg>
        <div className="absolute top-0 flex size-full items-end justify-center">
          <p ref={refParams} className="text-lg font-black text-primary"></p>
        </div>
      </div>
    </div>
  );
}
