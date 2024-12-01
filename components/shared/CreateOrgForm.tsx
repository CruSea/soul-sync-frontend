"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Separator } from "@/components/ui/separator"
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
import React from "react"

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
  role: z.enum(["ceo/owner", "hrManager", "it/techManager", "it/techStaff", "hrStaff", "other"], {
    required_error: "You need to select size of your mentors",
  }),
  otherRole: z
    .string()
    .min(2, {
      message: "specificRole must be at least 2 characters.",
    })
    .max(30, {
      message: "specificRole must not be longer than 30 characters.",
    })
    .optional()
})

type createOrgFormValues = z.infer<typeof createOrgFormSchema>


interface CreateOrgFormProps {
  currentPage: string,   // The current active page (either "first" or "second")
  mySubmit: (data: createOrgFormValues) => void
}

const sizeOptions = [
  { label: "1-10", value: "1-10" },
  { label: "11-50", value: "11-50" },
  { label: "51-100", value: "51-100" },
  { label: "101-500", value: "101-500" },
  { label: "501-1000", value: "501-1000" },
  { label: "1000+", value: "1000+" },
];

const focusOptions = [
  { label: "Religion", value: "religion" },
  { label: "Software", value: "software" },
  { label: "Engineering", value: "engineering" },
  { label: "Health Tech", value: "healthTech" },
  { label: "Crypto", value: "crypto" },
];

const roleOptions = [
  { label: "CEO/Owner", value: "ceo/owner" },
  { label: "HR Manager", value: "hrManager" },
  { label: "IT/Tech Manager", value: "it/techManager" },
  { label: "IT/Tech Staff", value: "it/techStaff" },
  { label: "HR Staff", value: "hrStaff" },
  { label: "Other", value: "other" },
];


const CreateOrgForm = React.forwardRef<HTMLFormElement, CreateOrgFormProps>(
  ({ mySubmit, currentPage }, ref) => {

    const form = useForm<createOrgFormValues>({
      resolver: zodResolver(createOrgFormSchema),
      mode: "onChange",
      defaultValues: {
        companyName: "",   // Set an empty string to avoid uncontrolled behavior
        companyDomain: "",
        size: "1-10",
        focus: "religion",
        role: "ceo/owner",
        otherRole: "",
      },
    })

    return (
      <div className="w-full h-full rounded-xl bg-white p-6">
        <Form {...form}>
          <form ref={ref} onSubmit={form.handleSubmit(mySubmit)} className="flex flex-col gap-5">
            {currentPage == "first" &&
              <>
                <div className="space-y-4">
                  <div className="font-bold text-xl">Type the name of your company</div>
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
                    <HiOutlineExclamationCircle size={20} /> We will create a unique company URL for you to log into Turumba
                  </div>
                </div>
                <div className="space-y-4">
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
                            {sizeOptions.map((option) => (
                              <FormItem
                                key={option.value}
                                className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]"
                              >
                                <FormLabel className="font-normal cursor-pointer">
                                  {option.label}
                                </FormLabel>
                                <FormControl>
                                  <RadioGroupItem
                                    className="!mt-0 cursor-pointer size-5"
                                    value={option.value}
                                  />
                                </FormControl>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            }
            {currentPage === "second" &&
              <>
                <div className="space-y-1.5">
                  <div className="text-sm text-slate-400">Type the name of your company</div>
                  <div className="font-bold text-xl m-0">Type the name of your company</div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="font-bold text-xl">Area of Focus?</div>
                  <FormField
                    control={form.control}
                    name="focus"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <RadioGroup
                            defaultValue="religion"
                            onValueChange={field.onChange}
                            className="grid grid-cols-[repeat(auto-fill,_minmax(142px,_1fr))] gap-4"
                          >
                            {focusOptions.map((option) => (
                              <FormItem
                                key={option.value}
                                className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]"
                              >
                                <FormLabel className="font-normal cursor-pointer">
                                  {option.label}
                                </FormLabel>
                                <FormControl>
                                  <RadioGroupItem
                                    className="!mt-0 cursor-pointer size-5"
                                    value={option.value}
                                  />
                                </FormControl>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <div className="font-bold text-xl">Your role?</div>
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <RadioGroup
                            defaultValue="ceo/owner"
                            onValueChange={field.onChange}
                            className="grid grid-cols-[repeat(auto-fill,_minmax(142px,_1fr))] gap-4"
                          >
                            {roleOptions.map((option) => (
                              <FormItem
                                key={option.value}
                                className="flex items-center justify-between border border-gray-900 h-14 p-5 rounded-[6px]"
                              >
                                <FormLabel className="font-normal cursor-pointer">
                                  {option.label}
                                </FormLabel>
                                <FormControl>
                                  <RadioGroupItem
                                    className="!mt-0 cursor-pointer size-5"
                                    value={option.value}
                                  />
                                </FormControl>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />

                        {field.value === "other" && (
                          <div className="!mt-5 space-x-4">
                            <FormField
                              control={form.control}
                              name="otherRole"
                              render={({ field }) => (
                                <FormItem className="w-input">
                                  <FormLabel className="text-base font-semibold">
                                    Input Your Role<span className="text-red-500 ml-1">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="text-sm h-[56px]"
                                      placeholder="Admin"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </>
            }
          </form>
        </Form>
      </div>
    )
  })

export default CreateOrgForm