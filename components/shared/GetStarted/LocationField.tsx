import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LocationFieldProps {
  control: any;
}

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
            <Input className="text-lg h-[56px] w-full"  {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
