"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import CreateOrgForm from "@/components/shared/CreateOrg/CreateOrgForm";
import CreateOrgSidebar from "@/components/shared/CreateOrg/CreateOrgSidebar"
import LandingPageHeader from "@/components/shared/LandingPage/LandingPageHeader"
import { createOrgFormSchema, createOrgFormValues, Page } from "@/types/create-org";
import { useState, useRef } from "react"
import { useForm } from "react-hook-form";

const CreateOrgView = () => {
  const [currentPage, setCurrentPage] = useState<Page>("first");
  const formRef = useRef<HTMLFormElement>(null)

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

  const handleSubmit = (data: any) => {
    console.log("Form submitted: ", data)
  }

  const triggerFormSubmit = () => {
    if (formRef.current) {
      console.log("the form has been found", formRef.current)
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true }))
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <LandingPageHeader showButton={false} />

      <div className="flex-1 flex w-screen">
        <CreateOrgSidebar triggerSubmit={triggerFormSubmit} currentPage={currentPage} handleSetCurrentPage={(page: Page) => setCurrentPage(page)} />

        {/* where the organization form will be added */}
        <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
          <CreateOrgForm mySubmit={handleSubmit} ref={formRef} currentPage={currentPage} form={form} />
        </div>
      </div>
    </div>
  )
}

export default CreateOrgView