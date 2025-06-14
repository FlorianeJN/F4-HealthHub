"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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
import { fetchEmployeeRevenue } from "@/lib/data";
import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
});

const chartConfig = {
  montant_total: {
    label: "Revenus générés",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function MultipleBarChart() {
  const [data, setData] = useState<{ nom: string; montant_total: number }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stats = await fetchEmployeeRevenue();
        console.log("Employee Revenue Data:", stats);
        setData(stats);
      } catch (error) {
        console.error("Error loading employee revenue:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Revenus par employé</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
        <CardContent className="h-[220px] flex items-center justify-center">
          <div className="text-muted-foreground">Chargement des données...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Revenus par employé</CardTitle>
        <CardDescription>Montants générés</CardDescription>
      </CardHeader>
      <CardContent className="h-[220px]">
        <ChartContainer config={chartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="nom"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => formatter.format(value)}
              />
              <ChartTooltip
                cursor={false}
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
                              {formatter.format(payload[0].value as number)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="montant_total"
                fill="var(--color-desktop)"
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm pt-2">
        <div className="flex gap-2 font-medium leading-none">
          Total:{" "}
          {formatter.format(
            data.reduce((sum, item) => sum + item.montant_total, 0)
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Répartition des revenus par employé
        </div>
      </CardFooter>
    </Card>
  );
}
