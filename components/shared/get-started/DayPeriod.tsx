import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './TimeCommand';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './TimePopover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { getStartedForm } from '@/data/get-started-data';
import { DayPeriodFieldProps } from '@/types/get-started';

export function DayPeriodField({ control, type, form }: DayPeriodFieldProps) {
  return (
    <FormField
      control={control}
      name={type === 'start' ? 'startDayPeriod' : 'endDayPeriod'}
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
                  {field.value
                    ? getStartedForm.dayPeriod.find(
                        (period) => period.value === field.value
                      )?.label
                    : 'Select period'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-16 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No dayPeriod found.</CommandEmpty>
                  <CommandGroup>
                    {getStartedForm.dayPeriod.map((period) => (
                      <CommandItem
                        value={period.label}
                        key={period.value}
                        onSelect={() => {
                          form.setValue(
                            type === 'start'
                              ? 'startDayPeriod'
                              : 'endDayPeriod',
                            period.value
                          );
                        }}
                        className=" cursor-pointer"
                      >
                        {period.label}
                        <Check
                          className={cn(
                            'ml-[-5px]',
                            period.value === field.value
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
