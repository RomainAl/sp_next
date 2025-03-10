"use client";
import { Call } from "@/components/call";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
  const peer = useWebrtcUserStore((store) => store.peer);
  const goto = useMessUserStore((store) => store.goto);
  const getStream = useMessUserStore(useShallow((store) => store.getStream));
  const router = useRouter();
  useEffect(() => {
    // if (!peer) router.push("/");
    if (goto) router.push("/user/" + goto);
  }, [goto, router, peer]);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>HOME</NavigationMenuLink>
            </Link>
            <NavigationMenuTrigger>INSTRUS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/user/instru?n=0" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 0</NavigationMenuLink>
              </Link>
              <Link href="/user/instru?n=1" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 1</NavigationMenuLink>
              </Link>
              <Link href="/user/instru?n=2" legacyBehavior passHref prefetch={false}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 1</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
            <Link href="/user/facestime" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>FACESTIME</NavigationMenuLink>
            </Link>
            <Link href="/user/insta" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTA</NavigationMenuLink>
            </Link>
            <Link href="/user/flashes" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>FLASHES</NavigationMenuLink>
            </Link>
            <Link href="/user/hacker" legacyBehavior passHref prefetch={true}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>HACKER</NavigationMenuLink>
            </Link>
            <Link href="/user/test" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>TEST</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {getStream && getStream.call && <Call />}
      <main>{children}</main>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </>
  );
}
