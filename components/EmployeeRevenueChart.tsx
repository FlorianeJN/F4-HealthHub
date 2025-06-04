"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

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

interface EmployeeRevenueChartProps {
  data: { nom: string; montant_total: number }[];
}

export default function EmployeeRevenueChart({
  data,
}: EmployeeRevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenus par Employé</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
                fill="var(--color-primary)"
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
