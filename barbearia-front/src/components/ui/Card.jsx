export const Card = ({ children, className = '', selectable = false, selected = false, onClick }) => {
  const baseStyle = "bg-[var(--color-surface)] rounded-xl p-4 shadow-sm border transition-all duration-200";
  const selectableStyle = selectable ? "cursor-pointer hover:shadow-md" : "";
  const selectedStyle = selected ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)] bg-[#C5A8800A]" : "border-gray-100";

  return (
    <div 
      className={`${baseStyle} ${selectableStyle} ${selectedStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
