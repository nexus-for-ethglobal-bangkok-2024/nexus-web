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

export const forexName=[
    "FX.AUD/USD",
    "FX.EUR/USD",
    "FX.GBP/USD",
    "FX.NZD/USD",
    "FX.USD/BRL",
    "FX.USD/CAD",
    "FX.USD/CHF",
    "FX.USD/CNH",
    "FX.USD/HKD",
    "FX.USD/JPY",
    "FX.USD/MXN",
    "FX.USD/NOK",
    "FX.USD/SEK",
    "FX.USD/SGD",
    "FX.USD/TRY",
    "FX.USD/ZAR"
]
export const stockName=[
    "US.AAPL/USD",
    "US.AI/USD",
    "US.AMC/USD",
    "US.AMGN/USD",
    "US.AMZN/USD",
    "US.ARKB/USD",
    "US.ARKK/USD",
    "US.AXP/USD",
    "US.BA/USD",
    "US.BITB/USD",
    "US.BITS/USD",
    "US.BLK/USD",
    "US.BRRR/USD",
    "US.BTCO/USD",
    "US.BTCW/USD",
    "US.BTF/USD",
    "US.CAT/USD",
    "US.COIN/USD",
    "US.CPNG/USD",
    "US.CRM/USD",
    "US.CSCO/USD",
    "US.CVX/USD",
    "US.DEFI/USD",
    "US.DIA/USD",
    "US.DIS/USD",
    "US.DOW/USD",
    "US.EEM/USD",
    "US.EFA/USD",
    "US.EZBC/USD",
    "US.FBTC/USD",
    "US.GBTC/USD"
]
export const cryptoName=
    [
        "1INCH/USD",
        "AAVE/USD",
    
        "ADA/USD",
        "AERO/USD",
        "AEVO/USD",
        "AFSUI/USD",
        "AKT/USD",
        "ALGO/USD",
        "ALICE/USD",
        "ALPACA/USD",
        "ALT/USD",
        "AMP/USD",
        "ANKR/USD",
        "APE/USD",
        "API3/USD",
        "APT/USD",
        "AR/USD",
        "ARB/USD",
        "ARKM/USD",
        "ASTR/USD",
        "ATH/USD",
        "ATOM/USD",
        "AUDIO/USD",
        "AURORA/USD",
        "AVAX/USD",
        "AXS/USD",
        "BNB/USD",
        "BTC/USD"
      ]
      


