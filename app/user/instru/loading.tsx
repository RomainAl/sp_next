import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-2">
      <Spinner size="xlarge">LOADING</Spinner>
      <Link href="/">BACK</Link>
    </div>
  );
}
