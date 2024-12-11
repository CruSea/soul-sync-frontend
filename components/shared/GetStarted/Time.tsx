import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { TimePicker } from "./time-picker";
import { record } from "zod";


interface TimeFieldProps {
  control: any;
  type: "startTime" | "endTime"
}

export type Time = {
  hours: string;
  minutes: string;
  dayPeriod: string;
}

export function Time({ control, type }: TimeFieldProps) {
  const logTime = (time: Time) => {
    if (type == "startTime"){
      console.log("Start time is ", time)
    } else {
      console.log("end time is ", time)
    }
  }

  return (
    <FormField
      control={control}
      name={type}
      render={({ field }) => (
        <FormItem className="w-24">
          <FormLabel className="text-base font-medium text-zinc-500">
            {type === "startTime" ? "Start Time" : "End Time"}
          </FormLabel>
          <FormControl>
            <TimePicker handleTime={logTime}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
