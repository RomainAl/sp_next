"use client";

import { AlertDestructive } from "@/components/alertDestructive";
import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-evenly">
      <ServerCrash className="size-60 text-destructive" strokeWidth={1} />
      <div className="w-2/3">
        <AlertDestructive title="Error messsage :" message={error.message} />
      </div>
      <Button variant="destructive" asChild>
        <Link href="/">BACK HOME</Link>
      </Button>
    </div>
  );
}
