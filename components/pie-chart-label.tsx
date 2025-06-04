"use client";

import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { fetchEmployeeShifts } from "@/lib/data";
import { useEffect, useState } from "react";

const chartConfig = {
  count: {
    label: "Nombre de quarts",
  },
} satisfies ChartConfig;

export function PieChartLabel() {
  const [data, setData] = useState<{ nom: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await fetchEmployeeShifts();
        console.log("Employee Shifts Data:", stats);
        setData(stats);
      } catch (error) {
        console.error("Error loading employee shifts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-2">
          <CardTitle>Quarts par employé</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center">
          <div className="text-muted-foreground">Chargement des données...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-2">
        <CardTitle>Quarts par employé</CardTitle>
        <CardDescription>Répartition des quarts</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="h-[220px] [&_.recharts-text]:fill-background"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].payload.nom}
                            </span>
                            <span className="font-bold">
                              {payload[0].value} quarts
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={data}
                dataKey="count"
                nameKey="nom"
                cx="50%"
                cy="50%"
                outerRadius={70}
              >
                <LabelList
                  dataKey="nom"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-1 text-sm pt-2">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total: {data.reduce((sum, item) => sum + item.count, 0)} quarts
        </div>
        <div className="leading-none text-muted-foreground">
          Répartition des quarts par employé
        </div>
      </CardFooter>
    </Card>
  );
}

export default PieChartLabel;
