import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK, IProvider, IAdapter } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

export const initializeWeb3Auth = async () => {
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
  
  const web3AuthOptions: Web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
  };

  const web3auth = new Web3Auth(web3AuthOptions);
  const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions });
  adapters.forEach((adapter: IAdapter<unknown>) => web3auth.configureAdapter(adapter));


  // Initialize modal before returning
  await web3auth.initModal();
  
  return web3auth;
};
