export const TimeSelection = ({ dates, availableTimes, selectedTime, selectedDate, onSelectTime, onSelectDate }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[var(--color-text-primary)] text-white flex items-center justify-center font-bold text-sm">
          2
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Data & Horário</h2>
      </div>
      
      <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">Data</h3>
      {/* Calendário compacto (Carrossel Horizontal) */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide -mx-2 px-2 snap-x">
        {dates.map((dateObj, index) => {
          const isSelected = selectedDate === dateObj.fullDate;
          return (
            <button
              key={index}
              onClick={() => onSelectDate(dateObj.fullDate)}
              className={`
                snap-center flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl border transition-colors
                ${isSelected ? 'bg-[var(--color-text-primary)] text-white border-[var(--color-text-primary)]' : 'bg-white border-gray-200 hover:border-gray-300'}
              `}
            >
              <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>{dateObj.dayOfWeek}</span>
              <span className={`text-xl font-bold mt-0.5 mb-0.5 ${isSelected ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>{dateObj.day}</span>
              <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-gray-400' : 'text-gray-400'}`}>{dateObj.month}</span>
            </button>
          )
        })}
      </div>

      <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 mt-2">Horário</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {availableTimes.map((timeObj) => {
          const isSelected = selectedTime === timeObj.time;
          const isAvailable = timeObj.available;
          
          return (
            <button
              key={timeObj.time}
              disabled={!isAvailable}
              onClick={() => onSelectTime(timeObj.time)}
              className={`
                py-2.5 px-3 rounded-lg font-semibold text-sm transition-colors border
                ${!isAvailable ? 'bg-white text-gray-300 border-gray-100 cursor-not-allowed' : ''}
                ${isAvailable && !isSelected ? 'bg-white text-[var(--color-text-primary)] border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]' : ''}
                ${isSelected ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : ''}
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
