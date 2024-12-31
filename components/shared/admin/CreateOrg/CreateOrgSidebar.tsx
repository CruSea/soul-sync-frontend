import { useRouter } from 'next/navigation';
import { CreateOrgSidebarProps, Page, SidebarPage } from '@/types/create-org';
import { cn } from '@/lib/utils';
import { CreateOrgPage } from '@/content/page';
import { Button } from '@/components/ui/button';
import React from 'react';

const CreateOrgSidebar: React.FC<CreateOrgSidebarProps> = ({
  handleSubmit,
  currentPage,
  handleSetCurrentPage,
}) => {
  const router = useRouter();

  // Function to handle the first button click
  const handleFirstButton = () => {
    if (currentPage == 'first') {
      router.push('/log-in'); // Navigate to the login page if on the first page
    } else {
      handleSetCurrentPage('first');
    }
  };

  // Function to handle the second button click
  const handleSecondButton = async () => {
    const isValid = await handleSubmit(); // checks validation for page

    if (isValid) {
      if (currentPage === 'first') {
        handleSetCurrentPage('second');
      } else {
        router.push('/admin');
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-14 justify-center items-center">
      {/* Sidebar container */}
      <div className="flex flex-col gap-14 w-min">
        {/* Step indicator */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="bg-gray-900 h-6 w-6 rounded-[3px]"></div>
            <div
              className={cn(
                'bg-neutral-300 h-6 w-6 rounded-[3px]',
                currentPage === 'second' ? 'bg-gray-900' : ''
              )}
            ></div>
          </div>
          <div className="text-base font-bold text-slate-400">
            STEP {CreateOrgPage[currentPage].step} OF 2{' '}
            {/* Display current step */}
          </div>
        </div>

        {/* Page content */}
        <div className="flex flex-col gap-4 items-start w-[500px]">
          <div className="font-bold text-3xl text-gray-900 max-w-[85%]">
            {CreateOrgPage[currentPage].heading}
          </div>
          <div className="text-sm text-neutral-400">
            {CreateOrgPage[currentPage].description}
          </div>
          <div className="flex gap-4">
            <Button
              className="w-32 h-11 border-gray-900"
              variant="outline"
              onClick={handleFirstButton}
            >
              {CreateOrgPage[currentPage].button1Text}
            </Button>
            <Button
              className="w-32 h-11"
              variant="default"
              onClick={handleSecondButton}
            >
              {CreateOrgPage[currentPage].button2Text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrgSidebar;
