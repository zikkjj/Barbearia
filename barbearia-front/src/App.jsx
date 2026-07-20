import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { ClientFlow } from './pages/ClientFlow';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          {/* Main flow for the client */}
          <Route path="/" element={<ClientFlow />} />
          
          {/* Admin Dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        
        {/* Floating link to admin (just for easy navigation during dev/demo) */}
        <Link 
          to="/admin" 
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg opacity-50 hover:opacity-100 transition-opacity z-50 text-xs"
        >
          Ir para Admin
        </Link>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
