'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { decodeToken } from '@/lib/utils';
import { endPoints } from '@/data/end-points';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoginPageCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token'); // Extract the token from the URL
    if (token) {
      const decoded = decodeToken(token);
      // You can store the token in state, sessionStorage, or make an API call with it

      // Store the decoded token in the cookie
      // Cookies.set("user", JSON.stringify(decoded), { expires: 7 }); // Cookie will expire in 7 days
      localStorage.setItem('user', JSON.stringify(decoded));
      localStorage.setItem('token', token);
    }
  }, [searchParams]);

  const handleLogin = () => {
    
    router.push(`${process.env.GOOGLE_CALLBACK_URL}`);
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
