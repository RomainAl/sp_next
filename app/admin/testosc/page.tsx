"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  const connect = () => {};
  const sendOSC = () => {};

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-7">
        <Button onClick={() => connect()}>TEST</Button>
        <Button onClick={() => sendOSC()}>SEND</Button>
      </div>
    </>
  );
}
