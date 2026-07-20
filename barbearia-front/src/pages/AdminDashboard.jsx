import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScheduleTable } from '../components/admin/ScheduleTable';
import { useBooking } from '../context/BookingContext';

export const AdminDashboard = () => {
  const { bookings } = useBooking();
  const [selectedDate, setSelectedDate] = useState('15/10/2026');
  
  const todayBookings = bookings.filter(b => b.status !== 'cancelado' && b.date === selectedDate);
  const revenue = todayBookings.reduce((acc, curr) => {
    // extract numbers from price like 'R$ 40' -> 40
    const priceRaw = curr.service?.price;
    const priceStr = priceRaw != null ? String(priceRaw) : '0';
    const priceNum = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;
    return acc + priceNum;
  }, 0);
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col md:flex-row">
      {/* Sidebar - Oculta no mobile puro, visível a partir do md */}
      <aside className="w-full md:w-64 bg-[var(--color-text-primary)] text-white flex-shrink-0 md:min-h-screen shadow-xl z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1 text-[var(--color-primary)]">Admin Painel</h1>
          <p className="text-sm text-gray-400">Barbearia VIP</p>
        </div>
        
        <nav className="mt-6 px-4 pb-4 md:pb-0 flex md:flex-col gap-2 overflow-x-auto">
          <a href="#" className="bg-white/10 text-white px-4 py-3 rounded-lg font-medium whitespace-nowrap">
            Agenda do Dia
          </a>
          <a href="#" className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
            Clientes
          </a>
          <a href="#" className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
            Serviços
          </a>
          <div className="md:mt-auto pt-4 md:pt-8 w-full md:pb-8">
            <Link to="/" className="text-sm text-gray-400 hover:text-white underline px-4 py-2 block">
              Ver site do cliente
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Visão Geral</h2>
            <p className="text-[var(--color-text-secondary)]">Gerencie os agendamentos de hoje.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase">Agendamentos</span>
              <span className="text-xl font-bold text-[var(--color-text-primary)]">{todayBookings.length}</span>
            </div>
            <div className="bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <span className="text-xs text-[var(--color-text-secondary)] font-medium uppercase">Faturamento (Est.)</span>
              <span className="text-xl font-bold text-[var(--color-success)]">R$ {revenue}</span>
            </div>
          </div>
        </header>

        <div className="mb-4">
          <select 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-[var(--color-text-primary)]"
          >
            <option value="15/10/2026">15/10/2026</option>
            <option value="16/10/2026">16/10/2026</option>
            <option value="17/10/2026">17/10/2026</option>
            <option value="18/10/2026">18/10/2026</option>
          </select>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ScheduleTable selectedDate={selectedDate} />
        </div>
      </main>
    </div>
  );
};
