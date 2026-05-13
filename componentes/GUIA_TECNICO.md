# 🛠️ EduChain MVP | Guia Técnico Detalhado

**Versão:** 1.0  
**Público:** Desenvolvedores, Integradores  
**Data:** 11 de .Maio de 2026

---

## 📖 Índice
1. [Estrutura de Arquivos](#estrutura-de-arquivos)
2. [API Interna](#api-interna)
3. [State Management](#state-management)
4. [Componentes Detalhados](#componentes-detalhados)
5. [Fluxos de Dados](#fluxos-de-dados)
6. [Integração Backend](#integração-backend)
7. [Troubleshooting](#troubleshooting)

---

## 📁 Estrutura de Arquivos

```
componentes/
├── index.html          # Interface (HTML5 semântico)
├── style.css           # Estilos (CSS3, 850+ linhas)
├── app.js              # Lógica aplicação (800+ linhas)
├── blockchain.js       # Simulador Solana (120 linhas)
├── dia4.md             # Documentação técnica Dia 4
├── README.md           # Esta documentação
└── GUIA_USO.md        # Guia do usuário (futura)

Estrutura Local (LocalStorage):
├── educhain_user                    # Objeto usuário
├── draft_task_001                   # Rascunho tarefa 1
├── draft_task_002                   # Rascunho tarefa 2
├── blockchain_transactions          # Array de transações
└── ...
```

---

## 🔧 API Interna

### Estado Global

```javascript
const state = {
  user: {
    id: "user_1715423400000",
    name: "João Silva",
    email: "joao@escola.com",
    wallet: "DEV_WALLET_ABC123XYZ",
    token: "jwt_token_simulado_..."
  },
  
  currentTask: {
    id: "task_001",
    title: "Análise da Revolução Francesa",
    description: "Responda: Quais foram as...",
    subject: "História",
    dueDate: "2026-05-12",
    priority: "high",
    status: "pending"
  },
  
  currentResponse: "A Revolução Francesa foi...",
  
  tasks: [...],  // Array de tarefas
  
  submissions: [
    {
      id: "submit_001",
      taskId: "task_001",
      responsHash: "a3f9e2c1d5b8...",
      timestamp: "2026-05-11T14:30:00Z",
      status: "confirmed"
    }
  ],
  
  autoSaveInterval: null
};
```

### Funções de Autenticação

#### `setupAuth()`
```javascript
// Descrição: Inicializa listeners de autenticação
// Parametros: Nenhum
// Retorno: Void
// Inicializa tab switching e form submissions
```

#### `loginUser(name, email)`
```javascript
// Descrição: Realiza login do usuário
// Parâmetros:
//   - name (String): Nome do usuário
//   - email (String): Email
// Retorno: Void
// Efeitos: Salva user em localStorage, mostra app

loginUser("João Silva", "joao@escola.com");

// Resultado:
// - state.user é populado
// - Dados salvos em localStorage
// - Interface muda para app screen
```

#### `logout()`
```javascript
// Descrição: Realiza logout do usuário
// Parametros: Nenhum
// Retorno: Void
// Efeitos: Limpa dados, volta para login

logout();

// Resultado:
// - localStorage vazio
// - state.user = null
// - Página recarrega para login
```

### Funções de Dashboard

#### `updateDashboard()`
```javascript
// Descrição: Atualiza todos os números do dashboard
// Parametros: Nenhum
// Retorno: Void

// Atualiza:
// - stat.Pending (tarefas pendentes)
// - stat.Completed (tarefas concluídas)
// - stat.OnChain (registros em blockchain)
// - stat.Hashes (total de hashes gerados)
// - Tarefas urgentes (< 2 dias)
// - Últimos envios
```

### Funções de Tarefas

#### `updateTasksList()`
```javascript
// Descrição: Renderiza lista de tarefas com filtro
// Parametros: Nenhum (lê filter do DOM)
// Retorno: Void

// Renders: Grid de tarefas com cards

const filter = document.getElementById('filterSubject').value;
// Se "Matemática" → mostra só tarefas de Matemática
// Se "" → mostra todas
```

#### `selectTaskForEditor(taskId)`
```javascript
// Descrição: Seleciona tarefa para edição
// Parâmetros:
//   - taskId (String): ID da tarefa
// Retorno: Void

selectTaskForEditor("task_001");

// Resultado:
// - state.currentTask é setado
// - Editor é atualizado com info da tarefa
// - Rascunho anterior é carregado (se existir)
// - View troca para editor
```

### Funções de Editor

#### `autoSaveResponse()`
```javascript
// Descrição: Salva rascunho automaticamente
// Parametros: Nenhum
// Retorno: Void
// Chamado: A cada keystroke no editor

// Salva em localStorage['draft_' + taskId]
// Mostra status: "Salvando..." → "✅ Salvo"

const response = document.getElementById('responseEditor').value;
localStorage.setItem('draft_' + state.currentTask.id, response);
```

#### `saveDraft()`
```javascript
// Descrição: Salva manual do rascunho
// Parametros: Nenhum
// Retorno: Void
// Chamado: Ao clicar botão "Salvar Rascunho"

saveDraft();
// Resultado: Modal com "Rascunho salvo com sucesso!"
```

#### `insertFormatting(before, after)`
```javascript
// Descrição: Insere formatação markdown no editor
// Parâmetros:
//   - before (String): Caracteres antes
//   - after (String): Caracteres depois
// Retorno: Void

insertFormatting('**', '**');  // Negrito
insertFormatting('_', '_');    // Itálico
insertFormatting('[', '](url)'); // Link

// Resultado: Formatação inserida onde cursor estava
```

### Funções de Blockchain

#### `submitToBlockchain()`
```javascript
// Descrição: Submete resposta para blockchain
// Parametros: Nenhum
// Retorno: Promise (async)
// Chamado: Ao confirmar submissão

await submitToBlockchain();

// Processo:
// 1. Cria transação blockchain
// 2. Aguarda 2 segundos (confirmação)
// 3. Salva submission em state
// 4. Limpa localStorage draft
// 5. Mostra modal de sucesso
// 6. Atualiza dashboard
```

### Funções de Histórico

#### `updateHistoryView()`
```javascript
// Descrição: Renderiza história de atividades
// Parametros: Nenhum
// Retorno: Void

// Lista todos os submissions com:
// - Título da tarefa
// - Data/Hora
// - Hash SHA-256
// - TX ID
// - Status
```

### Funções de Modais

#### `setupModals()`
```javascript
// Descrição: Inicializa todos os event listeners de modais
// Parametros: Nenhum
// Retorno: Void

// Modais:
// 1. Task Selector - Selecionar tarefa
// 2. Confirm Submit - Confirmar envio
// 3. Success - Mostrar sucesso

// Features:
// - Close button
// - Click outside to close
// - Submit/Cancel buttons
```

#### `showSuccessModal(txId)`
```javascript
// Descrição: Mostra modal de sucesso com TX ID
// Parâmetros:
//   - txId (String): ID da transação
// Retorno: Void

showSuccessModal("5jB7nK9mL2pQ8vX3...");

// Resultado:
// - Modal aparece com TX ID
// - Botão para copiar ID
// - Link para Solscan (futuro)
```

---

## 📊 State Management

### Fluxo de State

```
User Action
    ↓
Event Listener (onclick, onchange, etc)
    ↓
Handler Function
    ↓
Modify state object
    ↓
Update localStorage (if needed)
    ↓
Re-render DOM
    ↓
User sees change
```

### Exemplo: Seleção de Tarefa

```javascript
// 1. User clica em card de tarefa
// 2. selectTaskForEditor("task_001") é chamada
// 3. state.currentTask = tasks[0]
// 4. DOM é atualizado:
//    - Title exibido
//    - Description renderizada
//    - Editor focado

// 5. User digita
// 6. auto-save event triggered
// 7. Draft salvo em localStorage
// 8. Status "✅ Salvo" exibido
```

### Persistência de Dados

#### Dados Salvos em LocalStorage

| Chave | Tipo | Descrição |
|-------|------|-----------|
| `educhain_user` | JSON | Objeto do usuário |
| `draft_[taskId]` | String | Rascunho da resposta |
| `educhain_submissions` | JSON | Array de envios |
| `blockchain_transactions` | JSON | Transações blockchain |

#### Exemplo de Leitura

```javascript
// Recuperar usuário
const user = JSON.parse(localStorage.getItem('educhain_user'));
console.log(user.name); // "João Silva"

// Recuperar rascunho
const draft = localStorage.getItem('draft_task_001');
console.log(draft); // "A Revolução Francesa foi..."

// Recuperar submissions
const submissions = JSON.parse(localStorage.getItem('educhain_submissions'));
console.log(submissions.length); // 3
```

---

## 🏗️ Componentes Detalhados

### Header Component

```html
<header class="header">
  <div class="header-content">
    <!-- Logo + Wallet -->
    <div class="header-left">
      <h2 class="app-title">📚 EduChain</h2>
      <div class="wallet-info">
        <span>DEV_WALLET_ABC123XYZ</span>
      </div>
    </div>
    
    <!-- User + Logout -->
    <div class="header-right">
      <span id="userName">Usuário</span>
      <button id="logoutBtn">🚪 Sair</button>
    </div>
  </div>
</header>
```

**CSS Classes:**
- `.header` - Container principal
- `.header-content` - Flex row
- `.header-left` - Logo + wallet
- `.header-right` - User + logout
- `.wallet-address` - Código monospace

---

### Navbar Components

```html
<aside class="sidebar">
  <nav class="nav-menu">
    <button class="nav-item active" data-view="dashboard">
      <span class="icon">📊</span>
      <span>Dashboard</span>
    </button>
    <!-- Mais 4 itens -->
  </nav>
</aside>
```

**Behavior:**
- Click em nav-item → Ativa view correspondente
- CSS class `.active` é adicionado
- Apenas 1 view visível por vez

---

### Task Card Component

```html
<div class="task-card">
  <div class="task-header">
    <span class="task-title">Análise da Revolução</span>
    <span class="badge priority-high">HIGH</span>
  </div>
  
  <div class="task-desc">Preview texto...</div>
  
  <div class="task-footer">
    <span class="task-subject">História</span>
    <span class="task-due">Prazo: 12/05/2026</span>
    <span class="task-status">1 dias</span>
  </div>
</div>
```

**Variações:**
- `.priority-high` - Vermelho (urgente)
- `.priority-medium` - Amarelo (próximo)
- `.priority-low` - Verde (confortável)

---

### Editor Component

```html
<div class="editor-panel">
  <!-- Toolbar -->
  <div class="editor-toolbar">
    <button id="boldBtn">🅱️ Bold</button>
    <!-- Mais buttons -->
  </div>
  
  <!-- Text Area -->
  <textarea id="responseEditor" 
    class="response-editor"
    placeholder="Escreva sua resposta aqui...">
  </textarea>
  
  <!-- Status -->
  <div class="editor-footer">
    <span class="char-count">0 caracteres</span>
    <span id="autoSaveStatus">✅ Salvo</span>
  </div>
</div>
```

**Keyboard Shortcuts (Futura):**
- `Ctrl+B` - Bold
- `Ctrl+I` - Italic
- `Ctrl+S` - Save Draft

---

### Modal Component

```html
<div id="confirmSubmitModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>Confirmar Registro</h3>
      <button class="close-modal">&times;</button>
    </div>
    
    <div class="modal-body">
      <!-- Conteúdo -->
    </div>
    
    <div class="modal-footer">
      <button class="btn btn-secondary">Cancelar</button>
      <button class="btn btn-primary">Confirmar</button>
    </div>
  </div>
</div>
```

**Comportamento:**
- `.modal.active` - Visível com overlay
- Click em close-modal → Fecha
- Click fora do modal → Fecha (escape key)

---

## 🔄 Fluxos de Dados

### Fluxo: Autenticação

```
┌─────────────────────────────┐
│ User clica "Entrar"         │
└────────────┬────────────────┘
             ↓
┌─────────────────────────────┐
│ loginForm.onsubmit          │
│ - Lê email/senha            │
└────────────┬────────────────┘
             ↓
┌─────────────────────────────┐
│ loginUser(name, email)      │
│ - Cria state.user           │
│ - Salva em localStorage     │
└────────────┬────────────────┘
             ↓
┌─────────────────────────────┐
│ showAppScreen()             │
│ - Muda display screens      │
│ - Chama initializeApp()     │
└────────────┬────────────────┘
             ↓
┌─────────────────────────────┐
│ initializeApp()             │
│ - setupNavigation()         │
│ - setupDashboard()          │
│ - setupEditor()             │
│ - updateDashboard()         │
│ - updateTasksList()         │
└─────────────────────────────┘
```

### Fluxo: Submissão Blockchain

```
┌──────────────────────────────┐
│ User clica "Registrar"       │
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ prepareSubmit()              │
│ - Valida resposta (10+ chars)│
│ - Mostra modal confirmação   │
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ User clica "Confirmar"       │
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ submitToBlockchain() async   │
│ - blockchain.createTransaction()
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ BlockchainSimulator:         │
│ 1. Gera SHA-256 da resposta  │
│ 2. Cria TX ID único          │
│ 3. Marca status: "pending"   │
│ 4. Retorna transação         │
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ setTimeout 2000ms            │
│ (Simula validação)           │
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ blockchain.confirmTransaction()
│ - TX status → "confirmed"    │
│ - confirmations → 32         │
│ - Salva em localStorage      │
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ showSuccessModal(txId)       │
│ - Exibe TX ID para copiar    │
│ - Mensagem de sucesso        │
└─────────────┬────────────────┘
              ↓
┌──────────────────────────────┐
│ User clica "Fechar"          │
│ - Editor zera                │
│ - Modal fecha                │
│ - Dashboard atualiza         │
└──────────────────────────────┘
```

---

## 🔌 Integração Backend

### Passo 1: Remover Simulação

Substitua o `BlockchainSimulator`:

```javascript
// REMOVER:
class BlockchainSimulator { ... }

// ADICIONAR:
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { Wallet } from '@project-serum/anchor';

const connection = new Connection(
  clusterApiUrl('devnet'), // 'mainnet-beta' para produção
  'processed'
);
```

### Passo 2: Criar Backend API

```javascript
// API Endpoints esperados:

POST /api/auth/register
  ├─ body: { name, email, password, matricula }
  └─ response: { user, token }

POST /api/auth/login
  ├─ body: { email, password }
  └─ response: { user, token }

GET /api/tasks
  ├─ headers: { Authorization: "Bearer token" }
  └─ response: [ {...task}, ... ]

POST /api/submissions
  ├─ headers: { Authorization: "Bearer token" }
  ├─ body: { taskId, response, hash }
  └─ response: { txId, hash, timestamp }

GET /api/submissions
  ├─ headers: { Authorization: "Bearer token" }
  └─ response: [ {...submission}, ... ]

GET /api/blockchain/transactions
  ├─ headers: { Authorization: "Bearer token" }
  └─ response: [ {...tx}, ... ]
```

### Passo 3: Substituir Fetch Local por API

```javascript
// ANTES (Local):
state.tasks = sampleTasks;

// DEPOIS (API):
async function loadTasks() {
  const response = await fetch('/api/tasks', {
    headers: {
      'Authorization': `Bearer ${state.user.token}`
    }
  });
  state.tasks = await response.json();
}
```

### Passo 4: Integração Web3.js Real

```javascript
// Smart Contract interaction
async function submitToBlockchain() {
  const response = document.getElementById('responseEditor').value;
  
  // Conectar wallet do usuário
  const provider = new AnchorProvider(
    connection,
    window.solana, // Phantom Wallet
    opts
  );
  
  // Criar transação real
  const tx = await program.methods
    .submitTask(
      state.currentTask.id,
      response,
      responseHash
    )
    .accounts({
      student: provider.wallet.publicKey,
      // ... mais contas
    })
    .signers([provider.wallet.payer])
    .rpc();
  
  return tx;
}
```

---

## 🐛 Troubleshooting

### Problema: Dashboard não atualiza

**Solução:**
```javascript
// Forçar atualização
updateDashboard();

// Ou verificar state:
console.log(state.tasks);
console.log(state.submissions);
```

### Problema: Editor não salva rascunho

**Solução:**
```javascript
// Verificar localStorage
console.log(localStorage.getItem('draft_task_001'));

// Ou limpar cache
localStorage.clear();

// Recarregar página
location.reload();
```

### Problema: Blockchain transaction falha

**Solução:**
```javascript
// Verificar console
console.error(); // Veja o erro exato

// Validar dados
console.log(state.currentTask);
console.log(document.getElementById('responseEditor').value);

// Verificar blockchain simulator
console.log(blockchain.getAllTransactions());
```

### Problema: Modal não fecha

**Solução:**
```javascript
// Fechar manualmente
document.getElementById('confirmSubmitModal').classList.remove('active');

// Ou checar listeners:
// - Clique no botão close-modal
// - Clique no botão de ação
// - Clique fora do modal
```

---

## 📚 Referências

### Web APIs Utilizadas
- [localStorage API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API)
- [Web Crypto API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Crypto_API)
- [Event API](https://developer.mozilla.org/pt-BR/docs/Web/API/Event)
- [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)

### Frameworks Futuros
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Phantom Wallet](https://phantom.app/)

### Padrões de Design
- MVP (Model-View-Presenter)
- Observer Pattern (Event Listeners)
- Singleton Pattern (state object)
- Factory Pattern (Component creation)

---

**Documentação Técnica Completa ✅**  
**Pronto para Desenvolvimento Backend**
