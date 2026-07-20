export const TimeSelection = ({ availableTimes, selectedTime, onSelect, selectedDate }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Escolha o horário</h2>
      <div className="mb-4 text-sm text-[var(--color-text-secondary)]">
        Data selecionada: <span className="font-medium text-[var(--color-text-primary)]">{selectedDate}</span>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {availableTimes.map((timeObj) => {
          const isSelected = selectedTime === timeObj.time;
          const isAvailable = timeObj.available;
          
          return (
            <button
              key={timeObj.time}
              disabled={!isAvailable}
              onClick={() => onSelect(timeObj.time)}
              className={`
                py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 border
                ${!isAvailable ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed opacity-60' : ''}
                ${isAvailable && !isSelected ? 'bg-white text-[var(--color-text-primary)] border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]' : ''}
                ${isSelected ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] ring-2 ring-[var(--color-primary)] ring-offset-2' : ''}
              `}
            >
              {timeObj.time}
            </button>
          )
        })}
      </div>
    </div>
  );
};
