import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AgeFieldProps } from '@/types/get-started';

export function AgeField({ control, className }: AgeFieldProps) {
  return (
    <FormField
      control={control}
      name="age"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="text-lg font-semibold">Age</FormLabel>
          <FormControl>
            <Input
              type="number"
              className={cn('text-sm h-14 w-28', className)}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
