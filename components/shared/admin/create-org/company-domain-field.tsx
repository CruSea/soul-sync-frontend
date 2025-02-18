import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createOrgFormOneValues } from '@/types/create-org';
import { Control } from 'react-hook-form';

interface CompanyDomainFieldProps {
  control: Control<createOrgFormOneValues>;
}

export function CompanyDomainField({ control }: CompanyDomainFieldProps) {
  return (
    <FormField
      control={control}
      name="companyDomain"
      render={({ field }) => (
        <FormItem className="w-input relative">
          <FormLabel className="text-sm font-semibold">
            Company Domain<span className="text-red-500 ml-1">*</span>
          </FormLabel>
          <FormControl>
            <Input
              className="text-sm h-[56px]"
              placeholder="gcmethiopia"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
