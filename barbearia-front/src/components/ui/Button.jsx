export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-opacity-90 active:bg-opacity-100",
    secondary: "bg-[var(--color-text-primary)] text-white hover:bg-opacity-90",
    outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
    danger: "bg-[var(--color-danger)] text-white hover:bg-opacity-90",
    success: "bg-[var(--color-success)] text-white hover:bg-opacity-90",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
