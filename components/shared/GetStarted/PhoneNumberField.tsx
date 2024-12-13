import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneNumberFieldProps } from "@/types/get-started";

export function PhoneNumberField({ control }: PhoneNumberFieldProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-lg font-semibold">
            PhoneNumber
          </FormLabel>
          <FormControl>
            <Input className="text-lg h-[56px] w-full"  {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
