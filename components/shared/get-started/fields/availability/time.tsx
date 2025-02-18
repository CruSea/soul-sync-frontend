"use client";

import { TimeProp } from "@/types/get-started";
import { HourField } from "./hour-field";
import { MinuteField } from "./minute-field";
import { DayPeriodField } from "./day-period";
import { parseTime } from "@/lib/utils";
import { useState } from "react";

export function Time({ control, form, day, setIsErrorAction, isError }: TimeProp) {
  const dayAvailability = form.watch(`availability.${day.value}`);

  const timeError = () => {
    if (!dayAvailability) return true; // Skip days with no availability
    const startTime = parseTime(dayAvailability.startTime);
    const endTime = parseTime(dayAvailability.endTime);
    setIsErrorAction(startTime >= endTime);
  };

  return (
    <div className="flex flex-col gap-0.5">
      <div className="font-medium font-sm">{day.label}</div>
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <div className="font-medium text-zinc-500 text-sm">Start Time</div>
          <div className="flex gap-2 items-center">
            <HourField
              control={control}
              type="start"
              form={form}
              day={day}
              timeError={timeError}
            />
            <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
              :
            </div>
            <MinuteField
              control={control}
              type="start"
              form={form}
              day={day}
              timeError={timeError}
            />
            <DayPeriodField
              control={control}
              type="start"
              form={form}
              day={day}
              timeError={timeError}
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="font-medium text-zinc-500 text-sm">End Time</div>
          <div className="flex gap-2 items-center">
            <HourField
              control={control}
              type="end"
              form={form}
              day={day}
              timeError={timeError}
            />
            <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
              :
            </div>
            <MinuteField
              control={control}
              type="end"
              form={form}
              day={day}
              timeError={timeError}
            />
            <DayPeriodField
              control={control}
              type="end"
              form={form}
              day={day}
              timeError={timeError}
            />
          </div>
        </div>
      </div>
      {isError && (
        <p className="text-red-500">Start Time can't be more than End Time</p>
      )}
    </div>
  );
}
