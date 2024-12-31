'use client';

import { useForm } from 'react-hook-form';
import {
  getStartedAdminFormSchema,
  getStartedAdminFormValues,
} from '@/types/get-started';
import { getStartedMentorFormValues } from '@/types/get-started';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AgeField } from './AgeField';
import { GenderField } from './GenderField';
import { getStartedForm } from '@/data/get-started-data';
import { LocationField } from './LocationField';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PhoneNumberField } from './PhoneNumberField';

const GetStartedAdminForm = () => {
  const form = useForm<getStartedAdminFormValues>({
    resolver: zodResolver(getStartedAdminFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      age: undefined,
      gender: 'male',
      location: '',
      phoneNumber: '',
    },
  });

  const router = useRouter(); // Initialize the useRouter hook

  const onSubmit = (data: getStartedAdminFormValues) => {
    console.log('Admin form data', data);

    // Navigate to /mentor after form submission
    router.push('/admin'); // Use router.push for smooth navigation
  };

  const {
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex gap-16 w-full">
          <AgeField control={form.control} />
          <GenderField
            control={form.control}
            options={getStartedForm.genderOptions}
          />
        </div>
        <PhoneNumberField control={form.control} />
        <LocationField control={form.control} />
        <Button type="submit" className="w-4/5 mx-auto h-12 ">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default GetStartedAdminForm;
