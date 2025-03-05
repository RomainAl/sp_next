"use client";

import { LogoSP } from "@/components/logoSP";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useMessAdminStore } from "@/store/mess.admin.store";
import { createPeer, useWebrtcAdminStore } from "@/store/webrtc.admin.store";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function Home() {
  const peer = useWebrtcAdminStore((store) => store.peer);
  const goto = useMessAdminStore((store) => store.goto);
  const router = useRouter();
  if (!peer) createPeer();
  const [message, submitaction, pending] = useActionState(async (_: unknown, formData: FormData) => {
    try {
      const password: string = formData.get("password") as string;
      if (password !== "") return "error";
      router.push(`/admin/${goto}`);
      return "success";
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
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
        <p className="text-2xl italic text-primary">admin page</p>
      </div>

      <form action={submitaction} className="flex w-2/4 max-w-sm flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-row items-center space-x-2">
          <Input type="text" name="password" placeholder={"Password"} />
          <Button disabled={pending} type="submit">
            {pending ? <Spinner className="text-primary-foreground" /> : <ArrowRight strokeWidth={2.25} />}
          </Button>
        </div>
      </form>
    </div>
  );
}
