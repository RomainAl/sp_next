import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Spinner size="xlarge">LOADING</Spinner>
      <Link href="/">BACK HOME</Link>
    </div>
  );
}
