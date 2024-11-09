'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { initializeWeb3Auth } from '@/lib/web3auth';

interface UserData {
  name: string
  email: string
  xp: number
  level: number
}

interface AuthContextType {
  isAuthenticated: boolean
  user: UserData | null
  isLoading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  updateUserXP: (newXP: number) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserData | null>(null)
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null)

  const updateUserXP = async (newXP: number) => {
    if (!web3auth?.connected) return

    const userInfo = await web3auth.getUserInfo()
    const updatedUserData = {
      name: userInfo.name || 'Anonymous User',
      email: userInfo.email || '',
      xp: newXP,
      level: Math.floor(newXP / 1000) + 1
    }

    await web3auth.setUserMetadata({
      ...userInfo,
      xp: newXP.toString()
    })

    setUser(updatedUserData)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const web3AuthInstance = await initializeWeb3Auth();
        setWeb3Auth(web3AuthInstance);
        
        if (web3AuthInstance.connected) {
          const userInfo = await web3AuthInstance.getUserInfo();
          setUser(userInfo);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing Web3Auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }
    try {
      if (!web3auth.connected) {
        await web3auth.connect();
      }
      const userInfo = await web3auth.getUserInfo();
      setUser(userInfo);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.message.includes("not initialized")) {
        const web3AuthInstance = await initializeWeb3Auth();
        setWeb3Auth(web3AuthInstance);
        await web3AuthInstance.connect();
        const userInfo = await web3AuthInstance.getUserInfo();
        setUser(userInfo);
        setIsAuthenticated(true);
      }
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.error("Web3Auth not initialized");
      return;
    }
    try {
      await web3auth.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      isLoading,
      login,
      logout,
      updateUserXP
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 