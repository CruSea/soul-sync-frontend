"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { NotifyType } from "@/types/requests";
interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  notification: (message: NotifyType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async () => {
    // In a real app, you'd validate credentials against a backend
  };
const notification=async(message:NotifyType)=>{
  toast({
    title: message.title,
    description: message.description,
    duration: 3000,
  }
  )
}
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem('token')
    localStorage.clear()
    router.push("/log-in");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout ,notification}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
