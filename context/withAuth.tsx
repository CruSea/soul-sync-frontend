'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextComponentType } from "next";

const withAuth = <P extends object>(
  WrappedComponent: NextComponentType<P>
): NextComponentType<P> => {
  const Auth: NextComponentType<P> = (props) => {
    const router = useRouter();
    const storedUser = localStorage.getItem('user');
    
    const isClient = typeof window !== "undefined";
    useEffect(() => {
    
      if (isClient && !storedUser) {
        const User = window.localStorage.getItem("user");
        if (!User) {
          void router.push("/log-in");
        }
      }
    }, [isClient, storedUser, router,storedUser]);

    if (!isClient || !storedUser) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  if (WrappedComponent.getInitialProps) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    Auth.getInitialProps = WrappedComponent.getInitialProps;
  }

  return Auth;
};

export default withAuth;