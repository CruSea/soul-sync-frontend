"use client";

import LoginPageCard from "@/components/shared/LoginPageCard";
import LoginPageSidebar from "@/components/shared/LoginPageSidebar";

const LogInView = () => {

  return (
    <div className="w-screen h-screen flex">


      <LoginPageSidebar />
      <LoginPageCard />
    </div>
  )
};

export default LogInView;