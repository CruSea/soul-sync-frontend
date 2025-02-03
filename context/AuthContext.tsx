"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { NotifyType } from "@/types/requests";
import {  User, User_Info } from "@/types/users";
interface AuthContextType {
  user: User_Info | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  notification: (message: NotifyType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User_Info | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");

    const storedUser: User_Info | null = storedUserString ? JSON.parse(storedUserString) : null;
  
// Fix: Ensure we extract the role from the first account

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async () => {
    // In a real app, you'd validate credentials against a backend
  };
const notification=async({message}:NotifyType)=>{
 if(message.title==='Error!')
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
    <AuthContext.Provider value={{ user, login, logout , notification}}>
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
