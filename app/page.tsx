"use client";

import { LogoSP } from "@/components/logoSP";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
// import { UserAvatar } from "@/components/userAvatar";
import { setUserAudio, useAudioUserStore } from "@/store/audio.user.store";
import { setInstaVidMeta } from "@/store/insta.user.store";
import { setInitMessUserStore } from "@/store/mess.user.store";
import { createPeer, setUserName } from "@/store/webrtc.user.store";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useRef } from "react";

// import { toast, Toaster } from "sonner";
import { Id, Slide, toast, ToastContainer } from "react-toastify";

export default function Home() {
  // const peer = useWebrtcUserStore((store) => store.peer);
  // const [pending, startTransition] = useTransition();
  // useEffect(() => {
  //   if (!peer)
  //     startTransition(async () => {
  //       createPeer();
  //     });
  // }, [peer]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <div className="flex w-1/2 max-w-sm flex-col items-center justify-center">
        <LogoSP />
        <p className="text-2xl italic text-primary">smart.phonics</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-center text-xs font-medium leading-none">Bienvenue !</p>
        <Separator className="bg-accent" />
        <p className="text-center text-xs text-muted-foreground">
          Monte ta luminosité.
          <br /> Monte ton volume.
          <br /> Tape ton pseudo.
          <br /> Et go !
        </p>
      </div>
      <MyFormComponent nopeer={false} />
      {/* {pending && !peer && <AlertDestructive title={"OUPS !"} message={"Echec de la connection au serveur (recharge !)"} />} */}
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </div>
  );
}

const MyFormComponent = ({ nopeer }: { nopeer: boolean }) => {
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const toast_loading = useRef<Id>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, submitaction, pending] = useActionState((_: unknown, formData: FormData) => {
    toast_loading.current = toast.loading("Loading...", { progress: 0.3, className: "rounded-lg bg-primary text-sm" });
    try {
      setInitMessUserStore();
      const name: string = formData.get("username") as string;
      if (name !== "") setUserName(name);
      toast.update(toast_loading.current, { render: "Loading... (...audio tools)", progress: 0.4 });
      if (!audioContext) setUserAudio();
      toast.update(toast_loading.current, { render: "Loading... (...connexion)", progress: 0.9 });
      createPeer();

      toast.update(toast_loading.current, {
        render: "Tout est bon !",
        type: "success",
        isLoading: false,
        progress: 0.99,
        className: "rounded-lg bg-accent text-sm",
      });
      setInstaVidMeta();
      // await peerMediaCall();
      toast.dismiss(toast_loading.current);
      router.push("/user");
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
    <>
      <form action={submitaction} className="flex w-1/2 max-w-sm flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-row items-center space-x-2">
          <Input className="text-xs" ref={inputRef} type="text" name="username" placeholder={"Nouveau pseudo"} />
          <Button disabled={nopeer || pending} type="submit">
            {nopeer || pending ? <Spinner className=" text-primary-foreground" /> : <ArrowRight strokeWidth={2.25} />}
          </Button>
        </div>
      </form>
    </>
  );
};
