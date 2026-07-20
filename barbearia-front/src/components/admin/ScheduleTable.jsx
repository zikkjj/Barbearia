import { CheckCircle2, XCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const ScheduleTable = ({ selectedDate = 'Hoje' }) => {
  const { bookings, updateBookingStatus } = useBooking();
  
  // Horários disponíveis
  const hours = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];
  
  const getBookingForTime = (time) => {
    // Procura um agendamento (pendente ou concluido) para este horário E data.
    return bookings.find(b => b.time === time && b.date === selectedDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Agendamentos do dia</h2>
        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-[var(--color-text-secondary)] font-medium">
          {selectedDate}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[var(--color-text-secondary)] text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Horário</th>
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Celular</th>
              <th className="px-6 py-4 font-medium">CPF</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {hours.map((time) => {
              const booking = getBookingForTime(time);
              const isFree = !booking || booking.status === 'cancelado';
              
              if (isFree) {
                return (
                  <tr key={time} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--color-text-primary)]">{time}</td>
                    <td className="px-6 py-4 text-gray-400 italic">Disponível</td>
                    <td className="px-6 py-4 text-gray-400">--</td>
                    <td className="px-6 py-4 text-gray-400">--</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Livre
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">-</td>
                  </tr>
                );
              }

              const isPending = booking.status === 'pendente';
              const isCompleted = booking.status === 'concluido';

              return (
                <tr key={time} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--color-text-primary)]">{time}</td>
                  <td className="px-6 py-4 font-medium">{booking.nome}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">{booking.celular}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">{booking.cpf}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {isPending ? 'Pendente' : 'Concluído'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isPending ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'concluido')}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="Concluir atendimento"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'cancelado')}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Cancelar agendamento"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">(Histórico)</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
