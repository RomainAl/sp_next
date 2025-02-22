import Link from "next/link";
import { Button } from "./ui/button";

export function UserPagination() {
  return (
    <div>
      <div className="flex flex-row gap-4">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/user/instru?n=0">Instru0</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/user/instru?n=1">Instru1</Link>
        </Button>
      </div>
    </div>
  );
}
