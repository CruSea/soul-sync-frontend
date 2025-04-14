'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { decodeToken } from '@/lib/utils';
import { User, Account, User_Info } from '@/types/users';
import { setAuthCookie } from '@/actions/auth/auth';
import { googleAuthCallback } from '@/actions/auth/login';

const LoginPageCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loginToken, setLoginToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      const decoded = decodeToken(token) as User;
      if (!decoded?.accounts || decoded.accounts.length === 0) return;

      if (decoded.accounts.length === 1) {
        const singleUser: User_Info = {
          userId: decoded.sub ?? null,
          userName: decoded.email ?? null,
          accountId: decoded.accounts[0].id,
          roleId: decoded.accounts[0].role?.id ?? null,
          role: decoded.accounts[0].role?.name ?? null,
          imageUrl: decoded.imageUrl ?? null,
          token,
        };
        setAuthCookie(singleUser);
        router.refresh();
      } else {
        setUserInfo(decoded);
        setLoginToken(token);
      }
    }
  }, [searchParams]);

  const handleAccountSelect = (account: Account) => {
    if (!userInfo || !loginToken) return;

    const user: User_Info = {
      userId: userInfo.sub ?? null,
      userName: userInfo.email ?? null,
      accountId: account.id,
      roleId: account.role?.id ?? null,
      role: account.role?.name ?? null,
      imageUrl: userInfo.imageUrl ?? null,
      token: loginToken,
    };

    setAuthCookie(user);
    router.refresh();
  };

  const handleLogin = () => {
    googleAuthCallback();
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
        {!userInfo ? (
          <Button
            className="w-96 h-10 font-medium text-sm"
            variant="default"
            onClick={handleLogin}
          >
            Login with Google
          </Button>
        ) : (
          <>
            <p className="text-center">Choose an account to continue</p>
            {userInfo.accounts?.map((acc) => (
              <Button
                key={acc.id}
                className="w-96 h-10"
                variant="secondary"
                onClick={() => handleAccountSelect(acc)}
              >
                {acc.name} — {acc.role?.name}
              </Button>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginPageCard;
