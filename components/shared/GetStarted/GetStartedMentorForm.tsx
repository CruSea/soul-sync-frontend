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
        <div className="space-y-2">
          <div className="font-medium text-xl">Availability Time</div>
          <div className="flex gap-6">
            <div className="space-y-2">
              <div className="font-medium text-zinc-500 font-base">Start Time</div>
              <div className="flex gap-2 items-center">
                <HourField control={form.control} type="start" form={form} />
                <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">:</div>
                <MinuteField control={form.control} type="start" form={form} />
                <DayPeriodField control={form.control} type="start" form={form}/>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-zinc-500 font-base">End Time</div>
              <div className="flex gap-2 items-center">
                <HourField control={form.control} type="end" form={form} />
                <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">:</div>
                <MinuteField control={form.control} type="end" form={form} />
                <DayPeriodField control={form.control} type="end" form={form}/>
              </div>
            </div>
          </div>
          {errors.startHour && <p className="text-red-500">Start Time can't be less than End Time</p>}
        </div>
        <Button type="submit" className="w-4/5 mx-auto h-12 ">Submit</Button>
      </form>
    </Form>
  )
}

export default GetStartedMentorForm