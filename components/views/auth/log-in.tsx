"use client";

import LoginPageCard from "@/components/shared/LoginPage/LoginPageCard";
import LoginPageSidebar from "@/components/shared/LoginPage/LoginPageSidebar";

const LogInView = () => {
  return (
    <div className="w-screen h-screen flex">
      <LoginPageSidebar />
      <LoginPageCard />
    </div>
  )
};

export default LogInView;