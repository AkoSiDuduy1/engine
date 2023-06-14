import {
  ThirdwebSDK,
  ChainOrRpc,
  AddressOrEns,
  SmartContract,
  BaseContractForAddress,
} from "@thirdweb-dev/sdk";

import { ContractAddress } from "@thirdweb-dev/generated-abis";

import { BaseContract } from "ethers";
import { getEnv } from "../loadEnv";

// Cache the SDK in memory so it doesn't get reinstantiated unless the server crashes
// This saves us from making a request to get the private key for reinstantiation on every request
const sdkMap: Partial<Record<ChainOrRpc, ThirdwebSDK>> = {};

export const getSDK = async (chainName: ChainOrRpc): Promise<ThirdwebSDK> => {
  if (!!sdkMap[chainName]) {
    return sdkMap[chainName] as ThirdwebSDK;
  }

  sdkMap[chainName] = ThirdwebSDK.fromPrivateKey(
    getEnv("WALLET_PRIVATE_KEY"),
    chainName,
    { thirdwebApiKey: getEnv("THIRDWEB_API_KEY") },
  );

  return sdkMap[chainName] as ThirdwebSDK;
};

export const getContractInstance = async <
  TContractAddress extends AddressOrEns | ContractAddress,
>(
  network: ChainOrRpc,
  contract_address: TContractAddress,
): Promise<
  TContractAddress extends ContractAddress
    ? SmartContract<BaseContractForAddress<TContractAddress>>
    : SmartContract<BaseContract>
> => {
  const sdk = await getSDK(network);
  const contract = await sdk.getContract(contract_address);
  return contract;
};