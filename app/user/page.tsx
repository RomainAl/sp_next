import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-2">
      <Spinner size="xlarge" />
    </div>
  );
}
