"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// the zod schema for the form requirements
const createOrgFormSchema = z.object({
  companyName: z
    .string()
    .min(2, {
      message: "companyName must be at least 2 characters.",
    })
    .max(70, {
      message: "companyName must not be longer than 30 characters.",
    }),
  companyDomain: z
    .string()
    .min(2, {
      message: "companyDomain must be at least 2 characters.",
    })
    .max(70, {
      message: "companyDomain must not be longer than 30 characters.",
    }),
  size: z.enum(["1-10", "11-50", "51-100", "101-500", "500-1000", "1000+"], {
    required_error: "You need to select size of your mentors",
  }),
  focus: z.enum(["religion", "software", "engineering", "healthTech", "crypto"], {
    required_error: "You need to select size of your mentors",
  }),
  role: z.enum(["ceo/owner", "hrManager", "51-100", "it/techManager", "it/techStaff", "hrStaff", "other"], {
    required_error: "You need to select size of your mentors",
  }),
  otherRole: z
    .string()
    .min(2, {
      message: "specificRole must be at least 2 characters.",
    })
    .max(30, {
      message: "specificRole must not be longer than 30 characters.",
    }),
})

type createOrgFormValues = z.infer<typeof createOrgFormSchema>


const CreateOrgForm = () => {

  const form = useForm<createOrgFormValues>({
    resolver: zodResolver(createOrgFormSchema),
    mode: "onChange",
  })

  function onSubmit(data: createOrgFormValues) {
    console.log("the form data", JSON.stringify(data, null, 2))
  }

  return (
    <div className="w-full h-full rounded-xl bg-white p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <div className="font-bold text-xl">Type the name of your company</div>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="w-input">
                  <FormLabel className="text-sm font-semibold">Company Name<span className="text-red-500 ml-1">*</span></FormLabel>
                  <FormControl>
                    <Input className="text-sm h-[56px]" placeholder="Great Commission" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative flex gap-2.5 ">
              <FormField
                control={form.control}
                name="companyDomain"
                render={({ field }) => (
                  <FormItem className="w-input">
                    <FormLabel className="text-sm font-semibold">Company Domain<span className="text-red-500 ml-1">*</span></FormLabel>
                    <FormControl>
                      <Input className="text-sm h-[56px]" placeholder="gcmethiopia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute top-8 right-0 h-14 w-36 flex-1 flex items-center justify-center box-border border border-slate-300 font-semibold text-sm rounded-lg bg-gray-100">
              .Turumba.com
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-500 font-medium text-xs">
              <HiOutlineExclamationCircle size={20} /> We will create a unique company URL for you to log into Humanline
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateOrgForm