"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { PiAsteriskSimpleBold } from "react-icons/pi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const LogInView = () => {

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[643px] flex flex-col text-gray-900 bg-[#D9D9D9]  font-manrope">
        <Image
          src="/assets/adminSignIn.png"
          alt="Admin SignIn Page Image"
          width={540}
          height={604}
          className="mx-auto"
        />

        <div className="flex-1 flex flex-col gap-5 justify-center px-12 border-t-[5px] border-black ">
          <div className="font-extrabold text-4xl flex gap-2 items-center tracking-[15px] ml-[-10px]"><PiAsteriskSimpleBold size={55} /> TURUMBA</div>
          <div className="font-bold text-4xl w-full whitespace-pre-line">
            <div>Connect with <br /> your audience Today.</div>
          </div>
          <div className="font-normal text-lg">
            Connect Mentors and Peoples anytime anywhere
          </div>
        </div>
      </div>

      <Card className="flex-1 flex items-center justify-center flex-col gap-6">
        <CardHeader className="flex flex-col items-center pb-0">
          <CardTitle className="font-bold text-3xl tracking-[-1px] mb-[-5px]">
            Login
          </CardTitle>
          <CardDescription className="text-slate-500 font-normal text-base">
            Login with your Google account to proceed
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-0">
          <Button className="w-96 h-10 font-medium text-sm" variant="outline">Login with Google</Button>
          <div className="text-sm text-center">Don’t have an Organization Platform?</div>
          <Button className="w-96 h-10 font-medium text-sm" variant="default">Sign Up</Button>
        </CardContent>
      </Card>
    </div>
  )
};

export default LogInView;