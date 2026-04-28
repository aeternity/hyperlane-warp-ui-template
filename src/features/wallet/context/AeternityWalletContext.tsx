import {
  AeSdkAepp,
  BrowserWindowMessageConnection,
  Contract,
  Node,
  walletDetector,
} from '@aeternity/aepp-sdk';
import { ProviderType } from '@hyperlane-xyz/sdk';
import {
  registerAeternityTxHandler,
  setAeternityWalletState,
} from '@hyperlane-xyz/widgets/walletIntegrations/aeternity';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { WARP_ROUTER_ACI } from '@hyperlane-xyz/aeternity-sdk';

const AE_TESTNET_NODE = 'https://testnet.aeternity.io';
const AE_TESTNET_COMPILER = 'https://v8.compiler.aepps.com';

interface AeternityWalletState {
  sdk: AeSdkAepp | null;
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const defaultState: AeternityWalletState = {
  sdk: null,
  address: null,
  isConnected: false,
  connect: async () => {},
  disconnect: () => {},
};

const AeternityWalletCtx = createContext<AeternityWalletState>(defaultState);

export const useAeternityWallet = () => useContext(AeternityWalletCtx);

export function AeternityWalletContext({ children }: PropsWithChildren) {
  const [sdk, setSdk] = useState<AeSdkAepp | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const sdkRef = useRef<AeSdkAepp | null>(null);
  const detectorStopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const aeSdk = new AeSdkAepp({
      name: 'Hyperlane Warp Bridge',
      nodes: [{ name: 'testnet', instance: new Node(AE_TESTNET_NODE) }],
      onNetworkChange: async ({ networkId }) => {
        console.log('[AE] Network changed:', networkId);
      },
      onAddressChange: async ({ current }) => {
        const newAddr = Object.keys(current)[0];
        if (newAddr) {
          setAddress(newAddr);
          setAeternityWalletState(newAddr, true);
        }
      },
      onDisconnect: () => {
        setAddress(null);
        setIsConnected(false);
        setAeternityWalletState(undefined, false);
      },
    });
    sdkRef.current = aeSdk;
    setSdk(aeSdk);

    return () => {
      if (detectorStopRef.current) {
        detectorStopRef.current();
      }
    };
  }, []);

  const connect = useCallback(async () => {
    const aeSdk = sdkRef.current;
    if (!aeSdk) return;

    try {
      const scannerConnection = new BrowserWindowMessageConnection();
      const stopDetector = walletDetector(scannerConnection, async ({ newWallet }) => {
        if (detectorStopRef.current) {
          detectorStopRef.current();
          detectorStopRef.current = null;
        }

        try {
          await aeSdk.connectToWallet(newWallet.getConnection());
          await aeSdk.subscribeAddress('subscribe', 'connected');
          const addresses = aeSdk.addresses();
          const connectedAddr = addresses[0];

          if (connectedAddr) {
            setAddress(connectedAddr);
            setIsConnected(true);
            setAeternityWalletState(connectedAddr, true);
          }
        } catch (err) {
          console.error('[AE] Failed to connect to wallet:', err);
        }
      });

      detectorStopRef.current = stopDetector;
    } catch (err) {
      console.error('[AE] Wallet detection failed:', err);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setAeternityWalletState(undefined, false);
  }, []);

  useEffect(() => {
    const handleConnect = () => {
      connect();
    };
    const handleDisconnect = () => {
      disconnect();
    };

    window.addEventListener('hyperlane:aeternity:connect', handleConnect);
    window.addEventListener('hyperlane:aeternity:disconnect', handleDisconnect);

    return () => {
      window.removeEventListener('hyperlane:aeternity:connect', handleConnect);
      window.removeEventListener('hyperlane:aeternity:disconnect', handleDisconnect);
    };
  }, [connect, disconnect]);

  useEffect(() => {
    if (!sdk) return;

    registerAeternityTxHandler(async ({ tx, chainName }) => {
      if (tx.type !== ProviderType.Aeternity) {
        throw new Error(`Expected Aeternity transaction, got ${tx.type}`);
      }

      const aeTx = tx.transaction;
      const contract = await Contract.initialize({
        ...sdk.getContext(),
        aci: [WARP_ROUTER_ACI],
        address: aeTx.contractId as `ct_${string}`,
      });

      const method = (contract as any)[aeTx.entrypoint];
      if (!method) {
        throw new Error(`Contract method "${aeTx.entrypoint}" not found`);
      }

      const result = await method(...aeTx.args, {
        ...(aeTx.options?.amount != null ? { amount: aeTx.options.amount.toString() } : {}),
        ...(aeTx.options?.gas != null ? { gas: aeTx.options.gas } : {}),
        omitUnknown: true,
      });

      const txHash = result.hash as string;

      return {
        hash: txHash,
        confirm: async () => ({
          type: ProviderType.Aeternity as const,
          receipt: {
            hash: txHash,
            blockHeight: result.blockHeight ?? 0,
            blockHash: result.blockHash ?? '',
            returnValue: result.decodedResult,
            gasUsed: result.gasUsed ?? 0,
            log: result.log ?? [],
          },
        }),
      };
    });

    return () => {
      registerAeternityTxHandler(undefined);
    };
  }, [sdk]);

  const value: AeternityWalletState = {
    sdk,
    address,
    isConnected,
    connect,
    disconnect,
  };

  return <AeternityWalletCtx.Provider value={value}>{children}</AeternityWalletCtx.Provider>;
}
