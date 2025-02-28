import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PhoneIncoming, PhoneOff } from "lucide-react";
import { useState } from "react";
import { LogoSP } from "./logoSP";
import { Button } from "./ui/button";

export function Call({ setCallValidation }: { setCallValidation: (callValidation: boolean) => void }) {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <AlertDialog open={open}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent className="size-fit rounded-full border-4 border-accent">
        <span className="absolute z-0 size-full animate-ping rounded-full bg-primary/20"></span>
        <AlertDialogHeader className="flex items-center justify-center">
          <LogoSP />
          <AlertDialogTitle className="text-primary">Tu as un appel...</AlertDialogTitle>
          <AlertDialogDescription>Réponds pour profiter du tableau suivant !</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="z-10 flex flex-row items-center justify-evenly">
          <Button variant={"secondary"} size={"circle"} onClick={() => setOpen(false)}>
            <PhoneOff />
          </Button>
          <Button
            variant={"default"}
            size={"circle"}
            onClick={() => {
              setCallValidation(true);
              setOpen(false);
            }}
          >
            <PhoneIncoming size={48} />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
