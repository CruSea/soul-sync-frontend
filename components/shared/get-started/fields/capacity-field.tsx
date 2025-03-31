'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { AgeFieldProps } from '@/types/get-started';

export const CapacityField = ({ control, className }: AgeFieldProps) => {
  return (
    <FormField
      control={control}
      name="capacity"
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>Capacity</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your capacity"
              type="number"
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
