"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"



//Placeholder data for chains and cryptocurrencies
const chains = ["Ethereum", "Binance Smart Chain", "Polygon", "Avalanche", "Solana"]
const cryptocurrencies = {
  "Ethereum": ["ETH", "USDT", "USDC", "DAI", "LINK"],
  "Binance Smart Chain": ["BNB", "BUSD", "CAKE", "XVS", "BAKE"],
  "Polygon": ["MATIC", "QUICK", "AAVE", "SUSHI", "GHST"],
  "Avalanche": ["AVAX", "JOE", "PNG", "QI", "SNOB"],
  "Solana": ["SOL", "RAY", "SRM", "STEP", "COPE"]
}

// Fake price data
const fakePrices = {
  ETH: 4000, USDT: 1, USDC: 1, DAI: 1, LINK: 20,
  BNB: 300, BUSD: 1, CAKE: 5, XVS: 10, BAKE: 2,
  MATIC: 2, QUICK: 15, AAVE: 100, SUSHI: 8, GHST: 3,
  AVAX: 80, JOE: 4, PNG: 6, QI: 2, SNOB: 5,
  SOL: 100, RAY: 8, SRM: 6, STEP: 2, COPE: 4
}

export function CryptoSwapPage() {
  const { toast } = useToast()
  const [fromChain, setFromChain] = useState(chains[0])
  const [toChain, setToChain] = useState(chains[1])
  const [fromCrypto, setFromCrypto] = useState(cryptocurrencies[fromChain][0])
  const [toCrypto, setToCrypto] = useState(cryptocurrencies[toChain][0])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Calculate estimated received amount with fake exchange rate
  const calculateEstimatedAmount = (amount: string) => {
    if (!amount) return ""
    const fromPrice = fakePrices[fromCrypto as keyof typeof fakePrices]
    const toPrice = fakePrices[toCrypto as keyof typeof fakePrices]
    const estimatedAmount = (parseFloat(amount) * fromPrice / toPrice) * 0.95 // 5% slippage
    return estimatedAmount.toFixed(6)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    setToAmount(calculateEstimatedAmount(value))
  }

  const switchTokens = () => {
    setFromChain(toChain)
    setToChain(fromChain)
    setFromCrypto(toCrypto)
    setToCrypto(fromCrypto)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleSwap = async () => {
    setIsLoading(true)
    try {
      // Create the swap transaction
      const response = await fetch('/api/crypto/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromChain,
          toChain,
          fromCrypto,
          toCrypto,
          fromAmount,
          toAmount,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process swap')
      }

      toast({
        title: "Swap Successful",
        description: `Swapped ${fromAmount} ${fromCrypto} for ${toAmount} ${toCrypto}`,
      })

      // Reset form
      setFromAmount("")
      setToAmount("")

    } catch (error) {
      toast({
        title: "Swap Failed",
        description: "There was an error processing your swap. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Exchange tokens across different chains</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-chain">Sell Chain</Label>
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
            <Label htmlFor="from-crypto">Sell Cryptocurrency</Label>
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
          <Button variant="outline" size="icon" onClick={switchTokens}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="to-chain">Receive Chain</Label>
            <Select value={toChain} onValueChange={setToChain}>
              <SelectTrigger id="to-chain">
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
            <Label htmlFor="to-crypto">Receive Cryptocurrency</Label>
            <Select value={toCrypto} onValueChange={setToCrypto}>
              <SelectTrigger id="to-crypto">
                <SelectValue placeholder="Select cryptocurrency" />
              </SelectTrigger>
              <SelectContent>
                {cryptocurrencies[toChain].map((crypto) => (
                  <SelectItem key={crypto} value={crypto}>
                    {crypto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="to-amount">Estimated Received</Label>
          <Input id="to-amount" placeholder="0.00" type="number" value={toAmount} readOnly />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSwap}
          disabled={isLoading || !fromAmount || parseFloat(fromAmount) <= 0}
        >
          {isLoading ? "Processing..." : "Swap"}
        </Button>
      </CardFooter>
    </Card>
  )
}