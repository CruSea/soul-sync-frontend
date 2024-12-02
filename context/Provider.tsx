"use client";
import { SessionProvider, useSession } from "next-auth/react";
export const NextAuthProvider = ({ children }:{children:React.ReactNode}) => {
 

  return <SessionProvider baseUrl={process.env.NEXTAUTH_URL} >
 
     <Auth>
          {children}

     </Auth>

    </SessionProvider>
};




function Auth({ children}:{children:React.ReactNode }) {
  const { status } = useSession()

  if (status === "loading") {
    return <div className="flex justify-center justify-items-center h-screen w-screen">
      <p>
        loading...
      </p>
    </div>
  }

  return children
}
