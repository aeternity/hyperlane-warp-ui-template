import {
  eclipsemainnet,
  eclipsemainnetAddresses,
  solanamainnet,
  solanamainnetAddresses,
  solaxy,
  solaxyAddresses,
  sonicsvm,
  sonicsvmAddresses,
  soon,
  soonAddresses,
} from '@hyperlane-xyz/registry';
import { ChainMap, ChainMetadata, ExplorerFamily } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';

// A map of chain names to ChainMetadata
// Chains can be defined here, in chains.json, or in chains.yaml
// Chains already in the SDK need not be included here unless you want to override some fields
// Schema here: https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/metadata/chainMetadataTypes.ts
export const chains: ChainMap<ChainMetadata & { mailbox?: Address }> = {
  solanamainnet: {
    ...solanamainnet,
    // SVM chains require mailbox addresses for the token adapters
    mailbox: solanamainnetAddresses.mailbox,
  },
  eclipsemainnet: {
    ...eclipsemainnet,
    mailbox: eclipsemainnetAddresses.mailbox,
  },
  soon: {
    ...soon,
    mailbox: soonAddresses.mailbox,
  },
  sonicsvm: {
    ...sonicsvm,
    mailbox: sonicsvmAddresses.mailbox,
  },
  solaxy: {
    ...solaxy,
    mailbox: solaxyAddresses.mailbox,
  },
  aeternitytestnet: {
    protocol: ProtocolType.Aeternity,
    chainId: 457,
    domainId: 457,
    name: 'aeternitytestnet',
    displayName: 'Aeternity Testnet',
    nativeToken: { name: 'Aeternity', symbol: 'AE', decimals: 18 },
    rpcUrls: [{ http: 'https://testnet.aeternity.io' }],
    blockExplorers: [
      {
        name: 'AeScan',
        url: 'https://testnet.aescan.io',
        apiUrl: 'https://testnet.aeternity.io/mdw',
        family: ExplorerFamily.Other,
      },
    ],
    blocks: {
      confirmations: 1,
      reorgPeriod: 0,
      estimateBlockTime: 3,
    },
    logoURI: '/logos/aeternity.svg',
    mailbox: 'ct_2dTGMpJvvSWJmBMo3mYqrA18YPmqfbFSswWTPNfXCLFBkdnrich',
  },
};

// rent account payment for (mostly for) SVM chains added on top of IGP,
// not exact but should be pretty close to actual payment
export const chainsRentEstimate: ChainMap<bigint> = {
  eclipsemainnet: BigInt(Math.round(0.00004019 * 10 ** 9)),
  solanamainnet: BigInt(Math.round(0.00411336 * 10 ** 9)),
  sonicsvm: BigInt(Math.round(0.00411336 * 10 ** 9)),
  soon: BigInt(Math.round(0.00000355 * 10 ** 9)),
};
