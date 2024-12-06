"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import CreateOrgForm from "@/components/shared/CreateOrg/CreateOrgForm";
import CreateOrgSidebar from "@/components/shared/CreateOrg/CreateOrgSidebar"
import LandingPageHeader from "@/components/shared/LandingPage/LandingPageHeader"
import { createOrgFormOneSchema, createOrgFormOneValues, createOrgFormTwoSchema, createOrgFormTwoValues, OrgDataValues, Page } from "@/types/create-org";
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";


const CreateOrgView = () => {
  const [currentPage, setCurrentPage] = useState<Page>("first");
  const [orgData, setOrgData] = useState<OrgDataValues>({})
  const router = useRouter();

  const formOne = useForm<createOrgFormOneValues>({
    resolver: zodResolver(createOrgFormOneSchema),
    mode: "onChange",
    defaultValues: {
      companyName: "",   // Set an empty string to avoid uncontrolled behavior
      companyDomain: "",
      size: "1-10",
    },
  })

  const formTwo = useForm<createOrgFormTwoValues>({
    resolver: zodResolver(createOrgFormTwoSchema),
    mode: "onChange",
    defaultValues: {
      focus: "religion",
      role: "ceo/owner",
      otherRole: "none",
    },
  })

  useEffect(() => {
    setInterval(() => {
      console.log(orgData)
    }, 1000)
  }, [])

  const onSubmit = (data: createOrgFormTwoValues | createOrgFormOneValues) => {
    console.log("on submit called..................................................................................................................")
    setOrgData((prevOrgData) => ({ ...prevOrgData, ...data }))
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (currentPage === "first") {
      console.log("first page confirmation");

      try {
        // Await the form submission and validation
        await formOne.handleSubmit(onSubmit, (errors) => {
          // Handle validation failure (errors contain the validation issues)
          console.log('Form One validation failed:', errors);
          isValid = false;
        })();
      } catch (error) {
        console.error("Error during validation or submission:", error);
        isValid = false;
      }
    } else {
      try {
        // Await the form submission and validation for the second form
        await formTwo.handleSubmit(onSubmit, (errors) => {
          console.log('Form Two validation failed:', errors);
          isValid = false;
        })();
      } catch (error) {
        console.error("Error during validation or submission:", error);
        isValid = false;
      }
    }

    // Handle navigation or other actions based on the validation result
    if (isValid && currentPage === "first") {
      setCurrentPage("second");
    }

    if (isValid && currentPage === "second") {
      router.push('/admin');
    }
  }



  return (
    <div className="w-screen h-screen flex flex-col">
      <LandingPageHeader showButton={false} />

      <div className="flex-1 flex w-screen">
        <CreateOrgSidebar handleSubmit={() => handleSubmit()} currentPage={currentPage} handleSetCurrentPage={(page: Page) => setCurrentPage(page)} />

        {/* where the organization form will be added */}
        <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
          <CreateOrgForm currentPage={currentPage} formOne={formOne} formTwo={formTwo} />
        </div>
      </div>
    </div>
  )
}

export default CreateOrgView