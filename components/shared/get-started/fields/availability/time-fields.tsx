'use client';

import { TimeFieldsProps } from '@/types/get-started';
import { Time } from './time';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

export function TimeFields({
  control,
  form,
  options,
  setIsErrorStatesAction,
  isErrorStates,
}: TimeFieldsProps) {
  const availability = useFormContext().getValues('availability');

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Select Time:</div>
      <div className="pl-4 space-y-2">
        {options.map((day, index) =>
          availability?.[day.value] ? (
            <Time
              key={day.value}
              control={control}
              form={form}
              day={day}
              isError={isErrorStates[index]}
              setIsErrorAction={(
                value: boolean // sets the error state for each time component by the true / false value they input
              ) =>
                setIsErrorStatesAction((prevIsErrorStates) =>
                  prevIsErrorStates.map((isError, i) =>
                    i === index ? value : isError
                  )
                )
              }
            />
          ) : null
        )}
      </div>
    </div>
  );
}
