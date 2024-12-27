"use client";

import {
  AvailabilityDialogContentType,
} from "@/types/get-started";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "./TimeDialog";
import { DayField } from "./DayFields";
import { getStartedForm } from "@/data/get-started-data";
import { TimeFields } from "./TimeFields";
import ErrorMessage from "./ErrorHandling";
import { useFormContext } from "react-hook-form";

export default function AvailabilityDialogContent({
  form,
  isDaySelected,
  setIsErrorStatesAction,
  isErrorStates,
  errorWhileAdd,
  setErrorWhileAdd,
  setIsOpen
}: AvailabilityDialogContentType ) {
  const hasError = isErrorStates.some((isError) => isError);

  const availability = useFormContext().getValues("availability");

  const closeDialog = () => {
    setIsOpen(false);
  }

  return (
    <DialogContent className="min-w-[680px] p-8 rounded-[8px] space-y-6">
      <DialogHeader className="text-start space-y-2">
        <DialogTitle className="text-2xl font-semibold">
          Add Availability Time
        </DialogTitle>
        <DialogDescription className="text-sm">
          Add your availability Time so we can schedule you with your Mentee
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <DayField
          control={form.control}
          options={getStartedForm.DayOptions}
        />
        {isDaySelected && (
          <TimeFields
            control={form.control}
            form={form}
            options={getStartedForm.DayOptions}
            setIsErrorStatesAction={setIsErrorStatesAction}
            isErrorStates={isErrorStates}
          />
        )}
      </div>
      <div className="flex gap-6 items-center">
        <Button
          className="p-4 w-fit font-medium text-base"
          onClick={() => (hasError ? setErrorWhileAdd(true) : closeDialog())}
        >
          Add
        </Button>
        <ErrorMessage hasError={errorWhileAdd} />
      </div>
    </DialogContent>
  );
}
