"use client"

import { Button } from "@/components/ui/button";

import { useSession, signIn, signOut } from "next-auth/react";

const SignInView = () => {

  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <div><h1>Welcome back</h1>
        <Button onClick={() => signOut()}>Sign out</Button></div>
      ) : (
        <div>
          <h1>You're not logged in</h1>
          <Button onClick={() => signIn("google")}>Sign up with Google</Button>
        </div>
      )}
    </div>
  )
}

export default SignInView;