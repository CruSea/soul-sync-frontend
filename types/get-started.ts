import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// the zod schema for the form One requirements
export const getStartedSchema = z.object({
  age: z
    .number()
    .min(14, { message: "Age must be at least 14." })
    .max(120, { message: "Age must be no more than 120." }),
  gender: z.enum(["male", "female"], {
    required_error: "You need to select your gender",
  }),
  location: z
    .string()
    .min(2, {
      message: "companyName must be at least 2 characters.",
    })
    .max(30, {
      message: "companyName must not be longer than 30 characters.",
    }),
  specialization: z
    .array(z.enum(["marriageCounseling", "discipleship", "spritual"]), {
      required_error: "You need to select at least one specialization",
    })
    .min(1, "You need to select at least one specialization"),
  startTime: z.string(), // temporary till time picker component is made
  EndTime: z.string(), // temporary till time picker component is made
});
