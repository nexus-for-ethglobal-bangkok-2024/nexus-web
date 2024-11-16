"use client"

import { useEffect, useState } from "react"
import { getForexPythPrice } from "@/lib/actions/user/pythnet-actions"
import { forexName } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for forex pairs
const mockForexPairs = [
  { name: "EUR/USD", price: 1.1234, minAmount: 100, maxAmount: 100000 },
  { name: "GBP/USD", price: 1.3456, minAmount: 100, maxAmount: 100000 },
  { name: "USD/JPY", price: 110.78, minAmount: 1000, maxAmount: 1000000 },
  { name: "USD/CHF", price: 0.9876, minAmount: 100, maxAmount: 100000 },
  { name: "AUD/USD", price: 0.7654, minAmount: 100, maxAmount: 100000 },
  { name: "USD/CAD", price: 1.2345, minAmount: 100, maxAmount: 100000 },
]

export default function ForexBuyPage (){
  const [prices, setPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPair, setSelectedPair] = useState("")
  const [amount, setAmount] = useState("")
  const [totalCost, setTotalCost] = useState<number | null>(null)
  const [alertMessage, setAlertMessage] = useState<{ type: 'error' | 'success', message: string } | null>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true)
        const fetchedPrices = await getForexPythPrice()
        setPrices(fetchedPrices)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching forex prices:", error)
        setError("Failed to fetch forex prices. Please try again later.")
        setLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedPair && amount) {
      const selectedForexPair = mockForexPairs.find(pair => pair.name === selectedPair)
      if (selectedForexPair) {
        const cost = parseFloat(amount) * selectedForexPair.price
        setTotalCost(parseFloat(cost.toFixed(2)))
      }
    } else {
      setTotalCost(null)
    }
  }, [selectedPair, amount])

  const formatPrice = (price: string, expo: number) => {
    const numPrice = Number(price)
    const adjustedPrice = numPrice * Math.pow(10, expo)
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: Math.abs(expo),
      maximumFractionDigits: Math.abs(expo),
    }).format(adjustedPrice)
  }

  const formatConfidence = (conf: string) => {
    return Number(conf).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }

  const getChangeIndicator = (index: number) => {
    if (index % 2 === 0) {
      return <ArrowUpIcon className="h-4 w-4 text-green-500" />
    } else {
      return <ArrowDownIcon className="h-4 w-4 text-red-500" />
    }
  }

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedForexPair = mockForexPairs.find(pair => pair.name === selectedPair)
    if (!selectedForexPair) {
      setAlertMessage({ type: 'error', message: "Invalid forex pair selected." })
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum < selectedForexPair.minAmount || amountNum > selectedForexPair.maxAmount) {
      setAlertMessage({ type: 'error', message: `Amount must be between ${selectedForexPair.minAmount} and ${selectedForexPair.maxAmount}.` })
      return
    }

    // Simulate API call
    setTimeout(() => {
      setAlertMessage({ type: 'success', message: `Successfully bought ${amount} ${selectedPair} for $${totalCost?.toFixed(2)}.` })
      // Reset form
      setSelectedPair("")
      setAmount("")
      setTotalCost(null)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Forex Market</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Forex Market Prices</CardTitle>
            <CardDescription>Real-time forex prices from PythNet</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-center py-4">Loading forex prices...</p>}
            {error && <p className="text-center text-red-500 py-4">{error}</p>}
            {!loading && !error && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Forex Pair</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forexName.map((pair, index) => {
                    const priceData = prices[index]
                    return (
                      <TableRow key={pair}>
                        <TableCell className="font-medium">{pair}</TableCell>
                        <TableCell>
                          {priceData ? (
                            <div className="flex items-center space-x-2">
                              <span>{formatPrice(priceData[2], priceData[1])}</span>
                              {getChangeIndicator(index)}
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {priceData ? (
                            <Badge variant="outline">{formatConfidence(priceData[0])}</Badge>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {priceData ? (
                            new Date(priceData[3] * 1000).toLocaleString()
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Buy Forex</CardTitle>
            <CardDescription>Place your forex buy order</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBuy} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forex-pair">Select Forex Pair</Label>
                <Select value={selectedPair} onValueChange={setSelectedPair}>
                  <SelectTrigger id="forex-pair">
                    <SelectValue placeholder="Select a forex pair" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockForexPairs.map((pair) => (
                      <SelectItem key={pair.name} value={pair.name}>{pair.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              {totalCost !== null && (
                <div className="text-sm text-gray-500">
                  Total Cost: ${totalCost.toFixed(2)}
                </div>
              )}
              <Button type="submit" disabled={!selectedPair || !amount}>
                Buy Forex
              </Button>
            </form>
            {alertMessage && (
              <Alert variant={alertMessage.type === 'error' ? 'destructive' : 'default'} className="mt-4">
                {alertMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                <AlertTitle>{alertMessage.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                <AlertDescription>{alertMessage.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

