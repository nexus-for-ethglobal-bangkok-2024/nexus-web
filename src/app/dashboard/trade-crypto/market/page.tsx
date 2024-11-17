'use client';

import { useEffect, useState } from 'react';
import { getMultiplePrices, type PriceData } from '@/lib/actions/user/chronicle-actions';

interface PriceDisplayProps {
    refreshInterval?: number;
}
const CryptoMarketPage = ({ refreshInterval = 30000 }: PriceDisplayProps): JSX.Element => {
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
                <h2 className="text-xl font-bold">Crypto Prices</h2>
                <div className="text-sm text-gray-500">
                    Last updated: {lastRefresh.toLocaleTimeString()}
                </div>
            </div>
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
};

export default CryptoMarketPage;

