"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Spinner size="xlarge">USER PAGE</Spinner>
      <Button asChild variant={"outline"}>
        <Link href="/">BACK HOME</Link>
      </Button>
    </div>
  );
}
