"use client";
import { Call } from "@/components/call";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useMessUserStore } from "@/store/mess.user.store";
import { useWebrtcUserStore } from "@/store/webrtc.user.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { useShallow } from "zustand/react/shallow";
export default function Layout({ children }: { children: React.ReactNode }) {
  // const peer = useWebrtcUserStore((store) => store.peer);
  const peerData = useWebrtcUserStore((store) => store.peerData);
  const peerMedia = useWebrtcUserStore((store) => store.peerMedia);
  const goto = useMessUserStore((store) => store.goto);
  const getStream = useMessUserStore(useShallow((store) => store.getStream));
  const router = useRouter();
  // try {
  //   useNoSleep(true);
  // } catch (e) {
  //   alert(e);
  // }
  // useEffect(() => {
  //   if (!peer || !peer?.open) router.push("/");
  //   return () => peer?.destroy();
  // }, [peer, router]);
  console.log("RENDER USER LAYOUT !");
  useEffect(() => {
    if (goto) router.push("/user/" + goto);
  }, [goto, router]);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    // peer?.destroy();
                    peerData?.close();
                    peerMedia?.close();
                    // router.push("/");
                  }}
                >
                  HOME
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>INSTRUS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/user/instru?n=0" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 0</NavigationMenuLink>
              </Link>
              <Link href="/user/instru?n=1" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 1</NavigationMenuLink>
              </Link>
              <Link href="/user/instru?n=2" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 2</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/user/facestime" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>FACESTIME</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/user/insta" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTA</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/user/flashes" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>FLASHES</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/user/hacker" legacyBehavior passHref prefetch={true}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>HACKER</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/user/larsen" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>LARSEN</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/user/nikedal" legacyBehavior passHref prefetch={true}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>NIKEDAL</NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      {getStream && getStream.call && <Call />}
      <main>{children}</main>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </>
  );
}
