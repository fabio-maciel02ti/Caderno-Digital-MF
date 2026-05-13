# 📚 Projeto EduChain: Caderno Digital
**Integrantes:** Milena e Fábio
**Fase:** DIA 4 - CONSTRUÇÃO FUNCIONAL

---

## 🏗️ 1. Arquitetura do Sistema Implementado

### Stack Tecnológico Escolhido
```
┌─────────────────────────────────────────────┐
│         FRONTEND - Web Responsiva            │
│         (HTML5 + CSS3 + JavaScript)          │
│         Mobile-First, Acessível              │
└────────────────────┬────────────────────────┘
                    │
┌────────────────────▼────────────────────────┐
│      Camada de Aplicação - Funcionalidades   │
│  - Autenticação (LocalStorage)               │
│  - Editor de Respostas                       │
│  - Timestamp Automático                      │
│  - Simulação Blockchain                      │
└────────────────────┬────────────────────────┘
                    │
┌────────────────────▼────────────────────────┐
│   Blockchain Simulada (Pronto para Solana)   │
│  - Hash SHA-256 das Respostas                │
│  - Timestamp Imutável                        │
│  - Geração de Transações                     │
└─────────────────────────────────────────────┘
```

---

## 🛠️ 2. Tecnologias & Decisões de Design

### Frontend
- **HTML5:** Estrutura semântica e acessível
- **CSS3:** Grid/Flexbox para responsividade total
- **JavaScript Vanilla:** Sem dependências, código limpo e performático
- **LocalStorage API:** Persistência de dados offline

### Recursos Implementados
- ✅ Sistema de autenticação com criar conta
- ✅ Dashboard intuitivo com tarefas do dia
- ✅ Editor WYSIWYG para respostas
- ✅ Auto-save de rascunhos
- ✅ Registro de atividade (simulação blockchain)
- ✅ Histórico de envios com status
- ✅ Visualização de transações blockchain
- ✅ Indicador de prazo (Verde/Amarelo/Vermelho)
- ✅ Completamente responsivo para mobile

---

## 📊 3. Estrutura de Dados

### Usuário (LocalStorage)
```json
{
  "id": "aluno_001",
  "name": "João Silva",
  "email": "joao@escola.com",
  "wallet": "DEV_WALLET_001",
  "token": "jwt_token_simulado"
}
```

### Tarefa
```json
{
  "id": "task_001",
  "title": "Análise da Revolução Francesa",
  "description": "Responda: Causas e consequências da Revolução",
  "subject": "História",
  "dueDate": "2026-05-12",
  "status": "pending",
  "priority": "high"
}
```

### Envio & Blockchain
```json
{
  "id": "submit_001",
  "taskId": "task_001",
  "userId": "aluno_001",
  "responseHash": "sha256_hash_da_resposta",
  "timestamp": "2026-05-11T14:30:00Z",
  "transactionId": "5jB7nK9mL2pQ8vX3yZ1aB4cD6eF9gH0iJ",
  "status": "confirmed",
  "blockchainStatus": "on-chain"
}
```

---

## 🚀 4. Funcionalidades Principais

### 4.1 Autenticação
- Registro e login simplificados
- Dados armazenados no navegador (LocalStorage)
- Simulação de wallet Solana
- Logout seguro

### 4.2 Dashboard Principal
- **Visão geral:** Tarefas pendentes, em andamento e concluídas
- **Indicadores de prazo:**
  - 🟢 Verde: Prazo confortável (mais de 2 dias)
  - 🟡 Amarelo: Prazo próximo (1-2 dias)
  - 🔴 Vermelho: Crítico (menos de 1 dia)
- **Filtros:** Por disciplina, status, urgência

### 4.3 Editor de Atividades
- Edição de texto com formatação básica
- Auto-save a cada 10 segundos
- Indicador de sincronização
- Backup automático em LocalStorage
- Contador de caracteres

### 4.4 Sistema de Registro (Blockchain)
1. Aluno clica em "Registrar na Blockchain"
2. Sistema gera SHA-256 da resposta
3. Smart Contract simulado registra:
   - Hash da resposta
   - Timestamp exato
   - ID do aluno
   - ID da tarefa
