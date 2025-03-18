'use client';

import { AvailabilityDialogContentType } from '@/types/get-started';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './time-dialog';
import { DayField } from './day-fields';
import { getStartedForm } from '@/data/get-started-data';
import { TimeFields } from './time-fields';
import ErrorMessage from './error-handling';
import { useFormContext } from 'react-hook-form';
import { LuX } from 'react-icons/lu';
import ConfirmExit from './comfirm-exit';
import { useState } from 'react';

export default function AvailabilityDialogContent({
  form,
  isDaySelected,
  setIsErrorStatesAction,
  isErrorStates,
  errorWhileAdd,
  setErrorWhileAdd,
  setIsOpen,
  prevAvailability,
  setPrevAvailability,
}: AvailabilityDialogContentType) {
  const [isConfirmExit, setIsConfirmExit] = useState(false); // are we in the exit dialog
  const hasError = isErrorStates.some((isError) => isError); // checks if any of the days have errors

  const availability = useFormContext().getValues('availability');
  const AddAvailability = () => {
    // when addinf, if there is an error show text if not close
    if (hasError) {
      setErrorWhileAdd(true);
    } else {
      setIsOpen(false);
      setPrevAvailability(JSON.parse(JSON.stringify(availability)));
      // we set the confirmed availability that the user has set as the default we will return to
      // in the future if we discard changes on the availability dialog
    }
  };

  return (
    <DialogContent className="min-w-[680px] p-8 rounded-[8px] space-y-6">
      <DialogHeader className="relative text-start space-y-2">
        <LuX
          className="absolute right-[-15px] top-[-15px] cursor-pointer"
          size={20}
          onClick={() => setIsConfirmExit(true)}
        />
        <DialogTitle className="text-2xl font-semibold">
          Add Availability Time
        </DialogTitle>
        <DialogDescription className="text-sm">
          Add your availability Time so we can schedule you with your Mentee
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <DayField control={form.control} options={getStartedForm.DayOptions} />
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
          onClick={AddAvailability}
        >
          Add
        </Button>
        <ErrorMessage hasError={errorWhileAdd} />
      </div>
      <ConfirmExit
        isConfirmExit={isConfirmExit}
        setIsConfirmExit={setIsConfirmExit}
        setIsOpen={setIsOpen}
        prevAvailability={prevAvailability}
        setIsErrorStatesAction={setIsErrorStatesAction}
        form={form}
      />
    </DialogContent>
  );
}
