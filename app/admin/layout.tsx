import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
            <NavigationMenuTrigger>INSTRUS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/admin/instru" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 0</NavigationMenuLink>
              </Link>
              <Link href="/admin/instru" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>INSTRU 1</NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
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
