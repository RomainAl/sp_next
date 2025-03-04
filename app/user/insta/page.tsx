"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { InstaAvatar } from "@/components/userAvatar";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

export default function Home() {
  const { height = 0 } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    console.log("GoUseEffect");
    console.log(count);
    console.log(current);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, count, current]);

  useEffect(() => {
    if (ref.current) ref.current.style.height = `${height}px`;
  }, [height]);

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
    <CarouselItem className="border-blue-700 pt-10 md:basis-1/2">
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
            <MessageCircle onClick={() => setCom(!com)} fill={com ? "red" : "none"} strokeWidth={1} size={30} />
          </CardFooter>
          <p className="px-6 pb-6 text-sm italic">#cut #animal #super #glad #lifeisbeautiful</p>
        </Card>
      </div>
    </CarouselItem>
  );
};

const InstaVideo = ({ index }: { index: number }) => {
  const { width = 0 } = useWindowSize();

  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.width = width;
  }, [width]);

  return (
    <div>
      <video ref={ref} autoPlay muted loop preload="none">
        <source src={`/insta/video${index}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
