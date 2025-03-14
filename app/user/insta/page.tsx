"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import { InstaAvatar } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { useAudioUserStore } from "@/store/audio.user.store";
import { setInstaCurrentVid, startVid, useInstaUserStore, vidNb } from "@/store/insta.user.store";
import { peerSound2peerMedia, sendMess, useWebrtcUserStore } from "@/store/webrtc.user.store";
import { Heart, MessageCircle, Play } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const { height = 0 } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const [playVid, setPlayVid] = useState(false);

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
    api.on("pointerDown", () => {
      setPlayVid(true);
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
            <Insta key={index} index={index} playVid={playVid} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

const Insta = ({ index, playVid }: { index: number; playVid: boolean }) => {
  const [like, setLike] = useState<boolean>(false);
  const [com, setCom] = useState<boolean>(false);
  const username = useWebrtcUserStore((store) => store.username);
  const setSendLike = () => {
    setLike(!like);
    sendMess({ toast: { title: `❤️ ${username} aime la vidéo de CutenessOverdose` } });
  };
  return (
    <CarouselItem className=" border-blue-700 pt-10 md:basis-1/2 ">
      <div>
        <Card>
          <CardHeader className="mx-6 p-6">
            <CardTitle className="flex flex-row items-center justify-start gap-5">
              <InstaAvatar name={"CutenessOverdose"} />
              <p>{"CutenessOverdose"}</p>
            </CardTitle>
            <CardDescription>{"Découverte de la nature"}</CardDescription>
            <p>{"Un moment de tendresse et de complicité entre amis, l'amitié à son plus haut niveau."}</p>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <InstaVideo index={index} playVid={playVid} />
          </CardContent>
          <CardFooter className="gap-5">
            <Heart size={30} onClick={() => setSendLike()} fill={like ? "red" : "none"} strokeWidth={like ? 0 : 1} />
            <MessageCircle onClick={() => setCom(!com)} strokeWidth={1} size={30} />
          </CardFooter>
          <p className="px-6 pb-6 text-sm italic">{"#CâlinsInfinisEtChaleureux #MomentsDePlaisirEtDeFolie #CâlinsInfinis #PlaisirPartagé"}</p>
        </Card>
      </div>
    </CarouselItem>
  );
};

const InstaVideo = ({ index, playVid }: { index: number; playVid: boolean }) => {
  const { width = 0 } = useWindowSize();
  const currentVid = useInstaUserStore((store) => store.currentVid);
  const ref = useRef<HTMLVideoElement>(null);
  const [pending, setPending] = useState<boolean>(true);
  const audioContext = useAudioUserStore((store) => store.audioContext);
  const peerSound = useAudioUserStore((store) => store.peerSound);
  const soundRef = useRef<MediaElementAudioSourceNode>(null);
  const searchParams = useSearchParams();
  const instaNb: number = searchParams.has("n") ? Number(searchParams.get("n")) : 0;
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.width = width;
  }, [width]);

  if (ref.current)
    ref.current.onloadeddata = () => {
      setPending(false);
    };

  // if (ref.current && playVid)
  //   ref.current.play().then(() => {
  //     if (currentVid !== index) {
  //       ref.current?.pause();
  //     } else {
  //       setIsPlaying(true);
  //     }
  //   });
  console.log("TODO : FUCKIG IPHONE : playVid : ", playVid);

  useEffect(() => {
    if (ref.current) {
      if (currentVid === index) {
        ref.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("papossible"));
        // ref.current.muted = false;
        if (audioContext && peerSound) {
          if (!soundRef.current) soundRef.current = audioContext.createMediaElementSource(ref.current);
          soundRef.current.connect(peerSound);
          soundRef.current.connect(audioContext.destination);
          peerSound2peerMedia();
        }
      } else {
        if (!ref.current.paused) ref.current.pause();
        soundRef.current?.disconnect();
      }
      if (currentVid === (index - 1) % vidNb || currentVid === (index + 1) % vidNb) {
        ref.current.preload = "auto";
        // ref.current.play().then(() => {
        //   if (ref.current) ref.current.pause();
        // });
      }
    }

    return () => {
      soundRef.current?.disconnect();
    };
  }, [currentVid, index, audioContext, peerSound]);

  return (
    <div className="relative flex size-full items-center justify-center rounded-lg">
      {pending && <Spinner size="xlarge"></Spinner>}
      {!isPlaying && (
        <div
          onClick={() => {
            if (ref.current) {
              ref.current.play().then(() => setIsPlaying(true));
              ref.current.currentTime = 0;
              ref.current.muted = false;
            }
          }}
          className="absolute top-0 flex size-full items-center justify-center bg-black/80"
        >
          <Play size={60} fill="orange">
            Play
          </Play>
        </div>
      )}
      <video
        onClick={() => {
          if (ref.current) {
            ref.current.play().then(() => setIsPlaying(true));
            ref.current.currentTime = 0;
            ref.current.muted = false;
          }
        }}
        className={cn("block", { hidden: pending })}
        ref={ref}
        playsInline
        loop
        preload="none"
      >
        <source src={`/insta${instaNb}/video${index}_1.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
