import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { getStartedForm } from "@/data/get-started-data";
import { DayFieldProps } from "@/types/get-started";

export function DayField({ control, options }: DayFieldProps) {
  return (
    <FormField
      control={control}
      name="availability"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="text-lg font-semibold">Select Date</FormLabel>
          <FormControl>
            <div className="grid grid-rows-2 grid-cols-[auto_auto_auto_auto] gap-x-0 gap-y-3 px-8">
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2.5">
                  <Checkbox
                    className="!bg-white !w-4 !h-4"
                    value={option.value}
                    checked={Boolean(field.value[option.value])}
                    onCheckedChange={(checked) => {
                      const newValue = checked ? {...field.value, [option.value]: getStartedForm.defaultAvailabilityTime} : {...field.value, [option.value]: undefined }
                      field.onChange(newValue)
                    }}
                  />
                  <FormLabel className="font-normal text-base cursor-pointer">
                    {option.label}
                  </FormLabel>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
