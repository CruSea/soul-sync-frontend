"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiAsteriskSimpleBold } from "react-icons/pi";
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
        <div className="w-screen h-screen flex font-manrope">
          <div className="w-[643px] flex flex-col text-gray-900 bg-[#D9D9D9] ">
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

          <Button onClick={() => signIn("google")}>Sign up with Google</Button>
        </div>
      )}
    </>
  );
};

export default SignInView;
