export const userId= "b46125bc-8026-44f8-b230-8f61def1bebc"; 

export const CRONICLE_CON_ADDRESS= "0xEe1495A54c077811f626a6B369832094689f07AE"; 

export const SUPPORTED_SYMBOLS = [
    "AAVE/USD", "ARB/USD", "AVAX/USD", "BNB/USD", "BTC/USD",
    "CRVUSD/USD", "CRV/USD", "DAI/USD", "ETHX/USD", "ETH/BTC",
    "ETH/USD", "GNO/USD", "IBTA/USD", "LDO/USD", "LINK/USD",
    "MKR/USD", "MNT/USD", "OP/USD", "POL/USD", "RETH/ETH",
    "RETH/USD", "SDAI/DAI", "SD/USD", "SNX/USD", "SOL/USD",
    "UNI/USD", "USDC/USD", "USDM/USD", "USDT/USD", "WBTC/USD",
    "WSTETH/ETH", "WSTETH/USD", "WUSDM/USDM", "WUSDM/USD", "YFI/USD"
];

export const CONTRACT_ABI = [
    "function readPrice(string) view returns (uint256, uint256)",
    "function readMultiplePrices(string[]) view returns (uint256[], uint256[])",
    "function readAllPrices() view returns (string[], uint256[], uint256[])",
    "function getSupportedSymbols() view returns (string[])",
    "function isSymbolSupported(string) view returns (bool)",
    "function getOracleAddress(string) view returns (address)",
    "function getLastAccessTime(string) view returns (uint256)",
    "function lastAccessTime(string) view returns (uint256)"
];

// export const CONTRACT_ABI = [