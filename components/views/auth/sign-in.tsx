"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
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


const SignInView = () => {
  const { data: session } = useSession();

  // Access the Google tokens
  const accessToken = session?.access_token;
  const idToken = session?.id_token;

  return (
    <>
      {session ? (
        <div>
          <h1>Welcome back</h1>
          {accessToken && <p>Access Token: {accessToken}</p>}
          {idToken && <p>ID Token: {idToken}</p>}
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div className="w-screen h-screen flex">
          <div className="w-[643px] flex flex-col text-gray-900 bg-[#D9D9D9]  font-manrope">
            <Image
              src="/assets/signIn.png" // Path to your image in the `public` folder
              alt="Landing Page Image"
              width={643} // Desired width in pixels
              height={642} // Desired height in pixels
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
          <Card className="flex-1 flex flex-col items-center justify-center gap-1.5  ">
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="font-bold text-3xl tracking-[-1px] mb-[-5px]">
                Login
              </CardTitle>
              <CardDescription className="text-slate-500 font-normal text-base">Login with your Google account to proceed</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-1.5">
            <Button className="w-96 h-10 font-medium text-sm" onClick={() => signIn("google")}>Login with Google</Button>
            <div>Don’t have an account? <span className="underline cursor-pointer">Sign up</span></div>
            </CardContent>
          </Card>

          
        </div>
      )}
    </>
  );
};

export default SignInView;
