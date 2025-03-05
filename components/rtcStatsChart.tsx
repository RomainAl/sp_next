"use client";

import { setBitrates, useWebrtcAdminStore, webrtcBiterateType } from "@/store/webrtc.admin.store";

import { Bar, BarChart, CartesianGrid, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RtcStatsChart() {
  const userS = useWebrtcAdminStore((store) => store.userS);
  const bitrates = useWebrtcAdminStore((store) => store.bitrates);
  const [BG, setBG] = useState(0);
  // const [previewsStat, setPreviewsStat] = useState<number[]>([0, 0, 0, 0]);
  // const { usersid } = useWebrtcAdminStore((s) => ({ usersid: s.userS.map((u) => u.id) })); // TODO CHECK WHY AND HOW
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (bitrates.length > 0) {
          setBG(0);
          bitrates.forEach((b) => {
            userS
              .find((u) => u.id === b.id)
              ?.peerMedia?.peerConnection.getStats(null)
              .then((res) => {
                const statsU = dumpStats(res, b);
                setBG((BG) => BG + statsU.bitrate);
                setBitrates(statsU);
                // for (let i = 0; i < BitrateG.length; i++) {
                //   BitrateG += statsU.bitrate;
                // }
              });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [userS, bitrates]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <p>{`Débit total : ${BG} kbit/s`}</p>
      <Separator className="w-1/2 bg-accent" />
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={bitrates}>
          <CartesianGrid vertical={false} />
          <YAxis tickLine={false} axisLine={false} domain={[0, 50]} />
          <Bar dataKey="bitrate" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function dumpStats(results: RTCStatsReport, statsPrev: webrtcBiterateType) {
  const stats: webrtcBiterateType = {
    id: statsPrev.id,
    bitrate: 0,
    bit: 0,
    time: Date.now(),
  };

  results.forEach((res) => {
    if (res.type === "inbound-rtp" && res.mediaType === "audio") {
      stats.bitrate = Math.floor((8 * (res.bytesReceived - statsPrev.bit)) / (stats.time - statsPrev.time));
      stats.bit = res.bytesReceived;
    }
    // } else if (res.type === "inbound-rtp" && res.mediaType === "video") {
    //   stats.bitrate[1] = Math.floor((8 * (res.bytesReceived - statsPrev.bit[1])) / (stats.time - statsPrev.time));
    //   stats.bit[1] = res.bytesReceived;
    // } else if (res.type === "outbound-rtp" && res.mediaType === "audio") {
    //   stats.bitrate[2] = Math.floor((8 * (res.bytesReceived - statsPrev.bit[2])) / (stats.time - statsPrev.time));
    //   stats.bit[2] = res.bytesReceived;
    // } else if (res.type === "outbound-rtp" && res.mediaType === "video") {
    //   stats.bitrate[3] = Math.floor((8 * (res.bytesReceived - statsPrev.bit[3])) / (stats.time - statsPrev.time));
    //   stats.bit[3] = res.bytesReceived;
    // }
  });

  return stats;
}
