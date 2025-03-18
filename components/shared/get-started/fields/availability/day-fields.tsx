import { Checkbox } from '@/components/ui/checkbox';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { defaultAvailabilityTime } from '@/data/get-started-data';

import { DayFieldProps } from '@/types/get-started';

export function DayField({ control, options }: DayFieldProps) {
  return (
    <FormField
      control={control}
      name="availability"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="text-lg font-semibold">Select Date</FormLabel>
          <FormControl>
            <div className="grid grid-rows-2 grid-cols-[auto_auto_auto_auto] gap-x-0 gap-y-3 px-8">
              {options.map((option) => {
                const checkboxId = `checkbox-${option.value}`;
                return (
                  <div key={option.value} className="flex items-center gap-2.5">
                    <Checkbox
                      id={checkboxId}
                      className="!bg-white !w-4 !h-4"
                      value={option.value}
                      checked={Boolean(field.value[option.value])}
                      onCheckedChange={(checked) => {
                        {
                          /* i had to json stringify and parse it because it was setting defaultAvailabilityTime to a the availability.day,
                          so when i changed availability.day, defaultAvailabilityTime would also change. i created a deep copy to 
                          make the two objects have different references in memory */
                        }
                        const newValue = checked
                          ? {
                              ...field.value,
                              [option.value]: JSON.parse(
                                JSON.stringify(defaultAvailabilityTime)
                              ),
                            }
                          : { ...field.value, [option.value]: undefined };
                        field.onChange(newValue);
                      }}
                    />
                    <FormLabel
                      htmlFor={checkboxId} // Associate label with checkbox
                      className="font-normal text-base cursor-pointer"
                    >
                      {option.label}
                    </FormLabel>
                  </div>
                );
              })}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
