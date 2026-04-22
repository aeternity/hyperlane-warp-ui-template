import { TokenStandard, WarpCoreConfig } from '@hyperlane-xyz/sdk';

// A list of Warp Route token configs
// These configs will be merged with the warp routes in the configured registry
// The input here is typically the output of the Hyperlane CLI warp deploy command
export const warpRouteConfigs: WarpCoreConfig = {
  tokens: [
    // Route 1: ETH/WETH (Sepolia ETH → AE Wrapped Ether)
    {
      chainName: 'sepolia',
      standard: TokenStandard.EvmHypNative,
      addressOrDenom: '0xBc8CEA629B5c473eC4717e1a0Ee5969F48bf6DFB',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      connections: [
        {
          token:
            'aeternity|aeternitytestnet|ct_2SgKXgGdMpS3FvGaa59YUYGmdUbhNBSeNvsrtymV2iEU3YGx4m',
        },
      ],
    },
    {
      chainName: 'aeternitytestnet',
      standard: TokenStandard.AeternityHypSynthetic,
      addressOrDenom: 'ct_2SgKXgGdMpS3FvGaa59YUYGmdUbhNBSeNvsrtymV2iEU3YGx4m',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      connections: [
        {
          token: 'ethereum|sepolia|0xBc8CEA629B5c473eC4717e1a0Ee5969F48bf6DFB',
        },
      ],
    },

    // Route 2: AE native (AE → Sepolia)
    {
      chainName: 'aeternitytestnet',
      standard: TokenStandard.AeternityHypNative,
      addressOrDenom: 'ct_2wBpCf9zDV46YYfP79v5zCLLevKmGL8mHrvqdV68QuW8X5svCu',
      name: 'Aeternity',
      symbol: 'AE',
      decimals: 18,
      connections: [
        {
          token: 'ethereum|sepolia|0x3372Db191c284452d7e013C6336B8D5cf5450d83',
        },
      ],
    },
    {
      chainName: 'sepolia',
      standard: TokenStandard.EvmHypSynthetic,
      addressOrDenom: '0x3372Db191c284452d7e013C6336B8D5cf5450d83',
      name: 'Aeternity',
      symbol: 'AE',
      decimals: 18,
      connections: [
        {
          token:
            'aeternity|aeternitytestnet|ct_2wBpCf9zDV46YYfP79v5zCLLevKmGL8mHrvqdV68QuW8X5svCu',
        },
      ],
    },
  ],
  options: {},
};
