"use client"

import CreateOrgForm from "@/components/shared/CreateOrgForm";
import CreateOrgSidebar from "@/components/shared/CreateOrgSidebar"
import LandingPageHeader from "@/components/shared/LandingPageHeader"
import { Page } from "@/types/create-org";
import { useState, useRef } from "react"



const CreateOrgView = () => {
  const [currentPage, setCurrentPage] = useState<Page>("first");
  const formRef = useRef<HTMLFormElement>(null)

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
        <CreateOrgSidebar triggerSubmit={triggerFormSubmit} currentPage={currentPage} handleSetCurrentPage={(page: Page) => setCurrentPage(page)}/>

        {/* where the organization form will be added */}
        <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
          <CreateOrgForm mySubmit={handleSubmit} ref={formRef} currentPage={currentPage}/>
        </div>
      </div>
    </div>
  )
}

export default CreateOrgView