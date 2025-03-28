import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './time-command';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './time-popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { getStartedForm } from '@/data/get-started-data';
import { getStartedMentorFormValues } from '@/types/get-started';
import { MinuteFieldProps } from '@/types/get-started';

export function MinuteField({
  control,
  type,
  form,
  day,
  timeError,
}: MinuteFieldProps) {
  return (
    <FormField
      control={control}
      name={`availability.${day.value}${
        type === 'start' ? '.startTime.minute' : '.endTime.minute'
      }`} // sets the name to the specific form data value
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
                  {field.value}

                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-16 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No minutes found.</CommandEmpty>
                  <CommandGroup>
                    {getStartedForm.minutes.map((minute) => (
                      <CommandItem
                        value={minute.label}
                        key={minute.value}
                        onSelect={() => {
                          form.setValue(
                            `availability.${day.value}${
                              type === 'start'
                                ? '.startTime.minute'
                                : '.endTime.minute'
                            }`,
                            minute.value
                          ); // sets the minute value selected on the popout on the form
                          timeError();
                        }}
                        className=" cursor-pointer"
                      >
                        {minute.label}
                        <Check
                          className={cn(
                            'ml-[-5px]',
                            minute.value === field.value
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
