"use client";

import { useHackStore } from "@/store/hack.user.store";
import { useEffect, useRef } from "react";

export default function Home() {
  const hack2 = useHackStore((store) => store.hack2);
  const refDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refDiv.current) refDiv.current.innerHTML = hack2;
    const doScroll = setInterval(() => {
      if (refDiv.current) {
        refDiv.current.scrollTop += 5 + 20 * Math.round(Math.pow(Math.random(), 5));
        if (refDiv.current.scrollTop >= refDiv.current.scrollHeight - refDiv.current.clientHeight - 20) {
          // clearInterval(doScroll);
          refDiv.current.scrollTop = 0;
        }
      }
    }, 10);
    return () => clearInterval(doScroll);
  }, [hack2]);

  return (
    <div className="flex h-screen w-screen ">
      <div ref={refDiv} className="flex-col overflow-hidden text-xs text-primary">
        {/* {hack.map((line, i) => (
          <p key={i}>{line}</p>
        ))} */}
      </div>
    </div>
  );
}
