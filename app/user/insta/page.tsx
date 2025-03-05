"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import { InstaAvatar } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { useAudioUserStore } from "@/store/audio.user.store";
import { setInstaCurrentVid, useInstaUserStore } from "@/store/insta.user.store";
import { peerSound2peerMedia, sendMess } from "@/store/webrtc.user.store";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const { height = 0 } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const audioContext = useAudioUserStore((store) => store.audioContext);
  useEffect(() => {
    if (!api) {
      return;
    }
    console.log("TODO : CHECK IF DON'T NEED TO KILL CAROUSSEL API");

    api.on("select", () => {
      sendMess({ currentInstaVid: api.selectedScrollSnap() });
      setInstaCurrentVid(api.selectedScrollSnap());
    });
  }, [api]);

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
          align: "center",
          loop: true,
          dragFree: true,
        }}
        orientation="vertical"
        className="size-full"
      >
        <CarouselContent ref={ref} className="-mt-1 h-[600px]">
          {Array.from({ length: 5 }).map((_, index) => (
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

  return (
    <CarouselItem className=" border-blue-700 pt-10 md:basis-1/2 ">
      <div>
        <Card>
          <CardHeader className="mx-6 p-6">
            <CardTitle className="flex flex-row items-center justify-start gap-5">
              <InstaAvatar name={String(index)} />
              <p>Cut aninals</p>
            </CardTitle>
            <CardDescription>👍🔥 OHHHH toooo mimiiiiiii !! 😍 ❤️🫶🫡</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <InstaVideo index={index} />
          </CardContent>
          <CardFooter className="gap-5">
            <Heart size={30} onClick={() => setLike(!like)} fill={like ? "red" : "none"} strokeWidth={like ? 0 : 1} />
            <MessageCircle onClick={() => setCom(!com)} strokeWidth={1} size={30} />
          </CardFooter>
          <p className="px-6 pb-6 text-sm italic">#cut #animal #super #glad #lifeisbeautiful</p>
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
        ref.current.preload = "auto";
      }
    }

    return () => {
      soundRef.current?.disconnect();
    };
  }, [currentVid, index, audioContext, peerSound]);

  return (
    <div className="flex size-full items-center justify-center">
      {pending && <Spinner size="xlarge"></Spinner>}
      <video className={cn("block", { hidden: pending })} ref={ref} loop preload="none">
        <source src={`/insta/video${index}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
