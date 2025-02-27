"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { setUserAudio, useAudioStore } from "@/store/audio.store";
import { setPeer, setUserName, useWebrtcStore } from "@/store/webrtc.store";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useRef } from "react";
// import { toast, Toaster } from "sonner";
import { Id, Slide, toast, ToastContainer } from "react-toastify";

export default function Home() {
  const audioContext = useAudioStore((store) => store.audioContext);
  const username = useWebrtcStore((store) => store.username);
  const peer = useWebrtcStore((store) => store.peer);
  const btn = useRef<HTMLButtonElement>(null);
  const toast_loading = useRef<Id>(null);
  const router = useRouter();

  const [message, submitaction, pending] = useActionState(async (_: unknown, formData: FormData) => {
    toast_loading.current = toast.loading("Loading...", { progress: 0.3, className: "rounded-lg bg-primary text-sm" });
    try {
      let name: string = formData.get("username") as string;
      name = name === "" ? username : name;
      // localStorage.setItem("username", name);
      // localStorage.setItem("id", name === "admin" ? name : id);
      toast.update(toast_loading.current, { render: "Loading... (...audios)", progress: 0.4 });
      setUserName(name);
      if (!audioContext) await setUserAudio();
      toast.update(toast_loading.current, { render: "Loading... (...connexions)", progress: 0.9 });
      if (!peer) setPeer();
      toast.update(toast_loading.current, {
        render: "Tout est bon !",
        type: "success",
        isLoading: false,
        progress: 0.99,
        className: "rounded-lg bg-accent text-sm",
      });
      await new Promise((r) => setTimeout(r, 1000));
      toast.dismiss(toast_loading.current);
      if (name === "admin") {
        router.push("/admin/facestime");
      } else {
        router.push("/user/facestime");
      }
      return "success";
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        toast.dismiss(toast_loading.current);
        toast.error("Oh zut! Something went wrong ! (Error : " + e.message + ")", {
          className: "rounded-lg bg-destructive  text-sm",
          autoClose: false,
        });
      }
      return "error";
    }
  }, "");

  console.log(message);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-16">
      <div className="flex w-3/5 max-w-sm flex-col items-center justify-center">
        <svg viewBox="0 0 200 150" fill="none" className="stroke-[15]">
          <path d="M20 140 A 90 90 0 1 1 180 140" className="stroke-accent" />
          <path d="M20 140 A 90 90 0 1 1 180 57.5" className="stroke-primary" />
          <line x1="120" y1="95" x2="182" y2="48" className="stroke-primary" />
        </svg>
        <p className="text-2xl italic text-primary">smart.phonics</p>
      </div>

      <form action={submitaction} className="flex w-2/4 max-w-sm flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-row items-center space-x-2">
          <Input type="text" name="username" placeholder={"Pseudo"} />
          <Button ref={btn} disabled={pending} type="submit">
            {pending ? <Spinner className="text-primary-foreground" /> : <ArrowRight strokeWidth={2.25} />}
          </Button>
        </div>
      </form>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </div>
  );
}
