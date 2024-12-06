import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type Page = "first" | "second";

// Defining the structure of a SidebarPage object
export interface SidebarPage {
  heading: string;
  description: string;
  button1Text: string;
  button2Text: string;
  step: number;
}

// Defining the props for the CreateOrgSidebar component
export interface CreateOrgSidebarProps {
  currentPage: string; // The current active page (either "first" or "second")
  handleSetCurrentPage: (Page: Page) => void; // Function to update the current page
  handleSubmit: () => void;
}

// the zod schema for the form One requirements
export const createOrgFormOneSchema = z.object({
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
});

// the zod schema for the form Two requirements
export const createOrgFormTwoSchema = z.object({
  focus: z.enum(
    ["religion", "software", "engineering", "healthTech", "crypto"],
    {
      required_error: "You need to select size of your mentors",
    }
  ),
  role: z.enum(
    [
      "ceo/owner",
      "hrManager",
      "it/techManager",
      "it/techStaff",
      "hrStaff",
      "other",
    ],
    {
      required_error: "You need to select size of your mentors",
    }
  ),
  otherRole: z
  .string()
  .min(2, { message: "specificRole must be at least 2 characters." })
  .max(30, { message: "specificRole must not be longer than 30 characters." })
  .optional()
});

export type createOrgFormOneValues = z.infer<typeof createOrgFormOneSchema>;

export type createOrgFormTwoValues = z.infer<typeof createOrgFormTwoSchema>;

export interface OrgDataValues {
  companyName?: string; // Set an empty string to avoid uncontrolled behavior
  companyDomain?: string;
  size?: "1-10" | "11-50" | "51-100" | "101-500" | "501-1000" | "1000+";
  focus?: "religion" | "software" | "engineering" | "healthTech" | "crypto";
  role?:
    | "ceo/owner"
    | "hrManager"
    | "it/techManager"
    | "it/techStaff"
    | "hrStaff"
    | "other";
  otherRole?: string;
}

export interface CreateOrgFormProps {
  currentPage: string; // The current active page (either "first" or "second")
  formOne: UseFormReturn<createOrgFormOneValues>;
  formTwo: UseFormReturn<createOrgFormTwoValues>;
}

export interface FormOneProps {
  formOne: UseFormReturn<createOrgFormOneValues>;
}

export interface FormTwoProps {
  formTwo: UseFormReturn<createOrgFormTwoValues>;
}
