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


import { getMultiplePrices, type PriceData } from '@/lib/actions/user/chronicle-actions';

interface PriceDisplayProps {
    refreshInterval?: number;
}

export default function CryptoSwapPage() {
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
   <div className="container mx-auto px-4 py-6">
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
   <div className="w-full">
          <Card className="h-full">
            <CryptoMarketPage refreshInterval={30000} />
          </Card>
        </div>

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
   </div>
   </div>
  )
}


function CryptoMarketPage({ refreshInterval = 30000 }: PriceDisplayProps){

  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchPrices = async () => {
      try {
          setLoading(true);
          const data = await getMultiplePrices();
          setPrices(data);
          setLastRefresh(new Date());
          setError(null);
      } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch prices');
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchPrices();
      
      if (refreshInterval > 0) {
          const interval = setInterval(fetchPrices, refreshInterval);
          return () => clearInterval(interval);
      }
  }, [refreshInterval]);

  const formatPrice = (price: string): string => {
      const numPrice = parseFloat(price);
      return numPrice > 1 
          ? numPrice.toFixed(2) 
          : numPrice.toPrecision(4);
  };

  if (loading && prices.length === 0) {
      return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 border rounded animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </div>
              ))}
          </div>
      );
  }

  if (error) {
      return (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="font-bold text-red-600">Error</h3>
              <p className="text-red-500">{error}</p>
              <button 
                  onClick={fetchPrices}
                  className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                  Retry
              </button>
          </div>
      );
  }

  return (
      <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Real Time Crypto Prices</h2>
              <div className="text-sm text-red-500">
                  Last updated: {lastRefresh.toLocaleTimeString()}
              </div>
          </div>
          <h3 className="text-xl font-semibold">Calculate the risk, embrace the reward</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prices.map((item) => (
                  <div 
                      key={item.symbol} 
                      className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow"
                  >
                      <h3 className="font-bold text-lg">{item.symbol}</h3>
                     
                      <p className="text-2xl font-semibold text-blue-600">
                          ${formatPrice(item.price)}
                      </p>
                      <p className="text-sm text-gray-500">
                          Updated: {new Date(item.lastUpdated).toLocaleTimeString()}
                      </p>
                  </div>
              ))}
          </div>
      </div>
  );
}

