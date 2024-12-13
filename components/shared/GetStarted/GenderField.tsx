import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenderFieldProps } from "@/types/create-org";

export function GenderField({ control, options }: GenderFieldProps) {
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
              className="flex gap-10"
            >
              {options.map((option) => (
                <FormItem key={option.value} className="flex gap-2.5 h-14 items-center">
                  <FormControl>
                    <RadioGroupItem className="!mt-0 ml-auto cursor-pointer" value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal text-lg cursor-pointer pb-2">{option.label}</FormLabel>
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
