// lib/ethersRPC.ts
import { IProvider } from "@web3auth/base";
import { ethers } from "ethers";

type Eip1193Provider = {
    request(args: { method: string; params?: Array<any> }): Promise<any>;
  };
  

export default class RPC {
  provider: ethers.BrowserProvider;

  constructor(provider: IProvider) {
    this.provider = new ethers.BrowserProvider(provider as unknown as Eip1193Provider);
  }

  async getAccounts() {
    const signer = await this.provider.getSigner();
    return await signer.getAddress();
  }

  async getBalance() {
    const address = await this.getAccounts();
    return await this.provider.getBalance(address);
  }

  async sendTransaction() {
    const signer = await this.provider.getSigner();
    const tx = await signer.sendTransaction({
      to: "0xYourRecipientAddress",
      value: ethers.parseEther("0.01"),  // Use `parseEther` directly
    });
    return tx;
  }
}
