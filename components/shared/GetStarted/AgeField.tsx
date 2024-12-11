import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


interface AgeFieldProps {
  control: any;
}

export function AgeField({ control }: AgeFieldProps) {
  return (
    <FormField
      control={control}
      name="age"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="text-lg font-semibold">
            Age
          </FormLabel>
          <FormControl>
            <Input type="number" className="text-sm h-14 w-28" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
