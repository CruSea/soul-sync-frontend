'use client';

import { zodResolver } from '@hookform/resolvers/zod';

import LandingPageHeader from '@/components/shared/LandingPage/LandingPageHeader';
import {
  createOrgFormOneSchema,
  createOrgFormOneValues,
  createOrgFormTwoSchema,
  createOrgFormTwoValues,
  OrgDataValues,
  Page,
} from '@/types/create-org';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CreateOrgSidebar from '@/components/shared/admin/CreateOrg/CreateOrgSidebar';
import CreateOrgForm from '@/components/shared/admin/CreateOrg/CreateOrgForm';
import { endPoints } from '@/data/end-points';
import { useAuth } from '@/context/AuthContext';
import { createOrganazation } from '@/actions/admin/admin';
import { title } from 'process';
import { DessertIcon } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateOrgView = () => {
  const [currentPage, setCurrentPage] = useState<Page>('first');
  const [orgData, setOrgData] = useState<OrgDataValues>({});
const {user,notification}= useAuth();
  const formOne = useForm<createOrgFormOneValues>({
    resolver: zodResolver(createOrgFormOneSchema),
    mode: 'onChange',
    defaultValues: {
      companyName: '', // Set an empty string to avoid uncontrolled behavior
      companyDomain: '',
      size: '1-10',
    },
  });

  const formTwo = useForm<createOrgFormTwoValues>({
    resolver: zodResolver(createOrgFormTwoSchema),
    mode: 'onChange',
    defaultValues: {
      focus: 'religion',
      role: 'ceo/owner',
      otherRole: 'none',
    },
  });

  const onSubmit = async (
    data: createOrgFormTwoValues | createOrgFormOneValues
  ) => {
    setOrgData((prevOrgData: any) => {
      const updatedData = { ...prevOrgData, ...data };
      return updatedData;
    });

    if (currentPage === 'second') {
     
      if (!user) {
        console.error('user not found');
        return;
      }

      const userData = JSON.parse(user);

      const reqBody = {
        name: orgData.companyName,
        domain: orgData.companyDomain,
      };
const response = await createOrganazation(userData?.accounts[0]?.id,reqBody)
      if (response.ok) {
        notification({
          title:'Success!',
          description:'successfull Created!'
        })
       
      } else {
        console.error('Form Submission is wrong');
        notification({
          title:'Error!',
          description:'Form Submission is wrong!'
        })
        setCurrentPage('first');
      }
    }
  };

  const handleSubmit = async () => {
    let isValid = true; // Initialize a flag for validation

    if (currentPage === 'first') {
      try {
        // Await the form submission and validation
        await formOne.handleSubmit(onSubmit, (errors) => {
          // Handle validation failure
          console.log('Form One validation failed:', errors);
          isValid = false; // Set to false if validation fails
        })();
      } catch (error) {
        console.error('Error during validation or submission:', error);
        isValid = false;
      }
    } else {
      try {
        // Await the form submission and validation for the second form
        await formTwo.handleSubmit(onSubmit, (errors) => {
          console.log('Form Two validation failed:', errors);
          isValid = false; // Set to false if validation fails
        })();
      } catch (error) {
        console.error('Error during validation or submission:', error);
        isValid = false;
      }
    }

    return isValid; // Return the final validation status
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <LandingPageHeader showButton={false} />
      <div className="flex-1 flex w-screen">
        <CreateOrgSidebar
          handleSubmit={() => handleSubmit()}
          orgData={orgData}
          currentPage={currentPage}
          handleSetCurrentPage={(page: Page) => setCurrentPage(page)}
        />

        {/* where the organization form will be added */}
        <div className="flex-1 bg-gray-100 flex justify-center items-center p-10">
          <CreateOrgForm
            currentPage={currentPage}
            formOne={formOne}
            formTwo={formTwo}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateOrgView;
