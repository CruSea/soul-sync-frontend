"use client";

import {
  MentorAvailabilityFormSchema,
  MentorAvailabilityFormValues,
} from "@/types/get-started";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AvailabilityHeader from "./AvailabilityHeader";
import AvailabilityDialogContent from "./DialogContent";
import {
  Dialog
} from "./TimeDialog";

export function AvailabilityFields() {
  const availabilityForm = useForm<MentorAvailabilityFormValues>({
    resolver: zodResolver(MentorAvailabilityFormSchema),
    mode: "onChange",
    defaultValues: {
      availability: {
        monday: undefined,
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: undefined,
        saturday: undefined,
        sunday: undefined,
      },
    },
  });

  const [isErrorStates, setIsErrorStatesAction] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]); // gives us the error state for each day

  const [errorWhileAdd, setErrorWhileAdd] = useState(false); // shows an error next to the add button if there are incorrect timefields

  const hasError = isErrorStates.some((isError) => isError); // checks if there are errors in the tiemFields

  useEffect(() => {
    // hides the error next to add when all errors are fixed
    if (!hasError) {
      setErrorWhileAdd(false);
    }
  }, [isErrorStates]);

  const isDaySelected = () =>
    Object.values(availabilityForm.watch("availability")).some(Boolean); // gets the availabily array and checks if there is atleast one value truthy

  return (
    <FormProvider {...availabilityForm}>
      <div className="space-y-4 flex flex-col justify-center items-center">
        <div className="font-medium text-xl mr-auto">Availability Time</div>
        <Dialog>
          <AvailabilityHeader isDaySelected={isDaySelected()} />
          <AvailabilityDialogContent
            availabilityForm={availabilityForm}
            isDaySelected={isDaySelected()}
            setIsErrorStatesAction={setIsErrorStatesAction}
            isErrorStates={isErrorStates}
            errorWhileAdd={errorWhileAdd}
            setErrorWhileAdd={setErrorWhileAdd}
          />
        </Dialog>
      </div>
    </FormProvider>
  );
}
