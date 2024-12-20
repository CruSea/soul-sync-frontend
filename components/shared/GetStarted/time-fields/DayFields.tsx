import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { DayFieldProps } from "@/types/get-started";

export function DayField({ control, options }: DayFieldProps) {
  return (
    <FormField
      control={control}
      name="Gender"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="text-lg font-semibold">
            Select Date
          </FormLabel>
          <FormControl>
            <RadioGroup
              defaultValue="male"
              onValueChange={field.onChange}
              className=" grid grid-rows-2 grid-cols-[auto_auto_auto_auto] gap-x-6 gap-y-0 px-8"
            >
              {options.map((option) => (
                <FormItem key={option.value} className="flex items-center gap-2.5">
                  <FormControl>
                    <RadioGroupItem className="cursor-pointer " value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal text-base cursor-pointer pb-2">{option.label}</FormLabel>
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
