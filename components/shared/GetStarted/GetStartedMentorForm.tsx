"use client"

import { useForm } from "react-hook-form"
import { getStartedFormSchema } from "@/types/get-started"
import { getStartedFormValues } from "@/types/get-started"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { AgeField } from "./AgeField"
import { GenderField } from "./GenderField"
import { getStartedForm } from "@/data/get-started-data"
import { LocationField } from "./LocationField"
import { SpecializationField } from "./SpecializationField"
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { HourField } from "./hourField"
import { MinuteField } from "./MinuteField"
import { DayPeriodField } from "./DayPeriod"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { TimeFields } from "./TimeFields"

const GetStartedMentorForm = () => {
  const form = useForm<getStartedFormValues>({
    resolver: zodResolver(getStartedFormSchema),
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
      endDayPeriod: "PM"
    }
  })

  const router = useRouter();  // Initialize the useRouter hook

  const onSubmit = (data: getStartedFormValues) => {
    console.log("Mentor form data", data);
    
    // Navigate to /mentor after form submission
    router.push("/mentor");  // Use router.push for smooth navigation
  };

  const { formState: { errors } } = form;

  useEffect(() => {
    console.log(errors)
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex gap-16 w-full">
          <AgeField control={form.control} />
          <GenderField control={form.control} options={getStartedForm.genderOptions} />
        </div>
        <LocationField control={form.control} />
        <SpecializationField control={form.control} options={getStartedForm.specializationOptions} />
        <TimeFields form={form} errors={errors} />
        <Button type="submit" className="w-4/5 mx-auto h-12 ">Submit</Button>
      </form>
    </Form>
  )
}

export default GetStartedMentorForm