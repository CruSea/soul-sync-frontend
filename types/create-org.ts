import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type Page = "first" | "second";

// Defining the structure of a SidebarPage object
export interface SidebarPage {
  heading: string,
  description: string,
  button1Text: string,
  button2Text: string,
  step: number
}

// Defining the props for the CreateOrgSidebar component
export interface CreateOrgSidebarProps {
  currentPage: string,   // The current active page (either "first" or "second")
  handleSetCurrentPage: (Page: Page) => void;   // Function to update the current page
  triggerSubmit: () => void
}

// the zod schema for the form requirements
export const createOrgFormSchema = z.object({
  companyName: z
    .string()
    .min(2, {
      message: "companyName must be at least 2 characters.",
    })
    .max(70, {
      message: "companyName must not be longer than 30 characters.",
    }),
  companyDomain: z
    .string()
    .min(2, {
      message: "companyDomain must be at least 2 characters.",
    })
    .max(70, {
      message: "companyDomain must not be longer than 30 characters.",
    }),
  size: z.enum(["1-10", "11-50", "51-100", "101-500", "501-1000", "1000+"], {
    required_error: "You need to select size of your mentors",
  }),
  focus: z.enum(["religion", "software", "engineering", "healthTech", "crypto"], {
    required_error: "You need to select size of your mentors",
  }),
  role: z.enum(["ceo/owner", "hrManager", "it/techManager", "it/techStaff", "hrStaff", "other"], {
    required_error: "You need to select size of your mentors",
  }),
  otherRole: z
    .string()
    .min(2, {
      message: "specificRole must be at least 2 characters.",
    })
    .max(30, {
      message: "specificRole must not be longer than 30 characters.",
    })
    .optional()
})

export type createOrgFormValues = z.infer<typeof createOrgFormSchema>


export interface CreateOrgFormProps {
  currentPage: string;   // The current active page (either "first" or "second")
  mySubmit: (data: createOrgFormValues) => void;
  form: UseFormReturn<createOrgFormValues>;
}

export interface FormOneProps {
  form: UseFormReturn<createOrgFormValues>;
}

export interface FormTwoProps {
  form: UseFormReturn<createOrgFormValues>;
}