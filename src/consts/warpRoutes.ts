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
      addressOrDenom: '0xE5Eb586a1e2C56f81F84a7Bc0EF973Ab992c1fdc',
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
      connections: [
        {
          token:
            'aeternity|aeternitytestnet|ct_2UfX8heeRiGyhu1XBHpacoeVGJEHX74c6k6MvUhNqxe6RGMfVk',
        },
      ],
    },
    {
      chainName: 'aeternitytestnet',
      standard: TokenStandard.AeternityHypSynthetic,
      addressOrDenom: 'ct_2UfX8heeRiGyhu1XBHpacoeVGJEHX74c6k6MvUhNqxe6RGMfVk',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      connections: [
        {
          token: 'ethereum|sepolia|0xE5Eb586a1e2C56f81F84a7Bc0EF973Ab992c1fdc',
        },
      ],
    },

    // Route 2: AE native (AE → Sepolia)
    {
      chainName: 'aeternitytestnet',
      standard: TokenStandard.AeternityHypNative,
      addressOrDenom: 'ct_cerLGybxRAGUKeY5AkVKsjyZthcVTYaQf1e3dGHNyWWJKW6fh',
      name: 'Aeternity',
      symbol: 'AE',
      decimals: 18,
      connections: [
        {
          token: 'ethereum|sepolia|0x20915632Dc8f1dc1148FaE886ed738dB058778C8',
        },
      ],
    },
    {
      chainName: 'sepolia',
      standard: TokenStandard.EvmHypSynthetic,
      addressOrDenom: '0x20915632Dc8f1dc1148FaE886ed738dB058778C8',
      name: 'Aeternity',
      symbol: 'AE',
      decimals: 18,
      connections: [
        {
          token:
            'aeternity|aeternitytestnet|ct_cerLGybxRAGUKeY5AkVKsjyZthcVTYaQf1e3dGHNyWWJKW6fh',
        },
      ],
    },
  ],
  options: {},
};
