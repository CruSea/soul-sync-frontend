'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  
  useEffect(() => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
      setUser(storedUser);
    } 
  }, []);

  const login = async () => {
    // In a real app, you'd validate credentials against a backend
   
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    router.push('/log-in');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

