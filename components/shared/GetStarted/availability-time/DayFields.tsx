import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { DayFieldProps } from "@/types/get-started";

export function DayFields({ control, options }: DayFieldProps) {
  return (
    <FormField
      control={control}
      name="Gender"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel className="font-medium text-base">Select Date</FormLabel>
          <FormControl>
            <RadioGroup
              defaultValue="male"
              onValueChange={field.onChange}
              className="w-full grid grid-rows-1 grid-cols-[auto_auto_auto_auto] gap-2"
            >
              {options.map((option) => (
                <FormItem key={option.value} className="flex gap-2  h-8 items-center">
                  <FormControl>
                    <RadioGroupItem className="" value={option.value} />
                  </FormControl>
                  <FormLabel className="text-base cursor-pointer pb-2">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
