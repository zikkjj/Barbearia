import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ServiceSelection } from '../components/client/ServiceSelection';
import { TimeSelection } from '../components/client/TimeSelection';
import { IdentificationForm } from '../components/client/IdentificationForm';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export const ClientFlow = () => {
  const { services, professionals, addBooking, bookings } = useBooking();
  const [bookingData, setBookingData] = useState({
    service: null,
    professional: null,
    time: null,
    date: '21 de julho' // Default from image
  });

  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    cpf: ''
  });
  const [errors, setErrors] = useState({});

  // Mocks de datas para o carrossel estilo mockup
  const dates = [
    { dayOfWeek: 'DOM', day: '19', month: 'JUL', fullDate: '19 de julho' },
    { dayOfWeek: 'SEG', day: '20', month: 'JUL', fullDate: '20 de julho' },
    { dayOfWeek: 'TER', day: '21', month: 'JUL', fullDate: '21 de julho' },
    { dayOfWeek: 'QUA', day: '22', month: 'JUL', fullDate: '22 de julho' },
    { dayOfWeek: 'QUI', day: '23', month: 'JUL', fullDate: '23 de julho' },
    { dayOfWeek: 'SEX', day: '24', month: 'JUL', fullDate: '24 de julho' },
    { dayOfWeek: 'SÁB', day: '25', month: 'JUL', fullDate: '25 de julho' },
    { dayOfWeek: 'DOM', day: '26', month: 'JUL', fullDate: '26 de julho' },
    { dayOfWeek: 'SEG', day: '27', month: 'JUL', fullDate: '27 de julho' },
  ];
  
  // Mocks de horários disponíveis baseados nos agendamentos reais
  const baseHours = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];
  const availableTimes = baseHours.map(time => {
    const isOccupied = bookings.some(b => 
      b.date === bookingData.date && 
      b.time === time && 
      b.status !== 'cancelado'
    );
    return {
      time,
      available: !isOccupied
    };
  });

  const handleServiceSelect = (service) => setBookingData(prev => ({ ...prev, service }));
  const handleProfessionalSelect = (professional) => setBookingData(prev => ({ ...prev, professional }));
  const handleTimeSelect = (time) => setBookingData(prev => ({ ...prev, time }));
  const handleDateSelect = (date) => setBookingData(prev => ({ ...prev, date, time: null }));

  const validate = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.celular || formData.celular.replace(/\D/g, '').length < 11) newErrors.celular = 'Celular inválido';
    if (!formData.cpf || formData.cpf.replace(/\D/g, '').length < 11) newErrors.cpf = 'CPF inválido.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    if (!bookingData.service || !bookingData.professional || !bookingData.time || !bookingData.date) {
      alert("Por favor, preencha todos os campos do agendamento antes de confirmar.");
      return;
    }

    if (validate()) {
      try {
        addBooking({
          ...formData,
          service: bookingData.service,
          professional: bookingData.professional,
          time: bookingData.time,
          date: bookingData.date
        });
        alert('Agendamento realizado com sucesso!');
        // Reset flow
        setBookingData({ service: null, professional: null, time: null, date: dates[2].fullDate });
        setFormData({ nome: '', celular: '', cpf: '' });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="bg-white px-8 py-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#1E1E1E] text-white p-2 rounded-lg">
            <Scissors size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-[var(--color-text-primary)] leading-none uppercase tracking-wide">Barbearia</h1>
            <p className="text-[10px] text-[var(--color-text-secondary)] font-semibold uppercase tracking-widest mt-0.5">Agendamento</p>
          </div>
        </div>
        <Link to="/admin" className="text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] tracking-wide">
          PAINEL
        </Link>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Coluna Esquerda: Formulários */}
        <div className="flex-1 w-full flex flex-col">
          <ServiceSelection 
            services={services} 
            professionals={professionals}
            selectedService={bookingData.service} 
            selectedProfessional={bookingData.professional}
            onSelectService={handleServiceSelect} 
            onSelectProfessional={handleProfessionalSelect}
          />
          
          <TimeSelection 
            dates={dates}
            availableTimes={availableTimes}
            selectedTime={bookingData.time}
            selectedDate={bookingData.date}
            onSelectTime={handleTimeSelect}
            onSelectDate={handleDateSelect}
          />

          <IdentificationForm 
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        </div>

        {/* Coluna Direita: Sidebar Fixa (Resumo) */}
        <div className="w-full lg:w-80 lg:sticky lg:top-28 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
            <h3 className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-6">Resumo</h3>
            
            <div className="flex flex-col gap-4 text-sm mb-6 border-b border-gray-100 pb-6">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Serviço</span>
                <span className="font-medium text-[var(--color-text-primary)]">{bookingData.service ? bookingData.service.name : '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Profissional</span>
                <span className="font-medium text-[var(--color-text-primary)]">{bookingData.professional ? bookingData.professional.name : '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Data</span>
                <span className="font-medium text-[var(--color-text-primary)]">{bookingData.date || '--'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Horário</span>
                <span className="font-medium text-[var(--color-text-primary)]">{bookingData.time || '--'}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-[var(--color-text-primary)]">Total</span>
              <span className="text-2xl font-bold text-[var(--color-primary)]">
                {bookingData.service ? bookingData.service.price : 'R$ 0.00'}
              </span>
            </div>

            <button 
              onClick={handleConfirmBooking}
              className="w-full bg-[var(--color-primary)] text-white py-3.5 px-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 mt-auto"
            >
              Confirmar agendamento
              <span>&rarr;</span>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};
