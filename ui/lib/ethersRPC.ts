// lib/ethersRPC.ts
import { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

export default class RPC {
  provider: ethers.BrowserProvider.Web3Provider;
  constructor(provider: IProvider) {
    this.provider = new ethers.BrowserProvider.Web3Provider(provider);
  }

  async getAccounts() {
    const signer = this.provider.getSigner();
    return await signer.getAddress();
  }

  async getBalance() {
    const address = await this.getAccounts();
    return await this.provider.getBalance(address);
  }

  async sendTransaction() {
    const signer = this.provider.getSigner();
    const tx = await signer.sendTransaction({
      to: "0xYourRecipientAddress",
      value: ethers.utils.parseEther("0.01"),
    });
    return tx;
  }
}
