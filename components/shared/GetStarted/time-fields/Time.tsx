import { TimeFieldsProps } from "@/types/get-started";
import { HourField } from "../hourField";
import { MinuteField } from "../MinuteField";
import { DayPeriodField } from "../DayPeriod";

export function Time({ control, errors, form }: TimeFieldsProps) {
  return (
    <div className="flex gap-6">
      <div className="space-y-2">
        <div className="font-medium text-zinc-500 font-base">Start Time</div>
        <div className="flex gap-2 items-center">
          <HourField control={control} type="start" form={form} />
          <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
            :
          </div>
          <MinuteField control={control} type="start" form={form} />
          <DayPeriodField control={control} type="start" form={form} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="font-medium text-zinc-500 font-base">End Time</div>
        <div className="flex gap-2 items-center">
          <HourField control={control} type="end" form={form} />
          <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
            :
          </div>
          <MinuteField control={control} type="end" form={form} />
          <DayPeriodField control={control} type="end" form={form} />
        </div>
      </div>
      {errors.startHour && (
        <p className="text-red-500">Start Time can't be less than End Time</p>
      )}
    </div>
  );
}
