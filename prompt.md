# 📚 Projeto: Caderno Digital

Você é um desenvolvedor full stack especialista em:
- React
- Next.js
- TypeScript
- TailwindCSS
- Node.js
- Solana Web3.js
- Carteiras Phantom
- APIs REST
- Banco de dados PostgreSQL
- Prisma ORM

Seu objetivo é criar um MVP funcional chamado **Caderno Digital**.

---

# 🎯 Objetivo do Sistema

Criar uma plataforma onde:

- Professores possam criar atividades
- Alunos possam acessar atividades online
- Alunos possam enviar atividades
- O sistema registre os envios
- A blockchain Solana seja usada para validar e registrar entregas

---

# 👥 Público-Alvo

Alunos que:
- trabalham
- possuem responsabilidades familiares
- faltam frequentemente
- precisam acessar atividades remotamente

---

# 🧱 Arquitetura Desejada

## Frontend
Utilizar:
- Next.js
- TypeScript
- TailwindCSS

## Backend
Utilizar:
- API Routes do Next.js
ou
- Express.js

## Banco de Dados
Utilizar:
- PostgreSQL
- Prisma ORM

## Blockchain
Utilizar:
- Solana Devnet
- @solana/web3.js
- integração com carteira Phantom

---

# 📂 Estrutura Inicial do Projeto

Criar estrutura:

/src
/components
/pages
/api
/lib
/hooks
/services
/prisma
/styles

---

# 🔐 Funcionalidades de Autenticação

## Etapa 1
Implementar:
- conexão com carteira Phantom
- botão "Conectar Carteira"
- detectar carteira instalada
- salvar endereço da carteira do usuário

## Requisitos
- usar @solana/wallet-adapter
- criar contexto global de autenticação
- exibir wallet conectada

---

# 👨‍🏫 Funcionalidades do Professor

## Etapa 2
Criar CRUD de atividades.

Campos:
- título
- descrição
- prazo
- disciplina

Funcionalidades:
- criar atividade
- listar atividades
- editar atividade
- excluir atividade

Criar:
- formulário responsivo
- validação de dados
- feedback visual

---

# 👨‍🎓 Funcionalidades do Aluno

## Etapa 3
Criar sistema para:
- visualizar atividades
- abrir detalhes
- enviar resposta da atividade
- anexar texto ou arquivo

Campos da entrega:
- alunoWallet
- atividadeId
- resposta
- dataEnvio

---

# ⛓️ Integração Blockchain Solana

## Etapa 4
Ao enviar atividade:

1. gerar hash do envio
2. registrar hash na Solana Devnet
3. salvar assinatura da transação
4. retornar comprovante ao usuário

Utilizar:
- @solana/web3.js

Criar:
- serviço blockchainService.ts

Funções:
- connectWallet()
- createTransaction()
- sendTransaction()
- confirmTransaction()

---

# 💾 Banco de Dados

## Etapa 5
Criar models Prisma:

### Activity
- id
- title
- description
- deadline
- subject
- createdAt

### Submission
- id
- activityId
- studentWallet
- response
- transactionSignature
- createdAt

Gerar:
- migrations
- seed inicial

---

# 🎨 Interface

## Etapa 6
Criar interface moderna e responsiva.

Telas:
- Home
- Dashboard do aluno
- Dashboard do professor
- Lista de atividades
- Página de envio
- Histórico de entregas

Usar:
- TailwindCSS
- ícones lucide-react
- layout limpo
- responsividade mobile

---

# 📋 Fluxo do Sistema

Professor cria atividade
↓
Sistema salva no banco
↓
Aluno acessa atividade
↓
Aluno envia resposta
↓
Sistema gera hash
↓
Hash registrado na Solana
↓
Comprovante exibido

---

# ⚡ Requisitos Técnicos

- Código limpo
- Componentização
- Tipagem forte
- Responsividade
- Separação de responsabilidades
- Services organizados
- Hooks reutilizáveis
- Tratamento de erros

---

# 📦 Dependências Necessárias

Instalar:
- next
- react
- typescript
- tailwindcss
- prisma
- @prisma/client
- @solana/web3.js
- @solana/wallet-adapter-react
- @solana/wallet-adapter-wallets
- @solana/wallet-adapter-react-ui
- lucide-react
- react-hook-form
- zod

---

# 🚀 Resultado Esperado

Ao final:
- sistema funcional
- conexão com Phantom
- CRUD de atividades
- envio de tarefas
- registro blockchain
- interface moderna
- arquitetura escalável

---

# 📌 Instruções Importantes

- Gere o código por etapas
- Explique cada etapa antes do código
- Gere arquivos completos
- Não omita imports
- Sempre mostrar estrutura de pastas
- Criar exemplos reais de componentes
- Utilizar boas práticas
- Utilizar TypeScript em tudo
