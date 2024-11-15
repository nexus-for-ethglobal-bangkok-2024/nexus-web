"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stockData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.80, change: -0.3 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 305.15, change: 1.2 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3380.50, change: -1.5 },
  { symbol: "FB", name: "Meta Platforms Inc.", price: 325.75, change: 0.8 },
]

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: 45000.00, change: 3.2 },
  { symbol: "ETH", name: "Ethereum", price: 3200.50, change: 2.1 },
  { symbol: "ADA", name: "Cardano", price: 2.15, change: -0.5 },
  { symbol: "DOT", name: "Polkadot", price: 35.80, change: 1.8 },
  { symbol: "XRP", name: "Ripple", price: 1.10, change: -1.2 },
]

const forexData = [
  { pair: "EUR/USD", rate: 1.1850, change: 0.05 },
  { pair: "GBP/USD", rate: 1.3750, change: -0.02 },
  { pair: "USD/JPY", rate: 110.20, change: 0.15 },
  { pair: "USD/CHF", rate: 0.9180, change: -0.01 },
  { pair: "AUD/USD", rate: 0.7350, change: 0.03 },
]

export function TabbedAssetTable() {
  const [activeTab, setActiveTab] = useState("stocks")

  const renderTable = (data: any[], type: string) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{type === "forex" ? "Pair" : "Symbol"}</TableHead>
          <TableHead>{type === "forex" ? "Rate" : "Name"}</TableHead>
          <TableHead className="text-right">{type === "forex" ? "Change" : "Price"}</TableHead>
          <TableHead className="text-right">{type === "forex" ? "" : "Change"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.symbol || item.pair}</TableCell>
            <TableCell>{item.name || item.rate}</TableCell>
            <TableCell className="text-right">
              {type === "forex" ? item.change.toFixed(2) : item.price.toFixed(2)}
            </TableCell>
            <TableCell className={`text-right ${item.change > 0 ? "text-green-600" : "text-red-600"}`}>
              {type === "forex" ? "" : `${item.change > 0 ? "+" : ""}${item.change.toFixed(2)}%`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset Overview</CardTitle>
        <CardDescription>View details for stocks, cryptocurrencies, and forex pairs</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
          </TabsList>
          <TabsContent value="stocks">
            {renderTable(stockData, "stocks")}
          </TabsContent>
          <TabsContent value="crypto">
            {renderTable(cryptoData, "crypto")}
          </TabsContent>
          <TabsContent value="forex">
            {renderTable(forexData, "forex")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}