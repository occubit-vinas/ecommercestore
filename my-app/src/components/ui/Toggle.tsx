'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ToggleProps } from '@/types/ui.types';

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked = false, onCheckedChange, disabled = false, className, id, ...props }, ref) => {
    const handleClick = () => {
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    };

    return (
      <button
        ref={ref}
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'relative w-[43px] h-[26px] rounded-full',
          checked ? 'bg-[#6c6c80]' : 'bg-[#6c6c80]/40',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          disabled && 'opacity-50 cursor-not-allowed',
          'transition-colors duration-300',
          className
        )}
        {...props}
      >
        <span
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-[22.76px] h-[22.65px] rounded-full bg-white',
            'shadow-[0px_1px_4px_0px_rgba(0,0,0,0.30),_0px_0px_2px_0px_rgba(0,0,0,0.30)]',
            checked ? '-translate-x-[20px]' : '-translate-x-[2px]',
            'transition-transform duration-300 ease-in-out'
          )}
        />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle };