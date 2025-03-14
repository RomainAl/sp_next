"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import { InstaAvatar } from "@/components/userAvatar";
import { cn } from "@/lib/utils";
import { setInstaCurrentVid, useInstaUserStore } from "@/store/insta.user.store";
import { useMessUserStore } from "@/store/mess.user.store";
import { sendMess, useWebrtcUserStore } from "@/store/webrtc.user.store";
import Autoplay from "embla-carousel-autoplay";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useInterval, useWindowSize } from "usehooks-ts";

export default function Home() {
  const { height = 0 } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(Autoplay({ delay: 1712, stopOnInteraction: false, stopOnFocusIn: false }));

  useEffect(() => {
    if (!api) {
      return;
    }
    console.log("TODO : CHECK IF DON'T NEED TO KILL CAROUSSEL API");
    setInstaCurrentVid(0);
    api.on("select", () => {
      setInstaCurrentVid(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (ref.current) ref.current.style.height = `${height}px`;
  }, [height]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Carousel
        plugins={[plugin.current]}
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          dragFree: false,
          startIndex: 0,
        }}
        orientation="vertical"
        className="size-full"
      >
        <CarouselContent ref={ref} className="-mt-1 h-[600px]">
          {Array.from({ length: 2 }).map((_, index) => (
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
  const elonMode = useMessUserStore((store) => store.elonMode);
  const [playON, setPlayON] = useState(false);

  useInterval(
    () => {
      if (ref.current) {
        ref.current.currentTime = 1 + Math.random() * 0.05;
        ref.current.playbackRate = Math.random() + 0.75;
      }
    },
    // Delay in milliseconds or null to stop it
    elonMode === 127 ? 856 : null
  );

  useEffect(() => {
    if (ref.current && elonMode && playON) {
      if (elonMode !== 127) {
        ref.current.currentTime = (elonMode * ref.current.duration + Math.random() * 0.01) / 100;
      }
    }
  }, [elonMode, playON]);

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
        ref.current.play().then(() => {
          setPlayON(true);
        });
      } else {
        if (playON) ref.current.pause();
      }
      if (currentVid === index - 1) {
        ref.current.preload = "auto";
      }
    }
  }, [currentVid, index, playON]);

  return (
    <div className="flex size-full items-center justify-center">
      {pending && <Spinner size="xlarge"></Spinner>}
      <video className={cn("block", { hidden: pending })} ref={ref} playsInline loop preload="none">
        <source src={`/elon/video${index}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
