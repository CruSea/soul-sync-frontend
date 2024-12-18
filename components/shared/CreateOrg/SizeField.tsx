import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SizeFieldProps {
  control: any;
  options: { label: string; value: string }[];
}

export function SizeField({ control, options }: SizeFieldProps) {
  return (
    <FormField
      control={control}
      name="size"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <RadioGroup
              defaultValue="1-10"
              onValueChange={field.onChange}
              className="grid grid-cols-[repeat(auto-fill,_minmax(142px,_1fr))] gap-4"
            >
              {options.map((option) => (
                <FormItem key={option.value} className="flex items-center border border-gray-900 h-14 p-5 rounded-[6px]">
                  <FormLabel className="font-normal cursor-pointer">{option.label}</FormLabel>
                  <FormControl>
                    <RadioGroupItem className="!mt-0 ml-auto cursor-pointer" value={option.value} />
                  </FormControl>
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
