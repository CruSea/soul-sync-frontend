
import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AvailabilityFieldProps } from "@/types/get-started";
import { Button } from "@/components/ui/button";
import { getStartedForm } from "@/data/get-started-data";
import { DayFields } from "./DayFields";

export function AvailabilityField({
  control,
  options,
}: AvailabilityFieldProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="h-14 text-base">
          <LuPlus />
          Add Date and Time
        </Button>
      </DialogTrigger>
      <DialogContent className=" px-8">
        <DialogHeader className="">
          <DialogTitle className="font-semibold text-start text-2xl">
            Add Availability Time
          </DialogTitle>
          <DialogDescription className="text-base text-start">
            Add your availability Time so we can schedule you with your Mentee
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <DayFields control={control} options={getStartedForm.dayOptions}/>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
