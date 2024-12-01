"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
    .max(30, {
      message: "companyName must not be longer than 30 characters.",
    }),
  companyDomain: z
    .string()
    .min(2, {
      message: "companyDomain must be at least 2 characters.",
    })
    .max(30, {
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
  specificRole: z
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
  })

  function onSubmit(data: createOrgFormValues) {

  }

  return (
    <div className="w-full h-full rounded-xl bg-white">

    </div>
  )
}

export default CreateOrgForm