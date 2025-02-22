"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-2">
      <Spinner size="xlarge">ERROR</Spinner>
      <Button onClick={() => reset()}>Try again</Button>
      <Link href="/">BACK</Link>
    </div>
  );
}
