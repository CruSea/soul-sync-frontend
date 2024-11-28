import { Button } from "../ui/button"
import { useRouter } from 'next/navigation';
import { Page } from "@/components/views/auth/create-org";

// Defining the structure of a SidebarPage object
interface SidebarPage {
  heading: string,
  description: string,
  button1Text: string,
  button2Text: string,
  step: number
}

// Defining the SidebarPages object with two pages: first and second
const SidebarPages: {[key: string]: SidebarPage} = {
  first: {
    heading: "We need some of your Organization’s Information",
    description: "This data is needed so that we can easily provide solutions according to your company's capacity",
    button1Text: "Cancel",
    button2Text: "Continue",
    step: 1
  },
  second: {
    heading: "We can now create an Automation for your company.",
    description: "This data is needed so that we can easily provide solutions according to your company's capacity",
    button1Text: "Go Back",
    button2Text: "Sign up",
    step: 2
  }
} 

// Defining the props for the CreateOrgSidebar component
interface CreateOrgSidebarProps {
  currentPage: string,   // The current active page (either "first" or "second")
  handleSetCurrentPage: (Page: Page) => void;   // Function to update the current page
}

const CreateOrgSidebar: React.FC<CreateOrgSidebarProps> = ({ currentPage, handleSetCurrentPage }) => {

  const router = useRouter();

  // Function to handle the first button click
  const handleFirstButton = () => {
    if (currentPage == "first") {
      router.push('/log-in');   // Navigate to the login page if on the first page
    } else {
      handleSetCurrentPage("first");   // Go back to the first page if on the second page
    }
  };

  // Function to handle the second button click
  const handleSecondButton = () => {
    if (currentPage == "first") {
      handleSetCurrentPage("second");    // Move to the second page if currently on the first page
    } else {
      router.push('/admin');     // Navigate to the admin page if on the second page
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-14 justify-center items-center">
      {/* Sidebar container */}
      <div className="flex flex-col gap-14">
        {/* Step indicator */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="bg-gray-900 h-6 w-6 rounded-[3px]"></div>
            <div className="bg-neutral-300 h-6 w-6 rounded-[3px]"></div>
          </div>
          <div className="text-base font-bold text-slate-400">
            STEP {SidebarPages[currentPage].step} OF 2  {/* Display current step */}
          </div>
        </div>

         {/* Page content */}
        <div className="flex flex-col gap-4 items-start">
          <div className="font-bold text-3xl text-gray-900 max-w-[70%]">
          {SidebarPages[currentPage].heading}
          </div>
          <div className="text-sm text-neutral-400 max-w-[85%]">
          {SidebarPages[currentPage].description}
          </div>
          <div className="flex gap-4">
            <Button className="w-32 h-11 border-gray-900" variant="outline" onClick={handleFirstButton}>
            {SidebarPages[currentPage].button1Text}
            </Button>
            <Button className="w-32 h-11" variant="default" onClick={handleSecondButton} >
            {SidebarPages[currentPage].button2Text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOrgSidebar