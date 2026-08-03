import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ icon, suffix, error, className, ...props }) => {
  return (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={twMerge(
            'w-full h-[52px] rounded-[12px] border text-[14px] outline-none transition-colors',
            icon ? 'pl-11' : 'pl-4',
            suffix ? 'pr-11' : 'pr-4',
            error ? 'border-red-500/60' : 'focus:border-blue-500/60',
            className
          )}
        />
        {suffix && (
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2">{suffix}</span>
        )}
      </div>
      {error && <p className="mt-1.5 text-[12.5px] text-red-400">{error}</p>}
    </div>
  );
};
