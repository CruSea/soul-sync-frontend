"use client";

import LoginPageCard from "@/components/shared/LoginPage/LoginPageCard";
import LoginPageSidebar from "@/components/shared/LoginPage/LoginPageSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogInView = () => {
  const { user } = useAuth();
  const router =useRouter();
  useEffect(()=>{
    if(user) {
      router.push('/admin')
    }
  }, [user, router])

  return (
    <div className="w-screen h-screen flex">
      <LoginPageSidebar />
      <LoginPageCard />
    </div>
  )
};

export default LogInView;