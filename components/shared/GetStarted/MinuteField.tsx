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


interface MinuteFieldProps {
  control: any;
  type: "start" | "end";
  form: getStartedFormValues | any | undefined
}

export function MinuteField({ control, type, form }: MinuteFieldProps) {
  return (
    <FormField
      control={control}
      name={type === "start" ? "startMinute" : "endMinute"}
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
                    ? formOptions.minutes.find(
                      (minute) => minute.value === field.value
                    )?.label
                    : "Select minute"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-16 p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No minutes found.</CommandEmpty>
                  <CommandGroup>
                    {formOptions.minutes.map((minute) => (
                      <CommandItem
                        value={minute.label}
                        key={minute.value}
                        onSelect={() => {
                          form.setValue(type === "start" ? "startMinute" : "endMinute", minute.value)
                        }}
                        className=" cursor-pointer"
                      >
                        {minute.label}
                        <Check
                          className={cn(
                            "ml-[-5px]",
                            minute.value === field.value
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
