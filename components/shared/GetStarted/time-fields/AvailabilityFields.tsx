import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { SpecializationFieldProps, AvailabilityFieldsProps } from "@/types/get-started";
import { HourField } from "../hourField";
import { DayPeriodField } from "../DayPeriod";
import { MinuteField } from "../MinuteField";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DayField } from "./DayFields";
import { getStartedForm } from "@/data/get-started-data";
import { TimeFields } from "./TimeFields";

export function AvailabilityFields({ form, errors, control }: AvailabilityFieldsProps) {
  return (
    <div className="space-y-4 flex flex-col justify-center items-center">
      <div className="font-medium text-xl mr-auto">Availability Time</div>
      <Dialog>
        <DialogTrigger className="w-4/5">
          <Button
            className="w-full h-14 flex text-base"
            variant="outline"
            type="button"
          >
            <LuPlus className="w-12 h-auto" /> Add Date and Time
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[600px] p-8 rounded-[8px] border-4 border-red-500 space-y-8">
          <DialogHeader className="text-start space-y-2">
            <DialogTitle className="text-2xl font-semibold">
              Add Availability Time
            </DialogTitle>
            <DialogDescription className="text-sm">
              Add your availability Time so we can schedule you with your Mentee
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <DayField control={control} options={getStartedForm.DayOptions} />
            <TimeFields control={control} errors={errors} form={form} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

