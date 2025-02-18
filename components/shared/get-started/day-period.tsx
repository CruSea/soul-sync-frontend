import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/DayPeriod.tsx
} from "./TimeCommand";
========
} from './time-command';
>>>>>>>> origin/release-01:components/shared/get-started/day-period.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/DayPeriod.tsx
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./TimePopover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { getStartedForm } from "@/data/get-started-data";
import { DayPeriodFieldProps } from "@/types/get-started";

export function DayPeriodField({
  control,
  type,
  form,
  day,
  timeError
}: DayPeriodFieldProps) {
  return (
    <FormField
      control={control}
      name={`availability.${day.value}${
        type === "start" ? ".startTime.dayPeriod" : ".endTime.dayPeriod"
      }`}
========
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './time-popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { getStartedForm } from '@/data/get-started-data';
import { DayPeriodFieldProps } from '@/types/get-started';

export function DayPeriodField({ control, type, form }: DayPeriodFieldProps) {
  return (
    <FormField
      control={control}
      name={type === 'start' ? 'startDayPeriod' : 'endDayPeriod'}
>>>>>>>> origin/release-01:components/shared/get-started/day-period.tsx
      render={({ field }) => (
        <FormItem className="flex flex-col ml-[3px]">
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
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/DayPeriod.tsx
                  {field.value}
========
                  {field.value
                    ? getStartedForm.dayPeriod.find(
                        (period) => period.value === field.value
                      )?.label
                    : 'Select period'}
>>>>>>>> origin/release-01:components/shared/get-started/day-period.tsx
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-16 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No dayPeriod found.</CommandEmpty>
                  <CommandGroup>
                    {getStartedForm.dayPeriods.map((dayPeriod) => (
                      <CommandItem
                        value={dayPeriod.label}
                        key={dayPeriod.value}
                        onSelect={() => {
                          form.setValue(
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/DayPeriod.tsx
                            `availability.${day.value}${
                              type === "start"
                                ? ".startTime.dayPeriod"
                                : ".endTime.dayPeriod"
                            }`,
                            dayPeriod.value
                          ); // sets the name to the specific form data value
                          timeError()
========
                            type === 'start'
                              ? 'startDayPeriod'
                              : 'endDayPeriod',
                            period.value
                          );
>>>>>>>> origin/release-01:components/shared/get-started/day-period.tsx
                        }}
                        className=" cursor-pointer"
                      >
                        {dayPeriod.label}
                        <Check
                          className={cn(
<<<<<<<< HEAD:components/shared/GetStarted/fields/availability/DayPeriod.tsx
                            "ml-[-5px]",
                            dayPeriod.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
========
                            'ml-[-5px]',
                            period.value === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
>>>>>>>> origin/release-01:components/shared/get-started/day-period.tsx
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
