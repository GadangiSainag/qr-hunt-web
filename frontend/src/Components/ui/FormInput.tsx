import React from 'react';
import { Label } from './label';
import { Input } from './input';
import { cn } from '../../lib/utils';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, touched, className, ...props }, ref) => {
    const showError = touched && error;

    return (
      <div className="space-y-2">
        <Label
          htmlFor={props.id || props.name}
          className={cn(showError && 'text-red-500')}
        >
          {label}
        </Label>
        <Input
          ref={ref}
          {...props}
          className={cn(
            showError && 'border-red-500 focus:ring-red-500',
            className
          )}
        />
        {showError && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
); 