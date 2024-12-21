import { getStartedForm } from "@/data/get-started-data";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const hourValues = getStartedForm.hours.map((hour) => hour.value) as [
  string,
  ...string[]
]; // type assertion ensures that it is a tuple with atleast one string
const minuteValues = getStartedForm.minutes.map((minute) => minute.value) as [
  string,
  ...string[]
];
const dayPeriodValues = getStartedForm.dayPeriods.map(
  (period) => period.value
) as [string, ...string[]];

// Define the time object schema
const timeSchema = z.object({
  hour: z.enum(hourValues), // 00 - 12
  minute: z.enum(minuteValues), // 00 | 05 | 10 ... || 55
  dayPeriod: z.enum(dayPeriodValues), // "AM" or "PM"
});

export const dailyAvailabilitySchema = z.object({
  startTime: timeSchema,
  endTime: timeSchema,
});

export type dailyAvailabilityType = z.infer<
  typeof dailyAvailabilitySchema
>;

// the zod schema for the form One requirements
export const getStartedMentorFormSchema = z
  .object({
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
    availability: z.object({
      monday: z.union([dailyAvailabilitySchema, z.undefined()]),
      tuesday: z.union([dailyAvailabilitySchema, z.undefined()]),
      wednesday: z.union([dailyAvailabilitySchema, z.undefined()]),
      thursday: z.union([dailyAvailabilitySchema, z.undefined()]),
      friday: z.union([dailyAvailabilitySchema, z.undefined()]),
      saturday: z.union([dailyAvailabilitySchema, z.undefined()]),
      sunday: z.union([dailyAvailabilitySchema, z.undefined()]),
    }),
    // startHour: z.string({
    //   required_error: "Please select hour time",
    // }),
    // startMinute: z.string({
    //   required_error: "Please select minute time",
    // }),
    // startDayPeriod: z.string({
    //   required_error: "Please select day period time",
    // }),
    // endHour: z.string({
    //   required_error: "Please select hour time",
    // }),
    // endMinute: z.string({
    //   required_error: "Please select minute time",
    // }),
    // endDayPeriod: z.string({
    //   required_error: "Please select day period time",
    // }),
  })
  // .refine(
  //   (data) => {
  //     const parseTime = (hour: string, minute: string, period: string) => {
  //       const h = parseInt(hour, 10);
  //       const m = parseInt(minute, 10);
  //       return (period === "PM" ? (h % 12) + 12 : h % 12) * 60 + m;
  //     };

  //     const startTime = parseTime(
  //       data.startHour,
  //       data.startMinute,
  //       data.startDayPeriod
  //     );
  //     const endTime = parseTime(
  //       data.endHour,
  //       data.endMinute,
  //       data.endDayPeriod
  //     );

  //     return startTime < endTime;
  //   },
  //   {
  //     message: "",
  //     path: ["startHour"], // Attach to startHour or a relevant field
  //   }
  // );

export type getStartedMentorFormValues = z.infer<
  typeof getStartedMentorFormSchema
>;

export const getStartedAdminFormSchema = z.object({
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
  phoneNumber: z.string().refine(
    (value) => {
      if (value.startsWith("+")) {
        return value.length === 13 && /^\+\d{12}$/.test(value); // Starts with + and followed by 12 digits
      } else {
        return value.length === 10 && /^\d{10}$/.test(value); // Exactly 10 digits with no +
      }
    },
    {
      message: "Phone number is incorrect",
    }
  ),
});

export type getStartedAdminFormValues = z.infer<
  typeof getStartedAdminFormSchema
>;

export interface AgeFieldProps {
  control: any;
  className?: string;
}

export interface DayPeriodFieldProps {
  control: any;
  type: "start" | "end";
  form: getStartedMentorFormValues | any | undefined;
  day: { label: string; value: string };
}

export interface SpecializationFieldProps {
  control: any;
  options: { label: string; value: string }[];
}

export interface MinuteFieldProps {
  control: any;
  type: "start" | "end";
  form: getStartedMentorFormValues | any | undefined;
  day: { label: string; value: string };
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
  form: getStartedMentorFormValues | any | undefined;
  day: { label: string; value: string };
}

export interface AvailabilityFieldsProps {
  form: getStartedMentorFormValues | any | undefined;
  control: any;
  errors: any;
}

export interface GenderFieldProps {
  control: any;
  options: { label: string; value: string }[];
  className?: string;
}

export interface DayFieldProps {
  control: any;
  options: { label: string; value: string }[];
}

export interface TimeFieldsProps {
  control: any;
  errors: any;
  form: getStartedMentorFormValues | any | undefined;
  options: { label: string; value: string }[];
}

export interface TimeProp {
  control: any;
  errors: any;
  form: getStartedMentorFormValues | any | undefined;
  day: { label: string; value: string };
}

export interface GetStartedProps {
  type: "admin" | "mentor";
}
