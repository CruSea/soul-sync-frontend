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


import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignInForm from '@/components/shared/SignInForm'


const SignInView = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // if signed in sends it to the mentor page
    if (session) {
      router.push("/mentor")
    } else {
      router.push("/sign-in-with")
    }
  }, [session])

  const handleSignIn = async () => {
    // opens the sign in with google modal 
    const result = await signIn("google", { redirect: false });
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[643px] flex flex-col text-gray-900 bg-[#D9D9D9]  font-manrope">
        <Image
          src="/assets/signIn.png"
          alt="Landing Page Image"
          width={643} 
          height={642} 
        />
        <div className="flex-1 flex flex-col gap-5 justify-center px-12 ">
          <div className="font-extrabold text-4xl flex gap-2 items-center tracking-[15px] ml-[-10px]"><PiAsteriskSimpleBold size={55}/> TURUMBA</div>
          <div className="font-bold text-4xl">
            <div>Mentor a Pupil</div>
            <div>Nurture a generation.</div>
          </div>
          <div className="font-normal text-lg">
            Connect and Mentor the young Generation anytime anywhere
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center flex-col gap-4">
        <SignInForm />
        <Button className="w-96 h-10 font-medium text-sm" variant="outline" onClick={handleSignIn}>Login with Google</Button> 
        <div className="text-sm text-center">Don’t have an account? <span className="underline">Sign up</span></div>

      </div>
    </div>
  )
};

export default SignInView;