'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { decodeToken } from '@/lib/utils';
import { BASE_URL, endPoints } from '@/data/end-points';
import { User } from '@/types/users';
import { setAuthCookie } from '@/actions/auth/auth';

const LoginPageCard = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token'); // Extract the token from the URL
    if (token) {
      const decoded = decodeToken(token); // Ensure decodeToken is working properly
      const userInfo = decoded as User;
      // Fix: Correctly access the first account
      const user = {
        userName: userInfo?.email ?? 'Guest', // Default to "Guest" if no name
        accountId: userInfo?.accounts?.[0]?.id ?? null, // Ensure we access index 0
        roleId: userInfo?.accounts?.[0]?.role?.id ?? null, // Access role correctly
        roleName: userInfo?.accounts?.[0]?.role?.name ?? null,
        token,
      };
      setAuthCookie(user);

      console.log(user);

      // Fix: Store user properly in localStorage
    }
  }, [searchParams]);

  const handleLogin = () => {
    redirect(`${BASE_URL}/${endPoints.auth}`);
  };

  return (
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
        <Button
          className="w-96 h-10 font-medium text-sm"
          variant="default"
          onClick={handleLogin}
        >
          Login with Google
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginPageCard;
