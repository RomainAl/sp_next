"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { UserAvatar2 } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { useWebrtcAdminStore } from "@/store/webrtc.admin.store";

export default function Home() {
  const userS = useWebrtcAdminStore((store) => store.userS);
  console.log(userS);
  console.log("Render outside useEffect !");
  return (
    <div className="flex h-screen w-screen text-center text-sm">
      <ResizablePanelGroup direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="flex flex-col items-center justify-center gap-2">
              <p>Connected people : </p>
              <Separator className="w-1/2 bg-accent" />
              <div className="flex size-full flex-row flex-wrap items-start justify-start gap-0">
                {userS.map((user) => (
                  <div
                    key={user.id}
                    className={cn("flex w-1/12 flex-col items-center justify-center gap-1 p-1", {
                      "w-full": userS.length === 1,
                      "w-1/3": userS.length > 1 && userS.length < 10,
                      "w-1/6": userS.length > 9 && userS.length < 37,
                    })}
                  >
                    <div className="aspect-square w-full">
                      <UserAvatar2 name={user.name} size={362} />
                    </div>
                    <p className="text-primary"> {user.name}</p>
                  </div>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
