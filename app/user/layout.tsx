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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { useShallow } from "zustand/react/shallow";

export default function Layout({ children }: { children: React.ReactNode }) {
  const goto = useMessUserStore((store) => store.goto);
  const getStream = useMessUserStore(useShallow((store) => store.getStream));
  const router = useRouter();

  useEffect(() => {
    if (goto) router.push("/user/" + goto);
  }, [goto, router]);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>HOME</NavigationMenuLink>
            </Link>
            <NavigationMenuTrigger>INSTRUS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/user/instru?n=0" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 0</NavigationMenuLink>
              </Link>
              <Link href="/user/instru?n=1" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 1</NavigationMenuLink>
              </Link>
              <Link href="/user/instru?n=2" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 1</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
            <Link href="/user/facestime" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>FACESTIME</NavigationMenuLink>
            </Link>
            <Link href="/user/insta" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTA</NavigationMenuLink>
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
