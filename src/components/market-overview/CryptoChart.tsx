"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan", bitcoin: 30000, ethereum: 2000 },
  { date: "Feb", bitcoin: 35000, ethereum: 2200 },
  { date: "Mar", bitcoin: 40000, ethereum: 2500 },
  { date: "Apr", bitcoin: 38000, ethereum: 2300 },
  { date: "May", bitcoin: 42000, ethereum: 2700 },
  { date: "Jun", bitcoin: 45000, ethereum: 3000 },
]

export function CryptoChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crypto Prices</CardTitle>
        <CardDescription>BTC and ETH over 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            bitcoin: {
              label: "Bitcoin",
              color: "hsl(var(--chart-1))",
            },
            ethereum: {
              label: "Ethereum",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis hide={true} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="bitcoin" fill="var(--color-bitcoin)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ethereum" fill="var(--color-ethereum)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}