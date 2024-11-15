"use client"


import { useState, useEffect } from 'react';
import { getUserAssets } from '@/lib/actions/user/crypto-actions';
import { userId } from '@/lib/constants';

import { ArrowDownIcon, ArrowUpIcon, SearchIcon, WalletIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


// Define interfaces for the API response
interface Stock {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  quantity: string;
}

interface ApiResponse {
  stocks: Stock[];
  forex: any[];
  crypto: any[];
}

// Mock data for charts
const generateChartData = (length: number, initialValue: number) => {
  return Array.from({ length }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: initialValue + Math.random() * 10 - 5,
  }))
}

const cryptoData = generateChartData(30, 50000)

export default function  AssetsOverviewCryptoPage (){
  const [searchTerm, setSearchTerm] = useState("")


  const [assets, setAssets] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const data = await getUserAssets(userId);
        setAssets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [userId]);

  if (loading) return <div>Loading assets...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!assets) return <div>No assets found</div>;


  return (
    <div className="container-fluid mx-auto p-4 space-y-6 max-w-[2000px]">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <WalletIcon className="w-8 h-8" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Your Crypto Portfolio</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Total Value:</span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold">$135,925.00</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-500 flex items-center">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              2.1%
            </span>
          </div>
        </div>
      </header>

      <div className="relative w-full max-w-md mx-auto">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          className="pl-10 w-full" 
          placeholder="Search for cryptocurrencies..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      
      

      {assets.crypto.map((stock) => (
          <AssetCard
            key={stock.id}
            symbol={stock.symbol}
            name={stock.name}
            exchange={stock.blockchain}
            quantity={stock.quantity}
          />
        ))}
      

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
      </div>
    </div>
  )
}

interface AssetCardProps {
  symbol: string;
  name: string;
  exchange: string;
  quantity: string;
}

function AssetCard({ symbol, name, exchange, quantity }: AssetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{symbol}</CardTitle>
        <CardDescription>{name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Chain:</span>
            <span>{exchange}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Quantity:</span>
            <span>{quantity}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}