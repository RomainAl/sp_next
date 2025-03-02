"use client";

import { AlertDestructive } from "@/components/alertDestructive";
import { LogoSP } from "@/components/logoSP";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { setUserAudio, useAudioStore } from "@/store/audio.user.store";
import { createPeer, peerDataConn, setUserName, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
// import { toast, Toaster } from "sonner";
import { Id, Slide, toast, ToastContainer } from "react-toastify";

export default function Home() {
  const audioContext = useAudioStore((store) => store.audioContext);
  const username = useWebrtcUserStore((store) => store.username);
  const peer = useWebrtcUserStore((store) => store.peer);
  const toast_loading = useRef<Id>(null);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (username) {
      inputRef.current?.setAttribute("placeholder", username);
    }
  }, [username]);
  if (!peer) createPeer();

  const [message, submitaction, pending] = useActionState(async (_: unknown, formData: FormData) => {
    if (!peer) {
      createPeer();
      return "error";
    }
    toast_loading.current = toast.loading("Loading...", { progress: 0.3, className: "rounded-lg bg-primary text-sm" });
    try {
      let name: string = formData.get("username") as string;
      name = name === "" ? username : name;
      toast.update(toast_loading.current, { render: "Loading... (...audio tools)", progress: 0.4 });
      setUserName(name);
      if (!audioContext) await setUserAudio();
      toast.update(toast_loading.current, { render: "Loading... (...connexion)", progress: 0.9 });

      await peerDataConn();
      toast.update(toast_loading.current, {
        render: "Tout est bon !",
        type: "success",
        isLoading: false,
        progress: 0.99,
        className: "rounded-lg bg-accent text-sm",
      });
      toast.dismiss(toast_loading.current);
      router.push("/user/facestime");
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
  // const value = 0;
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-16">
      <div className="flex w-3/5 max-w-sm flex-col items-center justify-center">
        <LogoSP />
        <p className="text-2xl italic text-primary">smart.phonics</p>
      </div>

      <form action={submitaction} className="flex w-2/4 max-w-sm flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-row items-center space-x-2">
          <Input ref={inputRef} type="text" name="username" placeholder={"Pseudo"} />
          <Button disabled={pending} type="submit">
            {pending ? <Spinner className=" text-primary-foreground" /> : <ArrowRight strokeWidth={2.25} />}
          </Button>
        </div>
      </form>

      {!peer && <AlertDestructive title={"OUPS !"} message={"Echec de la connection au serveur (recharge !)"} />}
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </div>
  );
}
