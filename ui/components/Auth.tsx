// components/Auth.tsx
import { useEffect, useState } from "react";
import { initializeWeb3Auth } from "../lib/web3auth";
import { IProvider } from "@web3auth/base";

export default function Auth() {
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      const web3AuthInstance = await initializeWeb3Auth();
      await web3AuthInstance.initModal();
      setWeb3Auth(web3AuthInstance);

      if (web3AuthInstance.connected) {
        setProvider(web3AuthInstance.provider);
        setLoggedIn(true);
      }
    };
    init();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    const provider = await web3auth.connect();
    setProvider(provider);
    setLoggedIn(true);
  };

  const logout = async () => {
    if (!web3auth) return;
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };

  const getUserInfo = async () => {
    if (!web3auth) return;
    const userInfo = await web3auth.getUserInfo();
    console.log("User Info:", userInfo);
  };

  return (
    <div className="container">
      <h1>Web3Auth & Next.js Integration</h1>
      {loggedIn ? (
        <div>
          <button onClick={getUserInfo}>Get User Info</button>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
