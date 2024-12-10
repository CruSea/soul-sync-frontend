import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

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