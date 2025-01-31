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
  token = '',
  onStart,
  onSuccess,
  onError,
}: {
  url: string;
  method?: string;
  data?: any;
  token?: string;
  onStart?: () => void;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}) => {
  // Call onStart callback if provided
  //if (onStart) onStart();

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json();
    console.log('api', responseData);
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
      localStorage.removeItem('token');
      localStorage.clear();
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
