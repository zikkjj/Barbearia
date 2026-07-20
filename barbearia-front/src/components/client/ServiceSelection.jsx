import { Scissors, Sparkles, UserCheck, User } from 'lucide-react';
import { Card } from '../ui/Card';

const iconMap = {
  'scissors': Scissors,
  'razor': Sparkles,
  'combo': UserCheck
};

export const ServiceSelection = ({ 
  services, 
  professionals, 
  selectedService, 
  selectedProfessional, 
  onSelectService, 
  onSelectProfessional 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[var(--color-text-primary)] text-white flex items-center justify-center font-bold text-sm">
          1
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Serviço & Profissional</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">Serviço</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Scissors;
            const isSelected = selectedService?.id === service.id;
            return (
              <Card 
                key={service.id}
                selectable
                selected={isSelected}
                onClick={() => onSelectService(service)}
                className="flex items-center gap-4 p-4"
              >
                <div className={`p-3 rounded-lg ${isSelected ? 'bg-[var(--color-text-primary)]' : 'bg-[#1E1E1E]'} text-white`}>
                  <IconComponent size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-[var(--color-text-primary)]">{service.name}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{service.duration} · {service.price}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <div className="animate-in fade-in duration-300">
          <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">Profissional</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {professionals.map((prof) => {
              const isSelected = selectedProfessional?.id === prof.id;
              return (
                <Card 
                  key={prof.id}
                  selectable
                  selected={isSelected}
                  onClick={() => onSelectProfessional(prof)}
                  className="flex items-center gap-3 p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--color-text-primary)]">{prof.name}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)]">{prof.role}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
