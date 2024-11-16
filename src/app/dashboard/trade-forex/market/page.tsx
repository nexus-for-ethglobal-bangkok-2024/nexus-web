"use client"

import { useEffect, useState } from "react"
import { getForexPythPrice } from "@/lib/actions/user/pythnet-actions"
import { forexName } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

export default function StockMarketPage() {
  const [prices, setPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true)
        const fetchedPrices = await getForexPythPrice()
        setPrices(fetchedPrices)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching stock prices:", error)
        setError("Failed to fetch stock prices. Please try again later.")
        setLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Forex Market Prices</CardTitle>
        <CardDescription>Real-time stock prices from PythNet</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-center py-4">Loading stock prices...</p>}
        {error && <p className="text-center text-red-500 py-4">{error}</p>}
        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Forex Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forexName.map((stock, index) => {
                const priceData = prices[index]
                return (
                  <TableRow key={stock}>
                    <TableCell className="font-medium">{stock}</TableCell>
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
  )
}