export const forexPricePythIds=[
    "0x67a6f93030420c1c9e3fe37c1ab6b77966af82f995944a9fefce357a22854a80",
    "0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b",
    "0x84c2dde9633d93d1bcad84e7dc41c9d56578b7ec52fabedc1f335d673df0a7c1",
    "0x92eea8ba1b00078cdc2ef6f64f091f262e8c7d0576ee4677572f314ebfafa4c7",
    "0xd2db4dbf1aea74e0f666b0e8f73b9580d407f5e5cf931940b06dc633d7a95906",
    "0x3112b03a41c910ed446852aacf67118cb1bec67b2cd0b9a214c58cc0eaa2ecca",
    "0x0b1e3297e69f162877b577b0d6a47a0d63b2392bc8499e6540da4187a63e28f8",
    "0xeef52e09c878ad41f6a81803e3640fe04dceea727de894edd4ea117e2e332e66",
    "0x19d75fde7fee50fe67753fdc825e583594eb2f51ae84e114a5246c4ab23aff4c",
    "0xef2c98c804ba503c6a707e38be4dfbb16683775f195b091252bf24693042fd52",
    "0xe13b1c1ffb32f34e1be9545583f01ef385fde7f42ee66049d30570dc866b77ca",
    "0x235ddea9f40e9af5814dbcc83a418b98e3ee8df1e34e1ae4d45cf5de596023a3",
    "0x8ccb376aa871517e807358d4e3cf0bc7fe4950474dbe6c9ffc21ef64e43fc676",
    "0x396a969a9c1480fa15ed50bc59149e2c0075a72fe8f458ed941ddec48bdb4918",
    "0x032a2eba1c2635bf973e95fb62b2c0705c1be2603b9572cc8d5edeaf8744e058",
    "0x389d889017db82bf42141f23b61b8de938a4e2d156e36312175bebf797f493f1"
];
export const stockPricePythIds=[
    "0x49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688",
  "0xafb12c5ccf50495c7a7b04447410d7feb4b3218a663ecbd96aa82e676d3c4f1e",
  "0x5b1703d7eb9dc8662a61556a2ca2f9861747c3fc803e01ba5a8ce35cb50a13a1",
  "0x10946973bfcc936b423d52ee2c5a538d96427626fe6d1a7dae14b1c401d1e794",
  "0xb5d0e0fa58a1f8b81498ae670ce93c872d14434b72c364885d4fa1b257cbb07a",
  "0x8f1c7775f51f7b7990953ad43c336778b8aa1bc3be8d8c1db68a020e078e8a2c",
  "0xb2fe0af6c828efefda3ffda664f919825a535aa28a0f19fc238945c7aff540b1",
  "0x9ff7b9a93df40f6d7edc8184173c50f4ae72152c6142f001e8202a26f951d710",
  "0x8419416ba640c8bbbcf2d464561ed7dd860db1e38e51cec9baf1e34c4be839ae",
  "0xb2f5fb947fb6846c9d9860159179f206193a47bab3cd7ade2d3754c25051c0e1",
  "0xc5676e71c8c76379bb2298934b26e2e848b196716362ea32d66dbcc228607027",
  "0x68d038affb5895f357d7b3527a6d3cd6a54edd0fe754a1248fb3462e47828b08",
  "0xb40b427690447a6fd5f75aa4b35dca20ed9b2e42d8eaa80ecf4d81406db68cd8",
  "0xf8a4a02d7b060a41879eaaab1f729bc2d68a4da491fb66d3446ba9dd6606e97d",
  "0x7e9582ecb9f1cb90400e897fb364ea35ed4193b47ce19a7eff8e392f695550be",
  "0x5d72edffd1b1f72506018204afe1cdf9f31b97e6a30ba1d079bcb242c874529c",
  "0xad04597ba688c350a97265fcb60585d6a80ebd37e147b817c94f101a32e58b4c",
  "0xfee33f2a978bf32dd6b662b65ba8083c6773b494f8401194ec1870c640860245",
  "0x5557d206aa0dd037fc082f03bbd78653f01465d280ea930bc93251f0eb60c707",
  "0xfeff234600320f4d6bb5a01d02570a9725c1e424977f2b823f7231e6857bdae8",
  "0x3f4b77dd904e849f70e1e812b7811de57202b49bc47c56391275c0f45f2ec481",
  "0xf464e36fd4ef2f1c3dc30801a9ab470dcdaaa0af14dd3cf6ae17a7fca9e051c5",
  "0x78c13ca4415e910dcb9516b811e630e6fa8f98999615eb66955cbef4337c1d3f",
  "0x57cff3a9a4d4c87b595a2d1bd1bac0240400a84677366d632ab838bbbe56f763",
  "0x703e36203020ae6761e6298975764e266fb869210db9b35dd4e4225fa68217d0",
  "0xf3b50961ff387a3d68217e2715637d0add6013e7ecb83c36ae8062f97c46929e",
  "0xd407e68cec58205be82a6140a668dc42f8d9079bcf3be4aa4b41f41f7b983035",
  "0x3b7ef6c95ceedbffbb66bff3d6135a200c5d0a0466b0c90812510ceaedebaf04",
  "0x337611acbeb14ef4ea0d754226bc8b900ff5fd2e469e762a4b135034c3ed9897",
  "0xb3a76e70a55517e0405cc90a2545de4c30413c13c532caf96a734103ec4259e9"
];
export const cryptoPricePythIds=[
   "0x63f341689d98a12ef60a5cff1d7f85c70a9e17bf1575f0e7c0b2512d48b1c8b3",
   "0x2b9ab1e972a281585084148ba1389800799bd4be63b957507db1349314e47445",
  
    "0x2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d",
    "0x9db37f4d5654aad3e37e2e14ffd8d53265fb3026d1d8f91146539eebaa2ef45f",
   "0x104e4d9ba218610b9af53c887f9fcb7396615259867a5a4b5983a65802aeee0b",
   "0x17cd845b16e874485b2684f8b8d1517d744105dbb904eec30222717f4bc9ee0d",
   "0x4ea5bb4d2f5900cc2e97ba534240950740b4d3b89fe712a94a7304fd2fd92702",
   "0xfa17ceaf30d19ba51112fdcc750cc83454776f47fb0112e4af07f15f4bb1ebc0",
   "0xccca1d2b0d9a9ca72aa2c849329520a378aea0ec7ef14497e67da4050d6cf578",
 "0x9095653620547ece988ec51486dc7a6eb2efddbce8ea5bedbd53bf00cca84cf6",
   "0x119ff2acf90f68582f5afd6f7d5f12dbae81e4423f165837169d6b94c27fb384",
    "0xd37e4513ebe235fff81e453d400debaf9a49a5df2b7faa11b3831d35d7e72cb7",
   "0x89a58e1cab821118133d6831f5018fba5b354afb78b2d18f575b3cbf69a4f652",
    "0x15add95022ae13563a11992e727c91bdb6b55bc183d9d747436c80a483d8c864",
   "0x95ea50020cf75a81a105d639fd74773ade522e12044600b52286ff5961c71412",
  "0x03ae4db29ed4ae33d323568895aa00337e658e348b37509f5372ae51f0af00d5",
    "0xf610eae82767039ffc95eef8feaeddb7bbac0673cfe7773b2fde24fd1adb0aee",
    "0x3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5",
    "0x7677dd124dee46cfcd46ff03cf405fb0ed94b1f49efbea3444aadbda939a7ad3",
    "0x89b814de1eb2afd3d3b498d296fca3a873e644bafb587e84d181a01edd682853",
   "0xf6b551a947e7990089e2d5149b1e44b369fcc6ad3627cb822362a2b19d24ad4a",
  "0xb00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819",
   "0x2ea070725c82f69be1a730c1730cb229dc3ab44459f41d6f06f0b9ab551e4ddb",
     "0x2f7c4f738d498585065a4b87b637069ec99474597da7f0ca349ba8ac3ba9cac5",
    "0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7",
    "0xb7e3904c08ddd9c0c10c6d207d390fd19e87eb6aab96304f571ed94caebdefa0",
   "0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f",
    "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"
];