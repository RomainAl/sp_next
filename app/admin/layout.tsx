"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { setCurrentPage } from "@/store/mess.admin.store";
import { useToastStore } from "@/store/shared.store";
import { sendMess } from "@/store/webrtc.admin.store";
import { MIDIVal, MIDIValInput } from "@midival/core";
import Link from "next/link";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  const connectMidi = () => {
    MIDIVal.connect().then((access) => {
      console.log(access);
      console.log("Input Devices", access.inputs);
      console.log("Output Devices", access.outputs);
      if (!access.inputs) {
        console.warn("No inputs yet");
        return;
      }
      const accessSel = access.inputs.find((i) => i.name === "Réseau AL");
      if (accessSel) {
        const input = new MIDIValInput(accessSel);
        input.onAllNoteOn((message) => {
          if (message.channel === 11 && message.velocity > 0) {
            switch (message.note) {
              case 60:
                sendMess({ flashes_trig: Date.now() });
                break;
              case 80:
                const page: string = "hacker";
                setCurrentPage(page);
                break;
              case 40:
                sendMess({ elonMode: message.velocity });
                break;
            }
            console.log(`[Note On] Note: ${message.note} Velocity: ${message.velocity} Channel: ${message.channel}`);
          }
        });
      }
    });
  };
  const myToast = useToastStore((store) => store);
  if (myToast.title)
    toast(myToast.title, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      theme: "dark",
      className: "rounded-lg bg-accent text-sm text-primary",
    });
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/admin" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>ADMIN</NavigationMenuLink>
            </Link>
            <NavigationMenuTrigger>INSTRUS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/admin/instru" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Button
                    onClick={() => {
                      const page: string = "instru?n=0";
                      setCurrentPage(page);
                    }}
                  >
                    INSTRU 0
                  </Button>
                </NavigationMenuLink>
              </Link>
              <Link href="/admin/instru" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Button
                    onClick={() => {
                      const page: string = "instru?n=1";
                      setCurrentPage(page);
                    }}
                  >
                    INSTRU 1
                  </Button>
                </NavigationMenuLink>
              </Link>
              <Link href="/admin/instru" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Button
                    onClick={() => {
                      const page: string = "instru?n=2";
                      setCurrentPage(page);
                    }}
                  >
                    INSTRU 2
                  </Button>
                </NavigationMenuLink>
              </Link>
              <Link href="/admin/instru" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Button
                    onClick={() => {
                      const page: string = "instru?n=3";
                      setCurrentPage(page);
                    }}
                  >
                    INSTRU 3
                  </Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
            <NavigationMenuTrigger>INSTAS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/admin/insta" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Button
                    onClick={() => {
                      const page: string = "insta?n=0";
                      setCurrentPage(page);
                    }}
                  >
                    INSTA 0
                  </Button>
                </NavigationMenuLink>
              </Link>
              <Link href="/admin/insta" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Button
                    onClick={() => {
                      const page: string = "insta?n=1";
                      setCurrentPage(page);
                    }}
                  >
                    INSTA 1
                  </Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
            <Link href="/admin/elon" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "elon";
                    setCurrentPage(page);
                  }}
                >
                  ELON
                </Button>
              </NavigationMenuLink>
            </Link>
            <Link href="/admin/facestime" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "facestime";
                    setCurrentPage(page);
                  }}
                >
                  FACESTIME
                </Button>
              </NavigationMenuLink>
            </Link>
            <Link href="/admin/hacker" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "hacker";
                    setCurrentPage(page);
                  }}
                >
                  HACKER
                </Button>
              </NavigationMenuLink>
            </Link>
            <Link href="/admin/flashes" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "flashes";
                    setCurrentPage(page);
                  }}
                >
                  FLASHES
                </Button>
              </NavigationMenuLink>
            </Link>
            <Link href="/admin/larsen" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "larsen";
                    setCurrentPage(page);
                  }}
                >
                  LARSEN
                </Button>
              </NavigationMenuLink>
            </Link>
            <Link href="/admin/nikedal" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "nikedal";
                    setCurrentPage(page);
                  }}
                >
                  NIKEDAL
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button onClick={() => connectMidi()}>MIDI</Button>
      <main>{children}</main>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 gap-1" />
    </>
  );
}
