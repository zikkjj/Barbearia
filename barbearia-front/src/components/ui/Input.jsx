import { forwardRef } from 'react';
import InputMask from 'react-input-mask';

export const Input = forwardRef(({ label, error, mask, ...props }, ref) => {
  const baseStyle = "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all";
  const errorStyle = error ? "border-[var(--color-danger)]" : "border-gray-200";

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {label && <label className="text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}
      {mask ? (
        <InputMask
          mask={mask}
          className={`${baseStyle} ${errorStyle}`}
          inputRef={ref}
          {...props}
        />
      ) : (
        <input 
          ref={ref}
          className={`${baseStyle} ${errorStyle}`} 
          {...props} 
        />
      )}
      {error && <span className="text-xs text-[var(--color-danger)]">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
