// "use client";

// import { useEffect, useState } from "react";
// import { getStockPythPrice } from "@/lib/actions/user/pythnet-actions";

// import { stockName } from "@/lib/constants";

// interface PriceUpdate {
//   conf: string;
//   expo: number;
//   name: null;
//   price: string;
//   publish_time: number;
// }

// interface PythPriceData {
//   prices: PriceUpdate[];
// }

// export default function  StockMarketPage () {

//   // Set up state to store the prices data
//   const [prices, setPrices] = useState<any[]>([]); // Array of arrays with price data

//   useEffect(() => {
//     // Fetch prices when the component mounts
//     const fetchPrices = async () => {
//       try {
//         const fetchedPrices = await getStockPythPrice();
//         setPrices(fetchedPrices); // Update state with the fetched prices
//       } catch (error) {
//         console.error("Error fetching stock prices:", error);
//       }
//     };

//     fetchPrices();
//   }, []);
   
//   const formatPrice = (price: string, expo: number) => {
//     const numPrice = Number(price);
//     const adjustedPrice = numPrice * Math.pow(10, expo);
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: Math.abs(expo),
//       maximumFractionDigits: Math.abs(expo),
//     }).format(adjustedPrice);
//   };
  
//   const formatConfidence = (conf: string) => {
//     // Format confidence as a number or add any specific logic for formatting
//     return Number(conf).toLocaleString('en-US');
//   };
//   return (
//     <div>
//       <h1>Stock Prices</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Stock Name</th>
//             <th>Conf</th>
//             <th>Expo</th>
//             <th>Price</th>
//             <th>Publish Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {stockName.length > 0 ? (
//             stockName.map((stock, index) => {
//               const priceData = prices[index]; // Get the price data for the current stock
//               return (
//                 <tr key={stock}>
//                   <td>{stock}</td>
//                   <td>
//                     {priceData ? formatConfidence(priceData[0]) : 'Loading...'}
//                   </td>
//                   <td>{priceData ? priceData[1] : 'Loading...'}</td>
//                   <td>
//                     {priceData ? formatPrice(priceData[2], priceData[1]) : 'Loading...'}
//                   </td>
//                   <td>{priceData ? new Date(priceData[3] * 1000).toLocaleString() : 'Loading...'}</td>
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan={5}>Loading...</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );

  
//   //   <div>
//   //     <h1>Stock Prices</h1>
//   //     <table>
//   //       <thead>
//   //         <tr>
//   //           <th>Conf</th>
//   //           <th>Expo</th>
//   //           <th>Price</th>
//   //           <th>Publish Time</th>
//   //         </tr>
//   //       </thead>
//   //       <tbody>
//   //         {prices.length > 0 ? (
//   //           prices.map((price, index) => (
//   //             <tr key={index}>
//   //               <td>{formatConfidence(price[0])}</td>
//   //               <td>{price[1]}</td>
//   //               <td>{formatPrice(price[2], price[1])}</td>
//   //               <td>{new Date(price[3] * 1000).toLocaleString()}</td> {/* Convert UNIX timestamp to a readable date */}
//   //             </tr>
//   //           ))
//   //         ) : (
//   //           <tr>
//   //             <td colSpan={4}>Loading...</td>
//   //           </tr>
//   //         )}
//   //       </tbody>
//   //     </table>
//   //   </div>
//   // );
// }

"use client"

import { useEffect, useState } from "react"
import { getStockPythPrice } from "@/lib/actions/user/pythnet-actions"
import { stockName } from "@/lib/constants"
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
        const fetchedPrices = await getStockPythPrice()
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
        <CardTitle>Stock Market Prices</CardTitle>
        <CardDescription>Real-time stock prices from PythNet</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-center py-4">Loading stock prices...</p>}
        {error && <p className="text-center text-red-500 py-4">{error}</p>}
        {!loading && !error && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockName.map((stock, index) => {
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