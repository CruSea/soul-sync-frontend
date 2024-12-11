"use client"

import React from "react";
import { TimeValue } from "react-aria";
import { TimeFieldStateOptions } from "react-stately";
import { TimeField } from "./time-field";
import { Time } from "./Time";

interface TimePickerProps extends Omit<TimeFieldStateOptions<TimeValue>, "locale"> {
  handleTime: (time: Time) => void; // Add handleTime as an optional prop
}

const TimePicker = React.forwardRef<
  HTMLDivElement,
  TimePickerProps
>(({handleTime, ...props}, forwardedRef) => {
  return <TimeField {...props} handleTime={handleTime} />;
});

TimePicker.displayName = "TimePicker";

export { TimePicker };
