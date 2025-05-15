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
import { googleAuthCallback, selectAccount } from '@/actions/auth/auth';
import { googleAuthCallbackk } from '@/actions/auth/login';
import type { AccountInfo } from '@/types/users';

const LoginPageCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountInfo[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;

    const handleToken = async () => {
      const result = await googleAuthCallback(token);

      if (result.success) {
        if (result.requiresSelection && result.accounts) {
          setAccounts(result.accounts as AccountInfo[]);
          setAuthToken(token);
        } else {
          router.refresh();
        }
      }
    };

    handleToken();
  }, [searchParams]);

  const handleAccountSelect = async (accountId: string) => {
    if (!authToken) return;

    const result = await selectAccount(authToken, accountId);
    if (result.success) {
      router.refresh();
    }
  };

  const handleLogin = () => {
    googleAuthCallbackk();
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
        {accounts.length === 0 ? (
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
            {accounts.map((acc) => (
              <Button
                key={acc.id}
                className="w-96 h-10"
                variant="secondary"
                onClick={() => handleAccountSelect(acc.id)}
              >
                {acc.name} — {acc.role ?? ''}
              </Button>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginPageCard;
