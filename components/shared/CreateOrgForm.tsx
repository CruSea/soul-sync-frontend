"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
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
import { SizeField } from "./SizeField"
import { CompanyNameField } from "./CompanyNameField"
import { CompanyDomainField } from "./CompanyDomainField"
import { FocusField } from "./FocusField"
import { RoleField } from "./RoleField"
import { CreateOrgFormProps, createOrgFormSchema, createOrgFormValues } from "@/types/create-org"
import { formOptions } from "@/data/create-org"


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
                  <CompanyNameField control={form.control} />
                  <div className="relative flex gap-2.5 ">
                  <CompanyDomainField control={form.control} />
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
                  <SizeField control={form.control} options={formOptions.sizeOptions} />
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
                  <FocusField control={form.control} options={formOptions.focusOptions} />
                </div>
                <div className="space-y-4">
                  <div className="font-bold text-xl">Your role?</div>
                  <RoleField control={form.control} options={formOptions.roleOptions} />
                </div>
              </>
            }
          </form>
        </Form>
      </div>
    )
  })

export default CreateOrgForm