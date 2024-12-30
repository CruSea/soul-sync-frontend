"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import CreateOrgForm from "@/components/shared/CreateOrg/CreateOrgForm";
import CreateOrgSidebar from "@/components/shared/CreateOrg/CreateOrgSidebar"
import LandingPageHeader from "@/components/shared/LandingPage/LandingPageHeader"
import { createOrgFormOneSchema, createOrgFormOneValues, createOrgFormTwoSchema, createOrgFormTwoValues, OrgDataValues, Page } from "@/types/create-org";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";

const CreateOrgView = () => {
  const [currentPage, setCurrentPage] = useState<Page>("first");
  const [orgData, setOrgData] = useState<OrgDataValues>({})

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

  const onSubmit = (data: createOrgFormTwoValues | createOrgFormOneValues) => {
    console.log("onSubmit is called")
    setOrgData((prevOrgData) => {
      const updatedData = { ...prevOrgData, ...data };
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    let isValid = true;  // Initialize a flag for validation

    if (currentPage === "first") {
      console.log("first page confirmation");

      try {
        // Await the form submission and validation
        await formOne.handleSubmit(
          onSubmit,
          (errors) => {
            // Handle validation failure
            console.log("Form One validation failed:", errors);
            isValid = false;  // Set to false if validation fails
          }
        )();
      } catch (error) {
        console.error("Error during validation or submission:", error);
        isValid = false;
      }
    } else {
      try {
        // Await the form submission and validation for the second form
        await formTwo.handleSubmit(
          onSubmit,
          (errors) => {
            console.log("Form Two validation failed:", errors);
            isValid = false;  // Set to false if validation fails
          }
        )();
      } catch (error) {
        console.error("Error during validation or submission:", error);
        isValid = false;
      }
    }

    return isValid;  // Return the final validation status
  };

  useEffect(() => {
    if (currentPage === "second") {
      if (
        orgData?.companyName &&
        orgData?.companyDomain &&
        orgData?.size &&
        orgData?.focus &&
        orgData?.role &&
        orgData?.otherRole) {
        console.log("Sending org Data to backend:", orgData);
          // add sending functionallity to backend
      } else {
        console.log("organization data has missing values ")
      }
    }

  }, [orgData]);  // This will run whenever orgData changes




  return (
    <div className="w-screen h-screen flex flex-col">
      <LandingPageHeader showButton={false} />

      <div className="flex-1 flex w-screen">
        <CreateOrgSidebar handleSubmit={() => handleSubmit()} orgData={orgData} currentPage={currentPage} handleSetCurrentPage={(page: Page) => setCurrentPage(page)} />

        {/* where the organization form will be added */}
        <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
          <CreateOrgForm currentPage={currentPage} formOne={formOne} formTwo={formTwo} />
        </div>
      </div>
    </div>
  )
}

export default CreateOrgView