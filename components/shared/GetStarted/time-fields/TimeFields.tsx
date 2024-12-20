import { DayFieldProps, TimeFieldsProps } from "@/types/get-started";
import { HourField } from "../hourField";
import { MinuteField } from "../MinuteField";
import { DayPeriodField } from "../DayPeriod";
import { Time } from "./Time";

export function TimeFields({ control, errors, form }: TimeFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Select Time:</div>
      <Time control={control} errors={errors} form={form} />
    </div>


  );
}
