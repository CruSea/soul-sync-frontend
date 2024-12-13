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
import { formOptions } from "@/data/get-started-data";
import { getStartedFormValues } from "@/types/get-started";


interface HourFieldProps {
  control: any;
  type: "start" | "end";
  form: getStartedFormValues | any | undefined
}

export function HourField({ control, type, form }: HourFieldProps) {
  return (
    <FormField
      control={control}
      name={type === "start" ? "startHour" : "endHour"}
      render={({ field }) => (
        <FormItem className="flex flex-col">
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
                  {field.value
                    ? formOptions.hours.find(
                      (hour) => hour.value === field.value
                    )?.label
                    : "Select hour"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-16 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No hours found.</CommandEmpty>
                  <CommandGroup>
                    {formOptions.hours.map((hour) => (
                      <CommandItem
                        value={hour.label}
                        key={hour.value}
                        onSelect={() => {
                          form.setValue(type === "start" ? "startHour" : "endHour", hour.value)
                        }}
                        className=" cursor-pointer"
                      >
                        {hour.label}
                        <Check
                          className={cn(
                            "ml-[-5px]",
                            hour.value === field.value
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
