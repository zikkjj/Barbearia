export const Card = ({ children, className = '', selectable = false, selected = false, onClick }) => {
  const baseStyle = "bg-white rounded-xl p-4 transition-all duration-200";
  const selectableStyle = selectable ? "cursor-pointer hover:border-gray-300" : "";
  const borderStyle = selected ? "border-2 border-[var(--color-primary)] ring-0 shadow-sm" : "border border-gray-200 shadow-sm";

  return (
    <div 
      className={`${baseStyle} ${borderStyle} ${selectableStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
