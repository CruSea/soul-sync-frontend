"use client";

import { useForm } from "react-hook-form";
import { getStartedMentorFormSchema } from "@/types/get-started";
import { getStartedMentorFormValues } from "@/types/get-started";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { AgeField } from "./AgeField";
import { GenderField } from "./GenderField";
import { getStartedForm } from "@/data/get-started-data";
import { LocationField } from "./LocationField";
import { SpecializationField } from "./SpecializationField";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { HourField } from "./hourField";
import { MinuteField } from "./MinuteField";
import { DayPeriodField } from "./DayPeriod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AvailabilityFields } from "./time-fields/AvailabilityFields";

const GetStartedMentorForm = () => {
  const form = useForm<getStartedMentorFormValues>({
    resolver: zodResolver(getStartedMentorFormSchema),
    mode: "onChange",
    defaultValues: {
      age: 29,
      gender: "male",
      location: "",
      specialization: ["marriageCounseling"],
      startHour: "09",
      startMinute: "00",
      startDayPeriod: "AM",
      endHour: "05",
      endMinute: "00",
      endDayPeriod: "PM",
    },
  });

  const router = useRouter(); // Initialize the useRouter hook

  const onSubmit = (data: getStartedMentorFormValues) => {
    console.log("Mentor form data", data);

    // Navigate to /mentor after form submission
    router.push("/mentor"); // Use router.push for smooth navigation
  };

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    console.log(errors);
  }, []);

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
        <AvailabilityFields
          form={form}
          errors={errors}
          control={form.control}
        />
        <Button type="submit" className="w-4/5 mx-auto h-12 mt-8 ">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default GetStartedMentorForm;
