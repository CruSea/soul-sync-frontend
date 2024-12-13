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
    .array(z.enum(["marriageCounseling", "discipleship", "spritual"]), {
      // is an array that can have one or more of these fields
      required_error: "You need to select at least one specialization",
    })
    .min(1, "You need to select at least one specialization"),
  startHour: z.string({
    required_error: "Please select hour time",
  }),
  startMinute: z.string({
    required_error: "Please select minute time",
  }),
  startDayPeriod: z.string({
    required_error: "Please select day period time",
  }),
  endHour: z.string({
    required_error: "Please select hour time",
  }),
  endMinute: z.string({
    required_error: "Please select minute time",
  }),
  endDayPeriod: z.string({
    required_error: "Please select day period time",
  }),
}).refine(
  (data) => {
    const parseTime = (hour: string, minute: string, period: string) => {
      const h = parseInt(hour, 10);
      const m = parseInt(minute, 10);
      return (period === "PM" ? (h % 12) + 12 : h % 12) * 60 + m;
    };

    const startTime = parseTime(
      data.startHour,
      data.startMinute,
      data.startDayPeriod
    );
    const endTime = parseTime(
      data.endHour,
      data.endMinute,
      data.endDayPeriod
    );

    return startTime < endTime;
  },
  {
    message: "",
    path: ["startHour"], // Attach to startHour or a relevant field
  }
);

export interface AgeFieldProps {
  control: any;
  className: string;
}

export interface DayPeriodFieldProps {
  control: any;
  type: "start" | "end";
  form: getStartedFormValues | any | undefined
}

export interface SpecializationFieldProps {
  control: any;
  options: { label: string; value: string }[];
}

export interface MinuteFieldProps {
  control: any;
  type: "start" | "end";
  form: getStartedFormValues | any | undefined
}

export interface LocationFieldProps {
  control: any;
}

export interface PhoneNumberFieldProps {
  control: any;
}

export interface HourFieldProps {
  control: any;
  type: "start" | "end";
  form: getStartedFormValues | any | undefined
}

export interface GenderFieldProps {
  control: any;
  options: { label: string; value: string }[];
}

export interface GetStartedProps {
  type: "admin" | "mentor"
}


export type getStartedFormValues = z.infer<typeof getStartedFormSchema>;