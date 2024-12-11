import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Define a Zod schema for the Time type
const timeSchema = z.object({
  hours: z
    .string()
    .regex(/^\d{1,2}$/, "Hours must be one or two digits.")
    .refine((val) => Number(val) >= 1 && Number(val) <= 12, "Hours must be between 1 and 12."),
  minutes: z
    .string()
    .regex(/^\d{2}$/, "Minutes must be two digits.")
    .refine((val) => Number(val) >= 0 && Number(val) <= 59, "Minutes must be between 0 and 59."),
  dayPeriod: z.enum(["AM", "PM"]),
});

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
  startTime: timeSchema, // temporary till time picker component is made
  endTime: timeSchema, // temporary till time picker component is made
});

export type getStartedFormValues = z.infer<typeof getStartedFormSchema>;
