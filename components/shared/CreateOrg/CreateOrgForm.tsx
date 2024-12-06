"use client"

import {
  Form,
} from "@/components/ui/form"

import React from "react"
import { CreateOrgFormProps } from "@/types/create-org"
import FormOne from "./FormOne"
import FormTwo from "./FormTwo"

const CreateOrgForm = React.forwardRef<HTMLFormElement, CreateOrgFormProps>(
  ({ mySubmit, currentPage, form }, ref) => {

    return (
      <div className="w-full h-full rounded-xl bg-white p-6">
        <Form {...form}>
          <form ref={ref} onSubmit={form.handleSubmit(mySubmit)} className="flex flex-col gap-5">
            {currentPage == "first" &&
              <FormOne form={form} />
            }
            {currentPage === "second" &&
              <FormTwo form={form}/>
            }
          </form>
        </Form>
      </div>
    )
  })

export default CreateOrgForm