import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface SpecializationFieldProps {
  control: any;
  options: { label: string; value: string }[];
}

export function SpecializationField({ control, options }: SpecializationFieldProps) {
  return (
    <FormField
      control={control}
      name="specialization"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-lg font-semibold">Specialization</FormLabel>
          <FormControl>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(175px,_1fr))] gap-2">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center"
                >
                  
                    <Checkbox
                      className="!bg-white !w-4 !h-4"
                      value={option.value}
                      checked={field.value?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), option.value]
                          : field.value?.filter((val: string) => val !== option.value);
                        field.onChange(newValue);
                      }

                      }
                    />
                  

                  <FormLabel className="ml-3 font-medium text-lg cursor-pointer">
                    {option.label}
                  </FormLabel>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
