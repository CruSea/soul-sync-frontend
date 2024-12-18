import { FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input"

interface RoleFieldProps {
  control: any;
  options: { label: string; value: string }[];
}

export function RoleField({ control, options }: RoleFieldProps) {
  return (
    <FormField
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <RadioGroup
              defaultValue="ceo/owner"
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

          {field.value === "other" && (
            <div className="!mt-5 space-x-4">
              <FormField
                control={control}
                name="otherRole"
                render={({ field }) => (
                  <FormItem className="w-input">
                    <FormLabel className="text-base font-semibold">
                      Input Your Role<span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm h-[56px]"
                        placeholder="Admin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
