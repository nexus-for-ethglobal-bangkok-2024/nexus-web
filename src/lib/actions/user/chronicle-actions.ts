'use server'
import { ethers } from 'ethers';
import { type Provider } from 'ethers';

import { CONTRACT_ABI,CRONICLE_CON_ADDRESS,SUPPORTED_SYMBOLS } from '@/lib/constants';


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

export interface PriceData {
    symbol: string;
    price: string;
    lastUpdated: string;
}

const getContract = () => {
    const provider = getProvider();
    return new ethers.Contract(CRONICLE_CON_ADDRESS, CONTRACT_ABI, provider);
};

export async function getSinglePrice(symbol: string): Promise<PriceData> {
    try {
        const contract = getContract();
        const [priceRaw, ageRaw] = await contract.readPrice(symbol);
        
        return {
            symbol,
            price: ethers.formatUnits(priceRaw, 18),
            lastUpdated: new Date(Number(ageRaw) * 1000).toISOString()
        };
    } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
        throw error;
    }
}

export async function getMultiplePrices(symbols: string[] = SUPPORTED_SYMBOLS): Promise<PriceData[]> {
    try {
        const contract = getContract();
        const [pricesRaw, agesRaw] = await contract.readMultiplePrices(symbols);
        
        return symbols.map((symbol, i) => ({
            symbol,
            price: ethers.formatUnits(pricesRaw[i], 18),
            lastUpdated: new Date(Number(agesRaw[i]) * 1000).toISOString()
        }));
    } catch (error) {
        console.error('Error fetching multiple prices:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch prices');
    }
}

export async function getAllPrices(): Promise<PriceData[]> {
    try {
        const contract = getContract();
        const [symbols, pricesRaw, agesRaw] = await contract.readAllPrices();
        
        return symbols.map((symbol: string, i: number) => ({
            symbol,
            price: ethers.formatUnits(pricesRaw[i], 18),
            lastUpdated: new Date(Number(agesRaw[i]) * 1000).toISOString()
        }));
    } catch (error) {
        console.error('Error fetching all prices:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch all prices');
    }
}

export async function getSupportedSymbols(): Promise<string[]> {
    try {
        const contract = getContract();
        return await contract.getSupportedSymbols();
    } catch (error) {
        console.error('Error fetching supported symbols:', error);
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch supported symbols');
    }
}

// Client-side wallet connection
// utils/web3.ts
export const connectWallet = async () => {
    if (typeof window === 'undefined') return null;
    if (!window.ethereum) throw new Error('Please install MetaMask!');
    
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CRONICLE_CON_ADDRESS, CONTRACT_ABI, signer);
        
        return { provider, signer, contract };
    } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
    }
};