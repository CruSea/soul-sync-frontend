import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LocationFieldProps } from "@/types/get-started";

export function LocationField({ control }: LocationFieldProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-lg font-semibold">
            Location
          </FormLabel>
          <FormControl>
            <Input className="text-lg h-[56px] w-full" placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
