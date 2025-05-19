'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { decodeToken } from '@/lib/utils';
import { User } from '@/types/users';
import { setAuthCookie } from '@/actions/auth/auth';
import { googleAuthCallback } from '@/actions/auth/login';

const LoginPageCard = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const decoded = decodeToken(token);
      const userInfo = decoded as User;
      const user = {
        userId: userInfo?.sub ?? null,
        userName: userInfo?.email ?? 'Guest',
        accountId: userInfo?.accounts?.[0]?.id ?? null,
        roleId: userInfo?.accounts?.[0]?.role?.id ?? null,
        role: userInfo?.accounts?.[0]?.role?.name ?? null,
        imageUrl: userInfo?.imageUrl ?? null,
        token,
      };
      setAuthCookie(user);
    }
  }, [searchParams]);

  const handleLogin = () => {
    googleAuthCallback();
  };

  return (
    <Card className="w-full max-w-md md:max-w-lg scale-[1.05]">
      <CardHeader className="flex flex-col items-center pb-0">
        <CardTitle className="font-bold text-3xl tracking-[-1px] mb-[-5px]">
          Login
        </CardTitle>
        <CardDescription className="text-slate-500 font-normal text-lg text-center">
          Login with your Google account to proceed
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        <Button
          className="w-full h-12 font-semibold text-base"
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
