import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrgFormOneValues } from "@/types/create-org";
import { Control } from "react-hook-form";

interface CompanyNameFieldProps {
  control: Control<createOrgFormOneValues>; // Replace with the appropriate type if available
}

export function CompanyNameField({ control }: CompanyNameFieldProps) {
  return (
    <FormField
      control={control}
      name="companyName"
      render={({ field }) => (
        <FormItem className="w-input">
          <FormLabel className="text-sm font-semibold">
            Company Name<span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <FormControl>
            <Input className="text-sm h-[56px]" placeholder="Great Commission" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
