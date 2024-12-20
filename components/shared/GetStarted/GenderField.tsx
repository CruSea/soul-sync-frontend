import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";
import { GenderFieldProps } from "@/types/get-started";

export function GenderField({ control, options, className }: GenderFieldProps) {
  return (
    <FormField
      control={control}
      name="Gender"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="text-lg font-semibold">
            Gender
          </FormLabel>
          <FormControl>
            <RadioGroup
              defaultValue="male"
              onValueChange={field.onChange}
              className="flex gap-10 !font-normal text-2xl"
            >
              {options.map((option) => (
                <FormItem key={option.value} className="flex gap-2.5 h-14 items-center">
                  <FormControl>
                    <RadioGroupItem className="!mt-0 ml-auto !font-normal cursor-pointer" value={option.value} />
                  </FormControl>
                  <FormLabel className="text-base font-medium cursor-pointer pb-2">{option.label}</FormLabel>
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
