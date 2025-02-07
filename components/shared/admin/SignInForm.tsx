'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// the schema for how the form should be
const formSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  password: z
    .string({
      required_error: 'Please enter a password.',
    })
    .min(6, 'Password must be at least 6 characters long.'),
});

const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    // Define your form.
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
 
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col items-center justify-center gap-4"
      >
        <div className="flex flex-col items-center gap-2.5">
          <div className="font-bold text-3xl tracking-[-1px] mb-[-5px]">
            Login
          </div>
          <div className="text-slate-500 font-normal text-base">
            Login with your Google account to proceed
          </div>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="m@example.com"
                  className="w-96"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className="relative">
                <div className="relative w-96">
                  <Input placeholder="" {...field} />
                  <span className="absolute top-[-25px] right-3 cursor-pointer underline text-sm cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-96">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
