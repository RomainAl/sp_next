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
import Link from "next/link";
import { Slide, toast, ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
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
                      sendMess({ goto: page });
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
                      sendMess({ goto: page });
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
                      sendMess({ goto: page });
                    }}
                  >
                    INSTRU 2
                  </Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
            <Link href="/admin/insta" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "insta?n=0";
                    setCurrentPage(page);
                    sendMess({ goto: page });
                  }}
                >
                  INSTA
                </Button>
              </NavigationMenuLink>
            </Link>
            <Link href="/admin/facestime" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                <Button
                  onClick={() => {
                    const page: string = "facestime";
                    setCurrentPage(page);
                    sendMess({ goto: page });
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
                    sendMess({ goto: page });
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
                    sendMess({ goto: page });
                  }}
                >
                  FLASHES
                </Button>
              </NavigationMenuLink>
            </Link>
            <Link href="/admin/miditest" legacyBehavior passHref prefetch={false}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>TEST</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <main>{children}</main>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 gap-1" />
    </>
  );
}
