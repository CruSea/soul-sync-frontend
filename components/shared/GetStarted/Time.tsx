import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { TimePicker } from "./time-picker";


interface TimeFieldProps {
  control: any;
  type: "startTime" | "endTime"
}

export function Time({ control, type }: TimeFieldProps) {
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
            <TimePicker/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
