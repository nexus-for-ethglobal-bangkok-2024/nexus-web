'use client'

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'

// Mock data for stocks
// const stocks = [
//   { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80 },
//   { symbol: 'TSLA', name: 'Tesla, Inc.', price: 750.20 },
//   { symbol: 'META', name: 'Meta Platforms, Inc.', price: 330.75 },
//   { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25 },
//   { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 220.90 },
//   { symbol: 'KO', name: 'Coca-Cola', price: 230.60 },
//   { symbol: 'DIS', name: 'Disney', price: 170.30 },
//   { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3380.50 },
//   { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.15 },
//   { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 160.40 },
// ]

const stocks = [
  { id: '2039dca7-1868-4ca7-b9fd-6dfb19c0c70b', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80 },
  { id: '235c13e1-e9da-416d-833e-df6907fa6c0e', symbol: 'TSLA', name: 'Tesla, Inc.', price: 750.20 },
  { id: '2523102d-f1e6-4895-b003-5e6e48ff729e', symbol: 'META', name: 'Meta Platforms, Inc.', price: 330.75 },
  { id: '2f29a086-b9e8-42a2-8be9-a7724af8a5b8', symbol: 'AAPL', name: 'Apple Inc.', price: 150.25 },
  { id: '3ccb926a-f013-4392-871d-e3f12c8a8512', symbol: 'NVDA', name: 'NVIDIA Corporation', price: 220.90 },
  { id: '7fc6adbb-73ff-4dfb-ba85-f5ca877460af', symbol: 'KO', name: 'Coca-Cola', price: 230.60 },
  { id: 'a9dbbdad-1ce2-4ef0-ba59-4a9aa0244ae3', symbol: 'DIS', name: 'Disney', price: 170.30 },
  { id: 'b2e98f9f-41ed-4a80-bf20-286fe4e0b098', symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3380.50 },
  { id: 'ce817566-aea8-43b6-b8f7-c806439ec920', symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.15 },
  { id: 'd9e409e3-bc35-49eb-ad24-5cbc6f429c4a', symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 160.40 },
];


export default function  StockBuyPage () {

  const [buyingStock, setBuyingStock] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [calculatedAmount, setCalculatedAmount] = useState(0)

  const router = useRouter()
 

  const handleBuy = (symbol: string, quantity: number, amount: number, currency: string) => {
    setBuyingStock(symbol)
    // Simulating API call
    setTimeout(() => {
      alert(`You've successfully placed an order for ${quantity} shares of ${symbol} for ${amount} ${currency}!`)
      setBuyingStock(null)
    }, 1000)
  }

  const handleBuyWithCrypto = (symbol: string) => {
    // Mock route change
    alert(`Redirecting to crypto purchase page for ${symbol}...`)
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/trade-stock/buy/buy-with-crypto`)
    
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Stock Market</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div>
                <h3 className="font-semibold">{stock.symbol}</h3>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono">${stock.price.toFixed(2)}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-32">
                      {buyingStock === stock.symbol ? (
                        <span className="animate-pulse">Buying...</span>
                      ) : (
                        <>
                          Buy
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => {
                          e.preventDefault()
                          setQuantity(1)
                          setCalculatedAmount(stock.price)
                        }}>
                          Buy
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Buy {stock.symbol}</DialogTitle>
                          <DialogDescription>
                            Enter the details of your purchase below.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => {
                          e.preventDefault()
                          const formData = new FormData(e.currentTarget)
                          handleBuy(
                            stock.symbol,
                            quantity,
                            calculatedAmount,
                            formData.get('currency') as string
                          )
                        }}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="quantity" className="text-right">
                                Quantity
                              </Label>
                              <Input
                                id="quantity"
                                name="quantity"
                                type="number"
                                className="col-span-3"
                                min="1"
                                required
                                value={quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1
                                  setQuantity(newQuantity)
                                  setCalculatedAmount(newQuantity * stock.price)
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="amount" className="text-right">
                                Amount
                              </Label>
                              <div className="col-span-3 font-mono">
                                ${calculatedAmount.toFixed(2)}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="currency" className="text-right">
                                Currency
                              </Label>
                              <Select name="currency" defaultValue="USD">
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Confirm Purchase</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem onSelect={() => handleBuyWithCrypto(stock.symbol)}>
                      Buy with Crypto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )

}

