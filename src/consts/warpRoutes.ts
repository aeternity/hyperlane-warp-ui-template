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
      addressOrDenom: '0xe755e439003d249Ae36A64278a8136A88B556B95',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      connections: [
        {
          token:
            'aeternity|aeternitytestnet|ct_21JC6za6HBjpQArLG8xYBx34vkzx7Xg4ufGHYHRobFLhB1znsv',
        },
      ],
    },
    {
      chainName: 'aeternitytestnet',
      standard: TokenStandard.AeternityHypSynthetic,
      addressOrDenom: 'ct_21JC6za6HBjpQArLG8xYBx34vkzx7Xg4ufGHYHRobFLhB1znsv',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      connections: [
        {
          token: 'ethereum|sepolia|0xe755e439003d249Ae36A64278a8136A88B556B95',
        },
      ],
    },

    // Route 2: AE native (AE → Sepolia)
    {
      chainName: 'aeternitytestnet',
      standard: TokenStandard.AeternityHypNative,
      addressOrDenom: 'ct_tbRpzXSYePKvzFGe4F3X1M4cTWnfV24NH7YwdN3bhP96Rj2ep',
      name: 'Aeternity',
      symbol: 'AE',
      decimals: 18,
      connections: [
        {
          token: 'ethereum|sepolia|0xddFddf720F0F057F16026851D8622cE4d0A205B9',
        },
      ],
    },
    {
      chainName: 'sepolia',
      standard: TokenStandard.EvmHypSynthetic,
      addressOrDenom: '0xddFddf720F0F057F16026851D8622cE4d0A205B9',
      name: 'Aeternity',
      symbol: 'AE',
      decimals: 18,
      connections: [
        {
          token:
            'aeternity|aeternitytestnet|ct_tbRpzXSYePKvzFGe4F3X1M4cTWnfV24NH7YwdN3bhP96Rj2ep',
        },
      ],
    },
  ],
  options: {},
};
