import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const IdentificationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    cpf: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.celular || formData.celular.replace(/\D/g, '').length < 11) newErrors.celular = 'Celular inválido';
    if (!formData.cpf || formData.cpf.replace(/\D/g, '').length < 11) newErrors.cpf = 'CPF inválido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Pass the unmasked values optionally, or just the string
      onSubmit(formData);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-[var(--color-text-primary)]">Seus dados</h2>
      
      <form onSubmit={handleSubmit}>
        <Input 
          label="Nome Completo"
          name="nome"
          placeholder="Ex: João da Silva"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
        />
        
        <Input 
          label="Celular"
          name="celular"
          mask="(99) 99999-9999"
          placeholder="(00) 00000-0000"
          value={formData.celular}
          onChange={handleChange}
          error={errors.celular}
        />
        
        <Input 
          label="CPF"
          name="cpf"
          mask="999.999.999-99"
          placeholder="000.000.000-00"
          value={formData.cpf}
          onChange={handleChange}
          error={errors.cpf}
        />

        <div className="flex gap-4 mt-8">
          <Button type="button" variant="outline" onClick={onCancel}>
            Voltar
          </Button>
          <Button type="submit" variant="primary">
            Confirmar Agendamento
          </Button>
        </div>
      </form>
    </div>
  );
};
