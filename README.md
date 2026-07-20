# Barbearia Fullstack - Frontend

Sistema de agendamento online responsivo e minimalista voltado para barbearias modernas. O projeto conta com uma interface focada na experiência do usuário (mobile-first para clientes) e uma visão analítica em formato de dashboard para a administração da barbearia.

## 🔥 Diferenciais do Projeto

* **Validação de CPF Único:** Um cliente só pode realizar um novo agendamento após o atendimento anterior ter sido concluído ou cancelado.
* **Sem Gateway de Pagamento:** Fluxo focado estritamente no agendamento; os pagamentos ocorrem externamente.
* **Design Limpo e Profissional:** Interface baseada em tons de grafite, cinza claro e detalhes bronze/dourado, livre de emojis e estilizada 100% com SVGs.
* **Arquitetura Escalável:** Código modularizado em componentes para facilitar a futura integração com uma API backend.

## 🛠️ Tecnologias Utilizadas

* **Framework:** React (Vite)
* **Estilização:** Tailwind CSS (Responsividade Fluida)
* **Ícones:** Lucide React (Vetores profissionais)
* **Persistência Temporária:** LocalStorage (Simulação de Regras de Negócio)

## 📁 Estrutura do Projeto

```text
src/
├── components/
│   ├── ClientForm.jsx       # Formulário com máscaras e validação
│   ├── ScheduleGrid.jsx     # Grade de horários para seleção
│   ├── ServiceSelection.jsx # Cards de serviços
│   └── AdminDashboard.jsx   # Painel administrativo
├── pages/
│   ├── ClientView.jsx       # View principal do cliente
│   └── AdminView.jsx        # View principal do admin
├── context/
│   └── BookingContext.jsx   # Centralização de estados e regras
├── App.jsx                  # Roteamento de telas
└── main.jsx
