"use client"

import { DateSegment } from "./date-segment";
import { useEffect, useRef } from "react";
import { AriaTimeFieldProps, TimeValue, useLocale, useTimeField } from "react-aria";
import { useTimeFieldState } from "react-stately";
import { cn } from "@/lib/utils";
import { Time } from "./Time";

interface TimeFieldProps extends AriaTimeFieldProps<TimeValue> {
	handleTime: (time: Time) => void;
}

function TimeField({handleTime, ...props}: TimeFieldProps) {
	const ref = useRef<HTMLDivElement | null>(null);

	const { locale } = useLocale();
	const state = useTimeFieldState({
		...props,
		locale,
	});
	const {
		fieldProps: { ...fieldProps },
		labelProps,
	} = useTimeField(props, state, ref);

	useEffect(() => {
		const time = {
			hours: state.segments.filter(segment => segment.type == "hour")[0].text,
			minutes: state.segments.filter(segment => segment.type == "minute")[0].text,
			dayPeriod: state.segments.filter(segment => segment.type == "dayPeriod")[0].text,
		}
		handleTime(time)
	}, [state])

	return (
		<div
			{...fieldProps}
			ref={ref}
			className={cn(
				"inline-flex h-10 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				props.isDisabled ? "cursor-not-allowed opacity-50" : "",
			)}
		>
			{state.segments.map((segment, i) => (
				<DateSegment key={i} segment={segment} state={state} />
			))}
		</div>
	);
}

export { TimeField };
