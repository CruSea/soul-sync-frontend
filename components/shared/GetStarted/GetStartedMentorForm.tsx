'use client';

import { useForm } from 'react-hook-form';
import { getStartedMentorFormSchema } from '@/types/get-started';
import { getStartedMentorFormValues } from '@/types/get-started';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AgeField } from './AgeField';
import { GenderField } from './GenderField';
import { getStartedForm } from '@/data/get-started-data';
import { LocationField } from './LocationField';
import { SpecializationField } from './SpecializationField';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { HourField } from './hourField';
import { MinuteField } from './MinuteField';
import { DayPeriodField } from './DayPeriod';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { TimeFields } from './TimeFields';
import { endPoints } from '@/data/end-points';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const GetStartedMentorForm = () => {
  const form = useForm<getStartedMentorFormValues>({
    resolver: zodResolver(getStartedMentorFormSchema),
    mode: 'onChange',
    defaultValues: {
      age: 29,
      gender: 'male',
      location: '',
      specialization: ['marriageCounseling'],
      startHour: '09',
      startMinute: '00',
      startDayPeriod: 'AM',
      endHour: '05',
      endMinute: '00',
      endDayPeriod: 'PM',
    },
  });

  const router = useRouter(); // Initialize the useRouter hook

  const onSubmit = (data: getStartedMentorFormValues) => {
    const updateMentor = async () => {
      try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
          const userObj = JSON.parse(user);
          // const endPoint = `${BASE_URL}/${USER_URL}/${userObj.accounts[0].id}/user/${userObj.sub}`;
          const endPoint = `${BASE_URL}/${endPoints.mentor}/${userObj.sub}`;
          const reqBody = {
            age: data.age,
            location: data.location,
            expertise: data.specialization,
            gender: data.gender,
            availability: {
              monday: undefined,
              tuesday: {
                startTime: {
                  hour: data.startHour,
                  minute: data.startMinute,
                  dayPeriod: data.startDayPeriod,
                },
                endTime: {
                  hour: data.endHour,
                  minute: data.endMinute,
                  dayPeriod: data.endDayPeriod,
                },
              },
              wednesday: undefined,
              thursday: undefined,
              friday: undefined,
              saturday: undefined,
              sunday: undefined,
            },
          };

          const response = await fetch(endPoint, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
            body: JSON.stringify(reqBody),
          });

          if (!response.ok) {
            console.error('Failed to patch the data', response);
            throw new Error('Patch failed');
          }

          router.push('/mentor');
        } else {
          console.error('User or token not found');
          router.push('/log-in');
        }
      } catch (error) {
        console.error('Error: ', error);
        router.push('/log-in');
      }
    };

    updateMentor();
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
        <LocationField control={form.control} />
        <SpecializationField
          control={form.control}
          options={getStartedForm.specializationOptions}
        />
        <TimeFields form={form} errors={errors} />
        <Button type="submit" className="w-4/5 mx-auto h-12 ">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default GetStartedMentorForm;
