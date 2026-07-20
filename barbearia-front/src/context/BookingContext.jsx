import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const initialServices = [
  { id: '1', name: 'Corte Masculino', duration: '40 min', price: 'R$ 55.00', icon: 'scissors' },
  { id: '2', name: 'Barba Completa', duration: '30 min', price: 'R$ 40.00', icon: 'scissors' },
  { id: '3', name: 'Corte + Barba', duration: '60 min', price: 'R$ 85.00', icon: 'scissors' },
  { id: '4', name: 'Pigmentação', duration: '45 min', price: 'R$ 70.00', icon: 'scissors' },
];

const initialProfessionals = [
  { id: '1', name: 'Rafael', role: 'Barbeiro Sênior' },
  { id: '2', name: 'Lucas', role: 'Barbeiro' },
  { id: '3', name: 'André', role: 'Barbeiro' },
];

export const BookingProvider = ({ children }) => {
  const [services] = useState(initialServices);
  const [professionals] = useState(initialProfessionals);
  
  // Load initial bookings from LocalStorage or empty array
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  // Persist bookings on change
  useEffect(() => {
    localStorage.setItem('barbearia_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Method to check if CPF has active booking
  const hasActiveBooking = (cpf) => {
    return bookings.some(b => b.cpf === cpf && b.status === 'pendente');
  };

  // Create new booking
  const addBooking = (bookingData) => {
    if (hasActiveBooking(bookingData.cpf)) {
      throw new Error('Você já possui um agendamento ativo. Cancele o atual para agendar uma nova data.');
    }
    
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      status: 'pendente', // pendente, concluido, cancelado
      createdAt: new Date().toISOString()
    };
    
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  // Update booking status
  const updateBookingStatus = (id, newStatus) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
    );
  };

  return (
    <BookingContext.Provider value={{
      services,
      professionals,
      bookings,
      addBooking,
      updateBookingStatus,
      hasActiveBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  return useContext(BookingContext);
};
