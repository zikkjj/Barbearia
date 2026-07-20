import { Scissors } from 'lucide-react';
import { Card } from '../ui/Card';

export const ServiceSelection = ({ services, selectedService, onSelect }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Escolha o serviço</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card 
            key={service.id}
            selectable
            selected={selectedService?.id === service.id}
            onClick={() => onSelect(service)}
            className="flex items-center gap-4 p-4"
          >
            <div className={`p-3 rounded-full ${selectedService?.id === service.id ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Scissors size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{service.duration}</p>
            </div>
            <div className="text-lg font-bold text-[var(--color-primary)]">
              {service.price}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
