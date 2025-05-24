import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, fullWidth = true, icon, ...props }, ref) => {
    return (
      <div className={cn('mb-4', fullWidth ? 'w-full' : '', className)}>
        {label && (
          <label htmlFor={props.id} className="label">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'input',
              error ? 'border-error-500 focus:border-error-500 focus:ring-error-500/50' : '',
              icon ? 'pl-10' : ''
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;