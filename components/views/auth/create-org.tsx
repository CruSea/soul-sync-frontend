"use client"

import CreateOrgSidebar from "@/components/shared/CreateOrgSidebar"
import LandingPageHeader from "@/components/shared/LandingPageHeader"
import { useState } from "react"

export type Page = "first" | "second";

const CreateOrgView = () => {
  const [currentPage, setCurrentPage] = useState<Page>("first");

  return (
    <div className="w-screen h-screen flex flex-col">
      <LandingPageHeader showButton={false} />

      <div className="flex-1 flex w-screen">
        <CreateOrgSidebar currentPage={currentPage} handleSetCurrentPage={(page) => setCurrentPage(page)}/>

        {/* where the organization form will be added */}
        <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
          <div className="w-full h-full rounded-xl bg-white">

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOrgView