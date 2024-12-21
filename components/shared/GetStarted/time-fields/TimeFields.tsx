import { TimeFieldsProps } from "@/types/get-started";
import { Time } from "./Time";

export function TimeFields({
  control,
  errors,
  form,
  options,
}: TimeFieldsProps) {
  const availability = form.watch("availability");

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Select Time:</div>
      <div className="pl-4 space-y-2">
        {options.map((day) =>
          availability?.[day.value] ? (
            <Time key={day.value} control={control} errors={errors} form={form} day={day} />
          ) : null
        )}
      </div>
    </div>
  );
}
