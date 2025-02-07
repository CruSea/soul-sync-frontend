import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneNumberFieldProps } from '@/types/get-started';

export function PhoneNumberField({ control }: PhoneNumberFieldProps) {
  return (
    <FormField
      control={control}
      name="phoneNumber"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-lg font-semibold">PhoneNumber</FormLabel>
          <FormControl>
            <Input
              className="text-lg h-[56px] w-full"
              placeholder=""
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
