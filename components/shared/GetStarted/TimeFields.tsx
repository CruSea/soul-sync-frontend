import { TimeFieldsProps } from '@/types/get-started';
import { HourField } from './hourField';
import { DayPeriodField } from './DayPeriod';
import { MinuteField } from './MinuteField';

export function TimeFields({ form, errors }: TimeFieldsProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-6">
        <div className="space-y-2">
          <div className="font-medium text-zinc-500 font-base">Start Time</div>
          <div className="flex gap-2 items-center">
            <HourField control={form.control} type="start" form={form} />
            <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
              :
            </div>
            <MinuteField control={form.control} type="start" form={form} />
            <DayPeriodField control={form.control} type="start" form={form} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-zinc-500 font-base">End Time</div>
          <div className="flex gap-2 items-center">
            <HourField control={form.control} type="end" form={form} />
            <div className="text-2xl text-neutral-500 mb-1 ml-[-4px] mr-[-5px]">
              :
            </div>
            <MinuteField control={form.control} type="end" form={form} />
            <DayPeriodField control={form.control} type="end" form={form} />
          </div>
        </div>
      </div>
      {errors.startHour && (
        <p className="text-red-500">
          Start Time can&apos;t be less than End Time
        </p>
      )}
    </div>
  );
}
