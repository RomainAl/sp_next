"use client";

import { AudioMeter } from "@/components/audioMeter";
import { cn } from "@/lib/utils";
import { useAudioAdminStore } from "@/store/audio.admin.store";
import { useWebrtcAdminStore } from "@/store/webrtc.admin.store";

export default function Home() {
  // const callingAudioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const userS = useWebrtcAdminStore((store) => store.userS);
  const analyser_admin = useAudioAdminStore((store) => store.audioAnalyser);

  // useEffect(() => {
  //   userS.forEach((user, i) => {
  //     if (callingAudioRefs.current && callingAudioRefs.current[i]) {
  //       if (user.stream && user.stream.active) callingAudioRefs.current[i].srcObject = user.stream;
  //     }
  //   });
  // }, [userS]);

  return (
    <div className="flex h-screen w-screen flex-wrap items-start text-center">
      <div className="flex size-full flex-row flex-wrap items-start justify-start gap-0">
        {userS.map((user, i) => (
          <div
            key={user.id}
            className={cn("flex w-1/12 flex-col items-center justify-center gap-1 p-1", {
              "w-full": userS.length === 1,
              "w-1/3": userS.length > 1 && userS.length < 10,
              "w-1/6": userS.length > 9 && userS.length < 37,
            })}
          >
            <div className="aspect-square w-full">
              <AudioMeter stream={user.stream} index={i} analyser_admin={analyser_admin} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
