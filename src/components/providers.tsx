"use client";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig, Chain } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const ethereumPlus: Chain = {
  id: 10023,
  name: "Ethereum+",
  network: "ethereumplus",
  nativeCurrency: {
    name: "Ethereum+",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://ethereumplus.pwrlabs.io/"],
    },
    public: {
      http: ["https://ethereumplus.pwrlabs.io/"],
    },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://ethplusexplorer.pwrlabs.io/" },
  },
  testnet: true,
};
const { chains, publicClient } = configureChains([ethereumPlus], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "scw",
  projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
  chains ,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
