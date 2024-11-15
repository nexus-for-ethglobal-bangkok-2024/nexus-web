"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan", eurusd: 1.10, gbpusd: 1.30 },
  { date: "Feb", eurusd: 1.12, gbpusd: 1.32 },
  { date: "Mar", eurusd: 1.11, gbpusd: 1.31 },
  { date: "Apr", eurusd: 1.13, gbpusd: 1.33 },
  { date: "May", eurusd: 1.14, gbpusd: 1.34 },
  { date: "Jun", eurusd: 1.15, gbpusd: 1.35 },
]

export function ForexChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Forex Rates</CardTitle>
        <CardDescription>EUR/USD and GBP/USD over 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            eurusd: {
              label: "EUR/USD",
              color: "hsl(var(--chart-1))",
            },
            gbpusd: {
              label: "GBP/USD",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis hide={true} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="eurusd" stroke="var(--color-eurusd)" fill="var(--color-eurusd)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="gbpusd" stroke="var(--color-gbpusd)" fill="var(--color-gbpusd)" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}