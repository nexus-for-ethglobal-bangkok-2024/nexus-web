'use server'
import { ethers } from 'ethers';
import { type Provider } from 'ethers';
const { HermesClient } = require("@pythnetwork/hermes-client");

const contractABI = [
    "function exampleMethod(bytes[] calldata priceUpdate) public payable",
 ];

const PythAddress = "0xc491C99787FDb2Baf00D27b81dFcda4d874c9F2F";

import { forexName, forexPricePythIds, stockName, stockPricePythIds, cryptoName, cryptoPricePythIds } from '@/lib/constants';

let provider: Provider | null = null;

const getProvider = () => {
    if (!provider) {
        if (!process.env.ALCHEMY_TESTNET_RPC_URL) {
            throw new Error('ALCHEMY_TESTNET_RPC_URL is not defined');
        }
        provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_TESTNET_RPC_URL);
    }
    return provider;
};

const hermes = new HermesClient('https://hermes.pyth.network');

interface PriceUpdate {
    conf: string;
    expo: number;
    name: null;
    price: string;
    publish_time: number;
}

interface PythPriceData {
    prices: PriceUpdate[];
}

const getContract = () => {
    const provider = getProvider();
    return new ethers.Contract(PythAddress, contractABI, provider);
};

export async function getStockPythPrice(): Promise<any[]> {
    try {
        const contract = getContract();

        const priceFeeds = await hermes.getPriceFeeds("btc", "crypto");
        console.log(priceFeeds);

        // Fetch price updates
        const priceUpdates = await hermes.getLatestPriceUpdates(stockPricePythIds);
        // const bytes = ethers.utils.arrayify("0x" + priceUpdates.binary.data[0]);

        // Mapping price updates to a flat array of [conf, expo, price, publish_time]
        const prices: any[] = priceUpdates.parsed.map((p: any) => [
            p.price.conf,
            p.price.expo,
            p.price.price,
            p.price.publish_time,
        ]);

        console.log(prices);

        // Return the array of price data
        return prices;
    } catch (error) {
        console.error(`Error fetching price for Stocks`, error);
        throw error;
    }
}

export async function getForexPythPrice(): Promise<any[]> {
    
        try {
            const contract = getContract();
    
            const priceFeeds = await hermes.getPriceFeeds("btc", "crypto");
            console.log(priceFeeds);
    
            // Fetch price updates
            const priceUpdates = await hermes.getLatestPriceUpdates(forexPricePythIds);
            // const bytes = ethers.utils.arrayify("0x" + priceUpdates.binary.data[0]);
    
            // Mapping price updates to a flat array of [conf, expo, price, publish_time]
            const prices: any[] = priceUpdates.parsed.map((p: any) => [
                p.price.conf,
                p.price.expo,
                p.price.price,
                p.price.publish_time,
            ]);
    
            console.log(prices);
    
            // Return the array of price data
            return prices;
        } catch (error) {
            console.error(`Error fetching price for Stocks`, error);
            throw error;
        }
 }