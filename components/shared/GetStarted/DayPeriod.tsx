import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./TimeCommand"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./TimePopover"
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react"
import { getStartedForm } from "@/data/get-started-data";
import { DayPeriodFieldProps } from "@/types/get-started";


export function DayPeriodField({ control, type, form, day }: DayPeriodFieldProps) {
  return (
    <FormField
      control={control}
      name={`availability.${day.value}${type === "start" ? ".startTime.dayPeriod" : ".endTime.dayPeriod" }`}
      render={({ field }) => (
        <FormItem className="flex flex-col ml-[3px]">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    " w-16 px-2 gap-0",
                    !field.value && "text-muted-foreground"
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
                  <CommandEmpty>No dayPeriod found.</CommandEmpty>
                  <CommandGroup>
                    {getStartedForm.dayPeriods.map((dayPeriod) => (
                      <CommandItem
                        value={dayPeriod.label}
                        key={dayPeriod.value}
                        onSelect={() => {
                          form.setValue(`availability.${day.value}${type === "start" ? ".startTime.dayPeriod" : ".endTime.dayPeriod" }`,dayPeriod.value)
                        }}
                        className=" cursor-pointer"
                      >
                        {dayPeriod.label}
                        <Check
                          className={cn(
                            "ml-[-5px]",
                            dayPeriod.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
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
