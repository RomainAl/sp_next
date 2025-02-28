import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "smart.phonics",
  description: "Disable this behaviour !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} dark overflow-hidden antialiased`}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>HOME</NavigationMenuLink>
              </Link>
              <NavigationMenuTrigger>INSTRUS</NavigationMenuTrigger>
              <NavigationMenuContent>
                <Link href="/user/instru?n=0" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Instru0</NavigationMenuLink>
                </Link>
                <Link href="/user/instru?n=0" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Instru1</NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
              <Link href="/user/facestime" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>FACESTIME</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {children}
      </body>
    </html>
  );
}
