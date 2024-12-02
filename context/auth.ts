import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export const useRequireAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (
      router.pathname === "/auth/login" ||
      router.pathname === "/auth/signup" ||
      router.pathname === "/auth/forgot"
    ) {
      router.push("/dashboard"); // Redirect to dashboard if authenticated
    }
   else
    if (!session) {
      router.push("/auth/login"); // Redirect to login page if not authenticated
    } 
  }, [session, status, router]);

  return session;
};
