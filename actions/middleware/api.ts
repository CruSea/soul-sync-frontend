'use server';
import { cookies } from 'next/headers';
import { logoutAction } from '../auth/login';
import { redirect } from 'next/navigation';

interface CustomError {
  message: string;
  response: {
    data: any;
  };
}

const apiCall = async ({
  url,
  method = 'GET',
  data = [],
  cache_type = 'no-cache',
  onStart,
  onSuccess,
  onError,
  tag,
}: {
  url: string;
  method?: string;
  data?: any;
  onStart?: () => void;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  cache_type?: 'no-cache' | 'force-cache' | 'no-store';
  tag: string;
}) => {
  // Call onStart callback if provided
  //if (onStart) onStart();
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  // Parse user info from cookie
  console.table(token);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined,
        cache: cache_type,
        next: { tags: [tag] },
      }
    );

    const responseData = await response.json();
    console.log('api', responseData, 'tag', tag);
    if (!response.ok) {
      throw new Error(responseData?.error.message || 'Something went wrong');
    }

    // Call onSuccess callback if provided
    //if (onSuccess) onSuccess(responseData);

    return responseData;
  } catch (error: unknown) {
    const errorMessage =
      (error as CustomError)?.message || 'An unexpected error occurred';
    // Call onError callback if provided
    //if (onError) onError(errorMessage);
    if (errorMessage === 'Invalid or expired token') {
      logoutAction();
      redirect('/log-in');
    }
    return {
      error: {
        title: 'Error!',
        description: errorMessage,
        duration: 3000,
      },
    };
  }
};

export default apiCall;
