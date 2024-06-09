"use client";

import { InputHTMLAttributes, forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { name, label, required, className, ...rest },
  ref
) {
  const { control } = useFormContext(); 

  return (
    <fieldset className={`w-full flex flex-col ${className ? className : ''}`}>
      <label htmlFor={name} className="text-sm font-semibold mb-1 w-fit">
        {label + (required ? ' *' : '')}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              ref={ref}
              id={name}
              name={name}
              value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
              onChange={e => field.onChange(rest.type === 'number' && e.target.value !== '' ? Number(e.target.value) : e.target.value)}
              {...rest}
              className="ring-1 ring-gray-500 text-black rounded-sm p-3 shadow-md w-full"
            />
            {error && <span className="text-sm text-red-600 pt-2">{error.message}</span>}
          </>
        )}
      />
    </fieldset>
  );
});

export default Input;