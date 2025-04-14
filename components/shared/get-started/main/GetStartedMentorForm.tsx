'use client';

import { useForm } from 'react-hook-form';
import {
  getStartedMentorFormSchema,
  type getStartedMentorFormValues,
  type timeType,
} from '@/types/get-started';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AgeField } from '../fields/age-field';
import { GenderField } from '../fields/gender-field';
import { getStartedForm } from '@/data/get-started-data';
import { LocationField } from '../fields/location-field';
import { SpecializationField } from '../fields/specialization-field';
import { CapacityField } from '../fields/capacity-field';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AvailabilityFields } from '../fields/availability/availability-fields';
import { submitMentorForm } from '@/actions/admin/admin';
import type { Account } from '@/types/users';
import { userProfile } from '@/actions/auth/login';
import { toast } from '@/hooks/use-toast';

interface GetStartedMentorFormProps {
  initialUser?: Account; // Optional prop for SSR
}

const GetStartedMentorForm = ({ initialUser }: GetStartedMentorFormProps) => {
  const [loading, setLoading] = useState(false);
  const [clientUser, setClientUser] = useState<Account | null>(
    initialUser || null
  );
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) {
      const fetchUserProfile = async () => {
        try {
          const userAccount = await userProfile();
          setClientUser(userAccount);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [initialUser]);

  const defaultTime: timeType = {
    hour: getStartedForm.hours[0].value,
    minute: getStartedForm.minutes[0].value,
    dayPeriod: getStartedForm.dayPeriods[0].value,
  };

  const form = useForm<getStartedMentorFormValues>({
    resolver: zodResolver(getStartedMentorFormSchema),
    mode: 'onChange',
    defaultValues: {
      age: 29,
      gender: 'male',
      location: '',
      expertise: ['marriageCounseling'],
      capacity: 5,
      availability: {
        monday: undefined,
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: undefined,
        saturday: undefined,
        sunday: undefined,
      },
    },
  });

  const onSubmit = async (data: getStartedMentorFormValues) => {
    if (!clientUser?.id) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Please sign in to submit the mentor form.',
      });
      return;
    }

    try {
      setLoading(true);
      await submitMentorForm(data, clientUser.id);

      toast({
        variant: 'success',
        title: 'Profile Updated!',
        description: 'Your mentor profile has been successfully updated.',
      });

      router.push('/mentor');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description:
          'There was an error updating your profile. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

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
        <LocationField control={form.control} />
        <SpecializationField
          control={form.control}
          options={getStartedForm.specializationOptions}
        />
        <CapacityField control={form.control} />
        <AvailabilityFields form={form} />
        <Button
          type="submit"
          className="w-4/5 mx-auto h-12 mt-8"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
};

export default GetStartedMentorForm;
