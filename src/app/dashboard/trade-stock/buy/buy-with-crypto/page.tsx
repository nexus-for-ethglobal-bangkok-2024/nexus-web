"use client"

import { useState } from "react"
import { ArrowDown, ArrowUpDown, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Placeholder data for chains, cryptocurrencies, and stocks
const chains = ["Ethereum", "Binance Smart Chain", "Polygon", "Avalanche", "Solana"]
const cryptocurrencies = {
  "Ethereum": ["ETH", "USDT", "USDC", "DAI", "LINK"],
  "Binance Smart Chain": ["BNB", "BUSD", "CAKE", "XVS", "BAKE"],
  "Polygon": ["MATIC", "QUICK", "AAVE", "SUSHI", "GHST"],
  "Avalanche": ["AVAX", "JOE", "PNG", "QI", "SNOB"],
  "Solana": ["SOL", "RAY", "SRM", "STEP", "COPE"]
}
const stocks = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"]

export default function StockBuyWithCrypto() {
    const [fromChain, setFromChain] = useState(chains[0])
    const [fromCrypto, setFromCrypto] = useState(cryptocurrencies[fromChain][0])
    const [fromAmount, setFromAmount] = useState("")
    const [usdtAmount, setUsdtAmount] = useState("")
    const [usdAmount, setUsdAmount] = useState("")
    const [selectedStock, setSelectedStock] = useState(stocks[0])
    const [stockAmount, setStockAmount] = useState("")
    const [swapResult, setSwapResult] = useState("")
  
    const handleSwapToCrypto = () => {
      // Generate a random USDT amount between 80% and 120% of the input amount
      const randomFactor = 0.8 + Math.random() * 0.4
      const randomUsdtAmount = (parseFloat(fromAmount) * randomFactor).toFixed(2)
      setUsdtAmount(randomUsdtAmount)
      setSwapResult(`You will receive approximately ${randomUsdtAmount} USDT for ${fromAmount} ${fromCrypto}`)
    }
  
    const handleConvertToUSD = () => {
      // Placeholder for USDT to USD conversion
      console.log(`Converting ${usdtAmount} USDT to USD`)
      // Simulate conversion (assuming 1:1 for simplicity)
      setUsdAmount(usdtAmount)
    }
  
    const handleBuyStock = () => {
      // Placeholder for stock purchase logic
      console.log(`Buying ${stockAmount} shares of ${selectedStock} for $${usdAmount}`)
    }
  
    const handleFromAmountChange = (value: string) => {
      setFromAmount(value)
      // Reset subsequent values
      setUsdtAmount("")
      setUsdAmount("")
      setStockAmount("")
      setSwapResult("")
    }
  
    const handleUsdtAmountChange = (value: string) => {
      setUsdtAmount(value)
      // Reset subsequent values
      setUsdAmount("")
      setStockAmount("")
    }
  
    const handleUsdAmountChange = (value: string) => {
      setUsdAmount(value)
      // Reset stock amount
      setStockAmount("")
    }
  
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Buy Stock with Crypto</CardTitle>
          <CardDescription>Swap crypto, convert to USD, and purchase stocks</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="swap">Swap to USDT</TabsTrigger>
              <TabsTrigger value="convert">Convert to USD</TabsTrigger>
              <TabsTrigger value="buy">Buy Stock</TabsTrigger>
            </TabsList>
            <TabsContent value="swap">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-chain">From Chain</Label>
                    <Select value={fromChain} onValueChange={setFromChain}>
                      <SelectTrigger id="from-chain">
                        <SelectValue placeholder="Select chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map((chain) => (
                          <SelectItem key={chain} value={chain}>
                            {chain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-crypto">From Cryptocurrency</Label>
                    <Select value={fromCrypto} onValueChange={setFromCrypto}>
                      <SelectTrigger id="from-crypto">
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptocurrencies[fromChain].map((crypto) => (
                          <SelectItem key={crypto} value={crypto}>
                            {crypto}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-amount">Amount</Label>
                  <Input
                    id="from-amount"
                    placeholder="0.00"
                    type="number"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usdt-amount">Estimated USDT Amount</Label>
                  <Input id="usdt-amount" placeholder="0.00" type="number" value={usdtAmount} readOnly />
                </div>
                <Button className="w-full" onClick={handleSwapToCrypto}>
                  Swap to USDT
                </Button>
                {swapResult && (
                  <div className="mt-4 p-4 bg-secondary text-secondary-foreground rounded-md">
                    {swapResult}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="convert">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="usdt-to-convert">USDT to Convert</Label>
                  <Input
                    id="usdt-to-convert"
                    placeholder="0.00"
                    type="number"
                    value={usdtAmount}
                    onChange={(e) => handleUsdtAmountChange(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <ArrowDown className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usd-amount">USD Amount</Label>
                  <Input id="usd-amount" placeholder="0.00" type="number" value={usdAmount} readOnly />
                </div>
                <Button className="w-full" onClick={handleConvertToUSD}>
                  Convert to USD
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="buy">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="usd-available">USD Available</Label>
                  <Input
                    id="usd-available"
                    placeholder="0.00"
                    type="number"
                    value={usdAmount}
                    onChange={(e) => handleUsdAmountChange(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock-select">Select Stock</Label>
                  <Select value={selectedStock} onValueChange={setSelectedStock}>
                    <SelectTrigger id="stock-select">
                      <SelectValue placeholder="Select stock" />
                    </SelectTrigger>
                    <SelectContent>
                      {stocks.map((stock) => (
                        <SelectItem key={stock} value={stock}>
                          {stock}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock-amount">Number of Shares</Label>
                  <Input
                    id="stock-amount"
                    placeholder="0"
                    type="number"
                    value={stockAmount}
                    onChange={(e) => setStockAmount(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleBuyStock}>
                  Buy Stock
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            <span>Total USD: ${usdAmount}</span>
          </div>
          <div>
            <span className="font-bold">{selectedStock}</span>: {stockAmount} shares
          </div>
        </CardFooter>
      </Card>
    )
}
