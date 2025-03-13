"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import { InstaAvatar } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { useAudioUserStore } from "@/store/audio.user.store";
import { setInstaCurrentVid, useInstaUserStore } from "@/store/insta.user.store";
import { peerSound2peerMedia, sendMess, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { Heart, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const vidNb = useInstaUserStore((store) => store.vidNb);
  const { height = 0 } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const startVid = useInstaUserStore((store) => store.startVid);

  useEffect(() => {
    if (!api) {
      return;
    }
    console.log("TODO : CHECK IF DON'T NEED TO KILL CAROUSSEL API");
    sendMess({ currentInstaVid: api.selectedScrollSnap() });
    setInstaCurrentVid(startVid);
    api.on("select", () => {
      console.log(api.selectedScrollSnap());
      sendMess({ currentInstaVid: api.selectedScrollSnap() });
      setInstaCurrentVid(api.selectedScrollSnap());
    });
  }, [api, startVid]);

  useEffect(() => {
    if (ref.current) ref.current.style.height = `${height}px`;
  }, [height]);

  useEffect(() => {
    audioContext?.resume();
    return () => {
      audioContext?.suspend();
    };
  }, [audioContext]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
          startIndex: startVid,
        }}
        orientation="vertical"
        className="size-full"
      >
        <CarouselContent ref={ref} className="-mt-1 h-[600px]">
          {Array.from({ length: vidNb }).map((_, index) => (
            <Insta key={index} index={index} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

const Insta = ({ index }: { index: number }) => {
  const [like, setLike] = useState<boolean>(false);
  const [com, setCom] = useState<boolean>(false);
  const username = useWebrtcUserStore((store) => store.username);
  const setSendLike = () => {
    setLike(!like);
    sendMess({ toast: { title: `❤️ ${username} aime la vidéo de TOTO` } });
  };
  return (
    <CarouselItem className=" border-blue-700 pt-10 md:basis-1/2 ">
      <div>
        <Card>
          <CardHeader className="mx-6 p-6">
            <CardTitle className="flex flex-row items-center justify-start gap-5">
              <InstaAvatar name={"TOTO"} />
              <p>{"TOTO"}</p>
            </CardTitle>
            <CardDescription>{"TOTO"}</CardDescription>
            <p>{"TOTO"}</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <InstaVideo index={index} />
          </CardContent>
          <CardFooter className="gap-5">
            <Heart size={30} onClick={() => setSendLike()} fill={like ? "red" : "none"} strokeWidth={like ? 0 : 1} />
            <MessageCircle onClick={() => setCom(!com)} strokeWidth={1} size={30} />
          </CardFooter>
          <p className="px-6 pb-6 text-sm italic">{"TOTO"}</p>
        </Card>
      </div>
    </CarouselItem>
  );
};

const InstaVideo = ({ index }: { index: number }) => {
  const { width = 0 } = useWindowSize();
  const currentVid = useInstaUserStore((store) => store.currentVid);
  const ref = useRef<HTMLVideoElement>(null);
  const [pending, setPending] = useState<boolean>(true);
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const peerSound = useAudioUserStore((store) => store.peerSound);
  const soundRef = useRef<MediaElementAudioSourceNode>(null);
  const searchParams = useSearchParams();
  const instaNb: number = searchParams.has("n") ? Number(searchParams.get("n")) : 0;

  useEffect(() => {
    if (ref.current) ref.current.width = width;
  }, [width]);

  if (ref.current)
    ref.current.onloadeddata = () => {
      setPending(false);
    };

  useEffect(() => {
    if (ref.current) {
      if (currentVid === index) {
        ref.current.play();

        if (audioContext && peerSound) {
          if (!soundRef.current) soundRef.current = audioContext.createMediaElementSource(ref.current);
          soundRef.current.connect(peerSound);
          soundRef.current.connect(audioContext.destination);
          peerSound2peerMedia();
        }
      } else {
        ref.current.pause();
        soundRef.current?.disconnect();
      }
      if (currentVid === index - 1) {
        // ref.current.preload = "auto";
        ref.current.play().then(() => {
          if (ref.current) ref.current.pause();
        });
      }
    }

    return () => {
      soundRef.current?.disconnect();
    };
  }, [currentVid, index, audioContext, peerSound]);

  return (
    <div className="flex size-full items-center justify-center">
      {pending && <Spinner size="xlarge"></Spinner>}
      <video
        onClick={() => {
          ref.current?.play();
        }}
        className={cn("block", { hidden: pending })}
        ref={ref}
        playsInline
        loop
        preload="none"
      >
        <source src={`/insta${instaNb}/video${index}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
