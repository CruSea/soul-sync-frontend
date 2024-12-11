"use client"

import { useForm } from "react-hook-form"
import { getStartedFormSchema } from "@/types/get-started"
import { getStartedFormValues } from "@/types/get-started"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { AgeField } from "./AgeField"
import { GenderField } from "./GenderField"
import { formOptions } from "@/data/get-started-data"
import { LocationField } from "./LocationField"
import { SpecializationField } from "./SpecializationField"

const GetStartedForm = () => {
  const form = useForm<getStartedFormValues>({
    resolver: zodResolver(getStartedFormSchema),
    mode: "onChange",
    defaultValues: {
      age: 29,
      gender: "male",
      location: "",
      specialization: ["marriageCounseling"],
      startTime: "",
      EndTime: ""
    }
  })

  const onSubmit = (data: getStartedFormValues) => {
    console.log("Mentor form data", data);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5">

        <div className="flex gap-16 w-full">
          <AgeField control={form.control} />
          <GenderField control={form.control} options={formOptions.genderOptions} />
        </div>
        <LocationField control={form.control} />
        <SpecializationField control={form.control} options={formOptions.specializationOptions} />
      </form>
    </Form>
  )
}

export default GetStartedForm