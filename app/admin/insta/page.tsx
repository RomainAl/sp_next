"use client";

import { AudioMeterMemo } from "@/components/audioMeter";
import { InstaCurrVidChart } from "@/components/instaCurrVidChart";
import { RtcStatsChart } from "@/components/rtcStatsChart";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { UserAvatar2Memo } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { useWebrtcAdminStore } from "@/store/webrtc.admin.store";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const userS_id = useWebrtcAdminStore(useShallow((store) => store.userS.map((user) => user.id)));
  const userS_name = useWebrtcAdminStore(useShallow((store) => store.userS.map((user) => user.name)));

  return (
    <div className="flex h-screen w-screen text-center text-sm">
      <ResizablePanelGroup direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="flex flex-col items-center justify-center gap-2">
              <RtcStatsChart />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} className="flex flex-col items-center justify-center gap-2">
              <p>Audio from people : </p>
              <Separator className="w-1/2 bg-accent" />
              <div className="flex size-full flex-row flex-wrap items-center justify-center gap-0">
                {userS_id.map((user_id, i) => (
                  <div
                    key={user_id}
                    className={cn("flex w-1/12 flex-col items-center justify-center gap-1 p-1", {
                      "w-full": userS_id.length === 1,
                      "w-1/3": userS_id.length > 1 && userS_id.length < 10,
                      "w-1/6": userS_id.length > 9 && userS_id.length < 37,
                    })}
                  >
                    <div className="aspect-square w-full">
                      <AudioMeterMemo index={i} />
                    </div>
                  </div>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="flex flex-col items-center justify-center gap-2">
              <p>{`Connected people (${userS_id.length}) : `} </p>
              <Separator className="w-1/2 bg-accent" />
              <div className="flex size-full flex-row flex-wrap items-center justify-center gap-0">
                {userS_id.map((user_id, i) => (
                  <div
                    key={user_id}
                    className={cn("relative w-1/12 aspect-square p-0", {
                      "w-full": userS_id.length === 1,
                      "w-1/3": userS_id.length > 1 && userS_id.length < 10,
                      "w-1/6": userS_id.length > 9 && userS_id.length < 37,
                    })}
                  >
                    <UserAvatar2Memo color="ffffff" name={user_id} size={362} />
                    <div className="absolute top-0 flex size-full items-center justify-center">
                      <p className="w-1/2 rounded-lg border border-primary bg-accent py-1 text-primary"> {userS_name[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} className="flex flex-col items-center justify-center gap-2">
              <InstaCurrVidChart />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
