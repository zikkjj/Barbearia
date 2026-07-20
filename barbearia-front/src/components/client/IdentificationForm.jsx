import { useState } from 'react';
import { Input } from '../ui/Input';

export const IdentificationForm = ({ formData, setFormData, errors, setErrors }) => {

  const formatCPF = (val) => {
    return val.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatCelular = (val) => {
    return val.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'cpf') value = formatCPF(value);
    if (name === 'celular') value = formatCelular(value);

    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[var(--color-text-primary)] text-white flex items-center justify-center font-bold text-sm">
          3
        </div>
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Seus dados</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        <Input 
          label="Nome completo"
          name="nome"
          placeholder="Aaaaa"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
        />
        
        <Input 
          label="Celular"
          name="celular"
          mask="(99) 99999-9999"
          placeholder="(99) 99999-9999"
          value={formData.celular}
          onChange={handleChange}
          error={errors.celular}
        />
        
        <Input 
          label="CPF"
          name="cpf"
          mask="999.999.999-99"
          placeholder="999.999.999-99"
          value={formData.cpf}
          onChange={handleChange}
          error={errors.cpf}
        />
      </div>
    </div>
  );
};
