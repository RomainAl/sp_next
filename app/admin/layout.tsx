import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Slide, ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/admin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>ADMIN</NavigationMenuLink>
            </Link>
            <Link href="/admin/instru" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRUS</NavigationMenuLink>
            </Link>
            <Link href="/admin/insta" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTA</NavigationMenuLink>
            </Link>
            <Link href="/admin/facestime" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>FACESTIME</NavigationMenuLink>
            </Link>
            <Link href="/admin/miditest" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>MIDI</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <main>{children}</main>
      <ToastContainer draggable transition={Slide} position="top-center" theme="dark" className="mt-1 w-full gap-2 px-8" />
    </>
  );
}
