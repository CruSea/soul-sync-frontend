import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// the zod schema for the form One requirements
export const getStartedFormSchema = z.object({
  age: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)), // changes the shadcn input which returns a string for the age to a number
    z
      .number()
      .min(9, { message: "Age must be at least 9." })
      .max(120, { message: "Age must be no more than 120." })
  ),
  gender: z.enum(["male", "female"], {
    required_error: "You need to select your gender",
  }),
  location: z
    .string()
    .min(2, {
      message: "location must be at least 2 characters.",
    })
    .max(30, {
      message: "location must not be longer than 30 characters.",
    }),
  specialization: z
    .array(z.enum(["marriageCounseling", "discipleship", "spritual"]), { // is an array that can have one or more of these fields
      required_error: "You need to select at least one specialization",
    })
    .min(1, "You need to select at least one specialization"),
  startTime: z.string(), // temporary till time picker component is made
  EndTime: z.string(), // temporary till time picker component is made
});

export type getStartedFormValues = z.infer<typeof getStartedFormSchema>;
