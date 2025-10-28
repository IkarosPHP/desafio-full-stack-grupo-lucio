Aqui está uma versão reformulada e formatada do seu README para o GitHub com melhor estrutura visual, hierarquia clara e destaque técnico otimizado para desenvolvedores:

***

# LucioSpot — Sistema de Reserva e Gestão de Acessos

LucioSpot é um sistema completo para **reserva de mesas e horários**, com foco em usabilidade, regras de negócio bem definidas e administração intuitiva.  
Desenvolvido com **Angular**, **NestJS** e **Firebase**, oferece autenticação de usuários, painel administrativo e controle de acesso com diferentes níveis de privilégio.

***

## 🧭 Visão Geral

O sistema foi projetado para facilitar o agendamento de mesas em ambientes como cafeterias, restaurantes ou coworkings, garantindo consistência nas regras de reserva e uma interface moderna e responsiva.

***

## ⚙️ Stack Tecnológica

**Frontend**
- Angular 17+
- Angular Material
- Standalone Components
- RxJS para controle de estado

**Backend**
- NestJS com Firebase Admin SDK
- Guards para autenticação e autorização
- CRUD completo com Firestore (NoSQL)
- Firebase Authentication (email/senha)

**Outros**
- CSS customizado e responsividade total
- Firebase/Google Cloud para integração e deploy


## 🚀 Guia de Inicialização

### 1. Pré-requisitos

- Node.js 18+  
- npm ou yarn  
- Angular CLI instalado globalmente  
- Firebase CLI (opcional, para deploy)  
- Conta Google Cloud com projeto e Firebase configurado  

### 2. Instalação

**Frontend**
```bash
cd lucioSpot
npm install
npm run start
# Acesse: http://localhost:4200
```

**Backend**
```bash
cd luciospot-server
npm install
npm run start
```

Edite o arquivo `.env` e `firebase.config.ts` com as credenciais corretas.
- o arquivo .env precisa conter a chave FIREBASE_API_KEY e o arquivo secret.json com as credencias do firebase

***

## 🎯 Principais Funcionalidades

### Reservas
- Cadastro de reservas por **mesa**, **data** e **horário**.  
- Validação de regras:
  - Máximo **duas reservas por dia** por usuário.
  - Apenas **uma reserva por horário/dia**.
  - Impede reservas duplicadas em **mesas ou horários já ocupados**.
- Cancelamento de reserva integrado.
- Formulários reativos com validação de dados.

### Autenticação
- Login e cadastro com **Firebase Authentication**.
- Validação de email, senha e confirmação.
- Persistência de sessão segura e automática.

### Gestão de Acessos
- Listagem completa de usuários com **nome, email e status tipo de acesso**.
- Ações dinâmicas para **atribuir ou remover privilégios**.
- Somente **administradores** podem gerenciar permissões e visualizar todas as reservas.

### Painel de Controle
- Exibição de **total de reservas**.
- Estatísticas de **reservas ativas e canceladas**.

***

## 🧠 Regras de Negócio Implementadas

- Limite de **duas reservas por usuário/dia**.  
- Impede duas reservas no mesmo horário por usuário.  
- Bloqueia reservas para mesa/horário já ocupados.  
- Somente administradores podem alterar privilégios de acesso.  


***

## 💡 Possíveis Melhorias Futuras

- Cadastro exclusivamente via convite (email)
- Testes automátizados
