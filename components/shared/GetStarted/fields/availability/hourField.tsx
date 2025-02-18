import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./TimeCommand";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./TimePopover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { getStartedForm } from "@/data/get-started-data";
import { HourFieldProps } from "@/types/get-started";

export function HourField({ control, type, form, day, timeError }: HourFieldProps) {
  return (
    <FormField
      control={control}
      name={`availability.${day.value}${
        type === "start" ? ".startTime.hour" : ".endTime.hour"
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
                  <CommandEmpty>No hours found.</CommandEmpty>
                  <CommandGroup>
                    {getStartedForm.hours.map((hour) => (
                      <CommandItem
                        value={hour.label}
                        key={hour.value}
                        onSelect={() => {
                          form.setValue(
                            `availability.${day.value}${
                              type === "start"
                                ? ".startTime.hour"
                                : ".endTime.hour"
                            }`,
                            hour.value
                          ); // sets the hour value selected on the popout on the form
                          timeError()
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
