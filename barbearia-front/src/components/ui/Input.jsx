import { forwardRef } from 'react';

export const Input = forwardRef(({ label, error, mask, ...props }, ref) => {
  const baseStyle = "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-all";
  const errorStyle = error ? "border-[var(--color-danger)] focus:ring-[var(--color-danger)] focus:border-[var(--color-danger)]" : "border-gray-200";

  return (
    <div className="flex flex-col gap-1.5 mb-2">
      {label && <label className="text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}
      <input 
        ref={ref}
        className={`${baseStyle} ${errorStyle}`} 
        {...props} 
      />
      {error && <span className="text-sm text-[var(--color-danger)] mt-1">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
