import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
}: FormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>

          <Input {...field} type={type} aria-invalid={fieldState.invalid} />

          {fieldState.error && (
            <FieldError errors={[fieldState.error]} className='text-left' />
          )}
        </Field>
      )}
    />
  );
}
