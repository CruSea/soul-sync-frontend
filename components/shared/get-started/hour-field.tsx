import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/hourField.tsx
} from "./TimeCommand";
========
} from './time-command';
>>>>>>>> origin/release-01:components/shared/get-started/hour-field.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/hourField.tsx
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./TimePopover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { getStartedForm } from "@/data/get-started-data";
import { HourFieldProps } from "@/types/get-started";
========
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './time-popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { getStartedForm } from '@/data/get-started-data';
import { HourFieldProps } from '@/types/get-started';
>>>>>>>> origin/release-01:components/shared/get-started/hour-field.tsx

export function HourField({ control, type, form, day, timeError }: HourFieldProps) {
  return (
    <FormField
      control={control}
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/hourField.tsx
      name={`availability.${day.value}${
        type === "start" ? ".startTime.hour" : ".endTime.hour"
      }`} // sets the name to the specific form data value
========
      name={type === 'start' ? 'startHour' : 'endHour'}
>>>>>>>> origin/release-01:components/shared/get-started/hour-field.tsx
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    ' w-16 px-2 gap-0',
                    !field.value && 'text-muted-foreground'
                  )}
                >
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/hourField.tsx
                  {field.value}
========
                  {field.value
                    ? getStartedForm.hours.find(
                        (hour) => hour.value === field.value
                      )?.label
                    : 'Select hour'}
>>>>>>>> origin/release-01:components/shared/get-started/hour-field.tsx
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-16 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No hours found.</CommandEmpty>
                  <CommandGroup>
                    {getStartedForm.hours.map((hour) => (
                      <CommandItem
                        value={hour.label}
                        key={hour.value}
                        onSelect={() => {
                          form.setValue(
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/hourField.tsx
                            `availability.${day.value}${
                              type === "start"
                                ? ".startTime.hour"
                                : ".endTime.hour"
                            }`,
                            hour.value
                          ); // sets the hour value selected on the popout on the form
                          timeError()
========
                            type === 'start' ? 'startHour' : 'endHour',
                            hour.value
                          );
>>>>>>>> origin/release-01:components/shared/get-started/hour-field.tsx
                        }}
                        className=" cursor-pointer"
                      >
                        {hour.label}
                        <Check
                          className={cn(
                            'ml-[-5px]',
                            hour.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
