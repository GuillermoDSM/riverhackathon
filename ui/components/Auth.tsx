'use client'

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const { isAuthenticated, login, logout, getUserInfo } = useAuth();

  return (
    <div className="container">
      <h1>Web3Auth & Next.js Integration</h1>
      {isAuthenticated ? (
        <div>
          <Button onClick={getUserInfo}>Get User Info</Button>
          <Button onClick={logout}>Log Out</Button>
        </div>
      ) : (
        <Button onClick={login}>Connect Wallet</Button>
      )}
    </div>
  );
}
