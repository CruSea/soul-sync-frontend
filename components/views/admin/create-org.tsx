'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import LandingPageHeader from '@/components/shared/landing-page/landing-page-header';
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
import { createOrganazation } from '@/actions/admin/admin';
import { Account } from '@/types/users';

import { toast } from '@/hooks/use-toast';
import { userProfile } from '@/actions/auth/login';

const CreateOrgView = () => {
  const [currentPage, setCurrentPage] = useState<Page>('first');
  const [orgData, setOrgData] = useState<OrgDataValues>({});
  const [clientUser, setClientUser] = useState<Account | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userAccoutId: Account = await userProfile();
      setClientUser(userAccoutId);
    };
    fetchUserProfile();
  }, []);

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
    setOrgData((prevOrgData: OrgDataValues) => {
      const updatedData = { ...prevOrgData, ...data };
      return updatedData;
    });

    if (currentPage === 'second') {
      if (!currentPage) {
        return;
      }
      const reqBody = {
        name: orgData.companyName as string,
        domain: orgData.companyDomain as string,
      };

      const response = await createOrganazation(
        clientUser?.id as string,
        reqBody
      );
      if (response) {
        toast({
          title: 'Success!',
          description: 'successfull Created!',
        });
      } else {
        toast({
          title: 'Error!',
          description: 'Form Submission is wrong!',
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
          isValid = false; // Set to false if validation fails
        })();
      } catch (error) {
        isValid = false;
      }
    } else {
      try {
        // Await the form submission and validation for the second form
        await formTwo.handleSubmit(onSubmit, (errors) => {
          isValid = false; // Set to false if validation fails
        })();
      } catch (error) {
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
