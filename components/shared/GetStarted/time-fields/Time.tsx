import { TimeProp } from "@/types/get-started";
import { HourField } from "../hourField";
import { MinuteField } from "../MinuteField";
import { DayPeriodField } from "../DayPeriod";

export function Time({ control, errors, form, day }: TimeProp) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="font-medium font-sm">{day.label}</div>
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <div className="font-medium text-zinc-500 text-sm">Start Time</div>
          <div className="flex gap-2 items-center">
            <HourField control={control} type="start" form={form} day={day} />
            <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
              :
            </div>
            <MinuteField control={control} type="start" form={form} day={day}/>
            <DayPeriodField control={control} type="start" form={form} day={day}/>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="font-medium text-zinc-500 text-sm">End Time</div>
          <div className="flex gap-2 items-center">
            <HourField control={control} type="end" form={form} day={day}/>
            <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
              :
            </div>
            <MinuteField control={control} type="end" form={form} day={day}/>
            <DayPeriodField control={control} type="end" form={form} day={day}/>
          </div>
        </div>
      </div>
      {errors.startHour && (
        <p className="text-red-500">Start Time can't be less than End Time</p>
      )}
    </div>
  );
}
