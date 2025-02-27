import { useRef } from "react";

type userVideoType = {
  stream: MediaStream;
};
export function UserVideo({ stream }: userVideoType) {
  const callingVideoRef = useRef<HTMLVideoElement>(null);
  if (callingVideoRef.current) {
    callingVideoRef.current.srcObject = stream;
  }
  return (
    <div>
      <video className="w-full" playsInline ref={callingVideoRef} autoPlay />
    </div>
  );
}