4. Transação retorna com:
   - ID da transação
   - Link para visualização no explorador
   - Status "Confirmada"

### 4.5 Histórico de Atividades
- Lista de todos os envios
- Data e hora exatas
- Status (Rascunho, Enviado, Confirmado)
- Hash da transação
- Opção para visualizar ou reenviar

---

## 📱 5. Jornada do Usuário

```
┌─────────────────┐
│ Fazer Login     │
└────────┬────────┘
         ↓
┌─────────────────────────────┐
│ Ver Dashboard com Tarefas   │
│ - Organizadas por Disciplina│
│ - Indicador de Prazo        │
└────────┬────────────────────┘
         ↓
┌──────────────────────────┐
│ Selecionar uma Tarefa    │
│ - Ler Enunciado          │
│ - Começar Resposta       │
└────────┬─────────────────┘
         ↓
┌──────────────────────────┐
│ Editar Resposta          │
│ - Auto-save              │
│ - Rascunho Salvo         │
└────────┬─────────────────┘
         ↓
┌──────────────────────────┐
│ Enviar para Blockchain   │
│ - Confirmar resposta     │
│ - Gerar SHA-256          │
└────────┬─────────────────┘
         ↓
┌──────────────────────────┐
│ Receber Confirmação      │
│ - TX ID                  │
│ - Link Solscan           │
│ - Status: On-Chain ✓     │
└──────────────────────────┘
```

---

## ✅ 6. Entregáveis do Dia 4

### 🟢 Backend Lógico
- [x] Sistema de autenticação funcional
- [x] Geração de hashes SHA-256
- [x] Persistência de dados no navegador
- [x] Simulação de blockchain com transações
- [x] Timestamp automático e imutável

### 🟡 Frontend Completo
- [x] Layout responsivo e moderno
- [x] Dashboard intuitivo
- [x] Editor de tarefas com auto-save
- [x] Visualização de histórico
- [x] Indicadores visuais de status

### 🔵 Integração & Testes
- [x] Fluxo completo: Login → Editar → Enviar → Confirmação
- [x] Persistência de dados entre recargas
- [x] Responsividade testada em mobile
- [x] Validações de entrada

### 🟣 Documentação Técnica
- [x] Estrutura clara das APIs internas
- [x] Instruções de extensão para Solana real
- [x] Preparação para integração com Web3.js

---

## 🔗 7. Próximas Etapas (Dia 5+)

```
1. INTEGRAÇÃO COM SOLANA (Web3.js)
   └─ Substituir simulação por transações reais
   └─ Conectar Phantom Wallet

2. SMART CONTRACT (Rust + Anchor)
   └─ Desenvolver programa Solana
   └─ Testar em Devnet
   └─ Migrar para Mainnet

3. BACKEND (Node.js + Express)
   └─ API para sincronizar com Caderno Digital
   └─ Banco de dados PostgreSQL
   └─ Autenticação com JWT

4. DEPLOY & PUBLICAÇÃO
   └─ Hospedar no Vercel
   └─ Configurar domínio
   └─ Testes de segurança
```

---

## 📈 Status da Construção

| Componente | Status | Responsável |
|-----------|--------|-------------|
| Frontend | ✅ Completo | Milena |
| Blockchain (Simulada) | ✅ Completo | Fábio |
| API Backend | ⏳ Planejado | Fábio |
| Smart Contract Solana | ⏳ Planejado | Fábio |
| Deploy | ⏳ Próximo Sprint | Ambos |

---

## 🎯 Conclusão

O **Dia 4** marca a transição de ideias para **código funcional**. Implementamos um MVP completo que:

✨ **Resolve o problema real:** Aluno trabalhador pode registrar atividades a qualquer hora
🔐 **Utiliza blockchain:** Garantia imutável de entrega
📱 **É mobile-first:** Acessível de qualquer celular
🚀 **Escala para Solana:** Base técnica pronta para integração real

**EduChain agora é um sistema vivo, pronto para impressionar investidores e educadores.**

---
*Documento finalizado em 11 de Maio de 2026*
*Fase: Construção Funcional ✅*
