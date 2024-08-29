import { Contract, providers } from "ethers";
import { Constants } from "userop";
import {
  BUNDLER_RPC_URL,
  ENTRY_POINT_ABI,
  WALLET_ABI,
  WALLET_FACTORY_ABI,
  WALLET_FACTORY_ADDRESS,
} from "./constants";

export const provider = new providers.JsonRpcProvider(BUNDLER_RPC_URL);
const signer = provider.getSigner();

export const entryPointContract = new Contract(
  "0x3ae87405c3e7c95309294c0086e22ed2ea872126",
  ENTRY_POINT_ABI,
  signer
);

export const walletFactoryContract = new Contract(
  WALLET_FACTORY_ADDRESS,
  WALLET_FACTORY_ABI,
  signer
);

export const getWalletContract = (walletAddress: string) => {
  return new Contract(walletAddress, WALLET_ABI, provider);
};
