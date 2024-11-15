import { CryptoChart } from '@/components/market-overview/CryptoChart'
import { ForexChart } from '@/components/market-overview/ForexChart'
import { StockChart } from '@/components/market-overview/StockChart'
import { TabbedAssetTable } from '@/components/market-overview/tabbed-asset-table'
import React from 'react'

export default function  MarketOverviewPage(){
  return (
    <div className="space-y-6">
    <h1 className="text-2xl sm:text-3xl font-bold">Market Overview</h1>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="w-full">
        <StockChart />
      </div>
      <div className="w-full">
        <CryptoChart />
      </div>
      <div className="w-full">
        <ForexChart />
      </div>
    </div>
    <div className="mt-6">
      <TabbedAssetTable />
    </div>
  </div>
  )
}

