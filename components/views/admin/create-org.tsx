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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateOrgSidebar from '@/components/shared/admin/CreateOrg/CreateOrgSidebar';
import CreateOrgForm from '@/components/shared/admin/CreateOrg/CreateOrgForm';
import { useAuth } from '@/context/AuthContext';
import { createOrganazation } from '@/actions/admin/admin';
import { Account, User_Info } from '@/types/users';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const CreateOrgView =  (user:User_Info) => {
  const [currentPage, setCurrentPage] = useState<Page>('first');
  const [orgData, setOrgData] = useState<OrgDataValues>({});
  const router = useRouter();

  const [clientUser, setClientUser] = useState(user);

  useEffect(() => {
    if (typeof window !== 'undefined' && !clientUser) {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('user-profile='))
        ?.split('=')[1];
      
      if (cookie) {
        try {
          setClientUser(JSON.parse(decodeURIComponent(cookie)));
        } catch (error) {
          console.error('Invalid user cookie');
          document.cookie = 'user-profile=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          router.push('/log-in');
        }
      }
    }
  }, [router, clientUser]);


  const userAccoutId:Account=JSON.parse(JSON.stringify(user))
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

      const reqBody = {
        name: orgData.companyName as string,
        domain: orgData.companyDomain as string,
      };
      const response = await createOrganazation(
        userAccoutId?.id,
        reqBody
      );
      if (response.ok) {
        toast({
          
            title: 'Success!',
          description: 'successfull Created!'
    
        });
      } else {
        console.error('Form Submission is wrong',response);
        toast({
      
          title: 'Error!',
          description: 'Form Submission is wrong!'
        });
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
