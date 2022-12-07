import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

export async function fetchEnsName(address) {
  const provider = await detectEthereumProvider();
  const ethereumProvider = new ethers.providers.Web3Provider(provider);
  return await ethereumProvider.lookupAddress(address);
}
