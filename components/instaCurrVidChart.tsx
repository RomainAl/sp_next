"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useInstaAdminStore } from "@/store/insta.admin.store";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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

export function InstaCurrVidChart() {
  const { videoViews } = useInstaAdminStore();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Card className="size-full">
        <CardHeader className="items-center pb-4">
          <CardTitle>
            {`Nombre de vues vidéos : ${videoViews.map((v) => v.views).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[450px]">
            <RadarChart data={videoViews}>
              <PolarGrid className="fill-[--color-desktop] opacity-10" gridType="circle" />
              <PolarAngleAxis
                tick={false}
                hide={true}
                axisLine={true}
                dataKey="id"
                domain={[0, videoViews.map((m) => m.views).reduce((a, b) => Math.max(a, b), -Infinity)]}
              />
              <Radar
                dataKey="views"
                fill="var(--color-desktop)"
                fillOpacity={0.5}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
