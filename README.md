# LucioSpot — Sistema de Reserva e Gestão de Acessos

### Visão Geral
LucioSpot é um sistema completo para reserva de mesas e horários, focado em usabilidade, regras de negócio precisas e facilidade de gestão. Inclui autenticação de usuários, painel administrativo, controle de acesso com privilégios e uma experiência moderna com Angular e NestJS/Firebase.

### Escolhas Técnicas
Frontend: Angular (v17+) com Angular Material para UI, standalone components e uso de RxJS.
Backend: NestJS rodando com Firebase Admin SDK.
Segurança via Guards e validação de privilégios.
Operações CRUD com Firestore.
Banco: Firestore (NoSQL) integrado.
Autenticação: Firebase Authentication (email/senha).
Estilo: Angular Material, CSS customizado e responsividade.
Controle de Estado: RxJS Observables nos serviços.
Deploy: *

Estrutura dos Projetos
/frontend: Aplicação Angular (src/app/pages, services, modulos, etc)
/backend: NestJS com arquivos de Service e Controller (Gerenciamento de reservas, usuários, autenticação)
/firebase.config.ts: Arquivo de configuração global do Firebase Admin

Guia de Inicialização
1. Pré-requisitos
Node.js 18+ e npm ou yarn
Angular CLI instalado globalmente
Firebase CLI (opcional para deploy)
Conta Google Cloud com projeto/configuração Firebase

2. Instalação
Frontend
bash
cd lucioSpot
npm install
npm run start
# Acesse: http://localhost:4200

Backend
bash
cd luciospot-server
npm install
npm run start

# Edite o arquivo .env ou firebase.config.ts com as credenciais corretas

## Principais Funcionalidades
### Reservas
Cadastro de reservas por mesa, horário e data.
Regra: Máximo duas reservas por dia por usuário, uma por horário.
Não permite reservas duplicadas para o mesmo horário/mesa.
Formulários reativos com validação.
- funcionalidade de cancelamento de reserva funcional

### Autenticação
Login & Cadastro de usuário com validação (email, senha, confirmação).
Persistência de sessão e gerenciamento via Firebase Auth.

### Gestão de Acessos
Listagem dos usuários (nome, email, status admin).
Ações para tornar/remover admin (botão dinâmico).
Validação de permissão: apenas administradores podem alterar privilégios.

### Painel de Controle:
Total de reservas
Reservas ativas/canceladas (com percentual)

### Regras de Negócio Implementadas
Não permite mais que duas reservas por usuário/dia.



Se eu tivesse mais tempo, faria com que o cadastro de usuários só fosse possível via convite (email)
Não permite reservas repetidas no mesmo horário por usuário/dia.
Não permite reservar mesa e horário já ocupados.
Apenas administradores podem gerenciar privilégios de acesso.
