import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

const initialServices = [
  { id: '1', name: 'Corte Clássico', duration: '30 min', price: 'R$ 40', icon: 'scissors' },
  { id: '2', name: 'Barba Terapia', duration: '30 min', price: 'R$ 35', icon: 'razor' },
  { id: '3', name: 'Corte + Barba', duration: '1 hora', price: 'R$ 70', icon: 'combo' },
];

export const BookingProvider = ({ children }) => {
  const [services] = useState(initialServices);
  
  // Load initial bookings from LocalStorage or empty array
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('barbearia_bookings');
    return saved ? JSON.parse(saved) : [];
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
