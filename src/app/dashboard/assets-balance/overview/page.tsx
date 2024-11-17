"use client"

import { useState } from "react"
import { ArrowDownIcon, ArrowUpIcon, SearchIcon, WalletIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts
const generateChartData = (length: number, initialValue: number) => {
  return Array.from({ length }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: initialValue + Math.random() * 10 - 5,
  }))
}

const stockData = generateChartData(30, 100)
const cryptoData = generateChartData(30, 50000)
const forexData = generateChartData(30, 1.2)

export default function AssetsOverviewPage () {
  const [activeTab, setActiveTab] = useState("stocks")

  return (
    <div className="container-fluid mx-auto p-4 space-y-6 max-w-[2000px]">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <WalletIcon className="w-8 h-8" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Your Asset Wallet</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Total Value:</span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold">$127,350.00</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 flex items-center">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              2.5%
            </span>
          </div>
        </div>
      </header>

      <div className="relative w-full max-w-md mx-auto">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input className="pl-10 w-full" placeholder="Search for assets in your wallet..." />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="forex">Forex</TabsTrigger>
        </TabsList>
        <TabsContent value="stocks">
          <StockSection />
        </TabsContent>
        <TabsContent value="crypto">
          <CryptoSection />
        </TabsContent>
        <TabsContent value="forex">
          <ForexSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StockSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Your Stock Portfolio Performance</CardTitle>
          <CardDescription>30-day performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Portfolio Value", color: "hsl(var(--chart-1))" } }} className="h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <AssetCard
        title="AAPL"
        description="Apple Inc."
        price={150.25}
        change={2.5}
        shares={10}
        value={1502.50}
        amount="20"
      />
      <AssetCard
        title="MSFT"
        description="Microsoft Corporation"
        price={280.75}
        change={1.8}
        shares={5}
        value={1403.75}
        amount="30"
      />
      <AssetCard
        title="GOOGL"
        description="Alphabet Inc."
        price={2750.00}
        change={1.2}
        shares={2}
        value={5500.00}
        amount="26"
      />
      <AssetCard
        title="AMZN"
        description="Amazon.com Inc."
        price={3300.00}
        change={-0.5}
        shares={1}
        value={3300.00}
        amount="28"
      />
      <AssetCard
        title="TSLA"
        description="Tesla Inc."
        price={650.00}
        change={3.1}
        shares={4}
        value={2600.00}
        amount="22"
      />
      


    </div>
  )
}

function CryptoSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Your Crypto Portfolio Performance</CardTitle>
          <CardDescription>30-day performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Portfolio Value", color: "hsl(var(--chart-2))" } }} className="h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cryptoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <AssetCard
        title="BTC"
        description="Bitcoin"
        price={45250.00}
        change={-1.2}
        amount="0.5 BTC"
        value={22625.00}
        shares="22"
      />
      <AssetCard
        title="ETH"
        description="Ethereum"
        price={3150.00}
        change={0.8}
        amount="2 ETH"
        value={6300.00}
        shares="22"
      />
      <AssetCard
        title="ADA"
        description="Cardano"
        price={1.25}
        change={2.1}
        amount="1000 ADA"
        value={1250.00}
        shares="22"
      />
      <AssetCard
        title="DOT"
        description="Polkadot"
        price={20.50}
        change={-0.5}
        amount="100 DOT"
        value={2050.00}
        shares="22"
      />
      <AssetCard
        title="XRP"
        description="Ripple"
        price={0.75}
        change={1.5}
        amount="5000 XRP"
        value={3750.00}
        shares="22"
      />
    </div>
  )
}

function ForexSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Your Forex Portfolio Performance</CardTitle>
          <CardDescription>30-day performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Portfolio Value", color: "hsl(var(--chart-3))" } }} className="h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forexData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <AssetCard
        title="EUR/USD"
        description="Euro to US Dollar"
        price={1.2150}
        change={0.3}
        amount="10,000 EUR"
        value={12150.00}
        shares="22"
      />
      <AssetCard
        title="GBP/USD"
        description="British Pound to US Dollar"
        price={1.3850}
        change={0.1}
        amount="5,000 GBP"
        value={6925.00}
        shares="22"
      />
      <AssetCard
        title="USD/JPY"
        description="US Dollar to Japanese Yen"
        price={110.25}
        change={-0.2}
        amount="500,000 JPY"
        value={4535.15}
        shares="22"
      />
      <AssetCard
        title="AUD/USD"
        description="Australian Dollar to US Dollar"
        price={0.7650}
        change={0.5}
        amount="10,000 AUD"
        value={7650.00}
        shares="22"
      />
      <AssetCard
        title="USD/CAD"
        description="US Dollar to Canadian Dollar"
        price={1.2450}
        change={-0.1}
        amount="10,000 USD"
        value={12450.00}
        shares="22"
      />
    </div>
  )
}

function AssetCard({ title, description, price, change, shares, amount, value }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${price.toFixed(2)}</div>
        <div className="flex items-center mt-2">
          {change >= 0 ? (
            <ArrowUpIcon className="w-4 h-4 mr-1 text-green-500" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1 text-red-500" />
          )}
          <span className={change >= 0 ? "text-green-500" : "text-red-500"}>
            {change}%
          </span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <span>{shares ? "Shares:" : "Amount:"}</span>
            <span>{shares || amount}</span>
          </div>
          <div className="flex justify-between">
            <span>Value:</span>
            <span>${value.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}