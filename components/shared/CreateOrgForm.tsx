"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
  size: z.enum(["1-10", "11-50", "51-100", "101-500", "501-1000", "1000+"], {
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
          <div className="font-bold text-xl">What is the size of Mentors of your company</div>
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <RadioGroup
                    defaultValue="1-10"
                    
                    onValueChange={field.onChange}
                    className="grid grid-cols-[repeat(auto-fill,_minmax(142px,_1fr))] gap-4"
                  >
                    <FormItem className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]" onClick={() => field.onChange("1-10")}>
                      <FormLabel className="font-normal cursor-pointer">
                        1-10
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem className="!mt-0 cursor-pointer" value="1-10" />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]" onClick={() => field.onChange("11-50")}>
                      <FormLabel className="font-normal cursor-pointer">
                        11-50
                      </FormLabel>
                      <FormControl>
                        <RadioGroupItem className="!mt-0 cursor-pointer" value="11-50" />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]" onClick={() => field.onChange("51-100")}>
                      <FormLabel className="font-normal cursor-pointer">51-100</FormLabel>
                      <FormControl>
                        <RadioGroupItem className="!mt-0 cursor-pointer" value="51-100" />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]" onClick={() => field.onChange("101-500")}>
                      <FormLabel className="font-normal cursor-pointer">101-500</FormLabel>
                      <FormControl>
                        <RadioGroupItem className="!mt-0 cursor-pointer" value="101-500" />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]" onClick={() => field.onChange("501-1000")}>
                      <FormLabel className="font-normal cursor-pointer">500-1000</FormLabel>
                      <FormControl>
                        <RadioGroupItem className="!mt-0 cursor-pointer" value="501-1000" />
                      </FormControl>
                    </FormItem>
                    <FormItem className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]" onClick={() => field.onChange("1000+")}>
                      <FormLabel className="font-normal cursor-pointer">1000+</FormLabel>
                      <FormControl>
                        <RadioGroupItem className="!mt-0 cursor-pointer" value="1000+" />
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default CreateOrgForm