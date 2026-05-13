# 📋 EduChain MVP | O que Cada Parte Faz

**Documento rápido:** Explicação clara do propósito de cada componente

---

## 🎯 Resumo Executivo

O EduChain é um **Caderno Digital com Blockchain** que permite que estudantes:

✅ **Façam** tarefas em qualquer hora  
✅ **Guardem** respostas com backup automático  
✅ **Registrem** de forma imutável na blockchain  
✅ **Comprovem** entrega com ID irrepetível  
✅ **Acessem** histórico completo de tudo

---

## 📂 Arquivos & Funções

### 1️⃣ **index.html** - A Interface (O que o usuário vê)

**O que faz:** Desenha toda a tela do aplicativo

```
┌─────────────────────────────────────┐
│  📚 EduChain    [Juan Silva]  [Sair]│  ← Header
├──────────────────────────────────────┤
│ 📊 | ├─ Dashboard   [Conteúdo]     │
│ ✏️  | ├─ Tarefas    [Conteúdo]     │
│ 📝 | ├─ Editor     [Conteúdo]     │  ← Sidebar + Views
│ ⏱️ | ├─ Histórico  [Conteúdo]     │
│ ⛓️ | └─ Blockchain [Conteúdo]     │
└──────────────────────────────────────┘
```

**Componentes principais:**

| Componente | Função |
|-----------|--------|
| **Login Screen** | Tela de entrada (email/senha) |
| **Header** | Logo, carteira, nome usuário, logout |
| **Sidebar** | Menu navegação (5 seções) |
| **Dashboard View** | Estatísticas e resumo |
| **Tasks View** | Lista de tarefas filtráveis |
| **Editor View** | Campo para escrever resposta |
| **History View** | Histórico de envios |
| **Blockchain View** | Transações da blockchain |
| **Modals** | Popups (confirmar, sucesso) |

**Em código:**
```html
- 520 linhas de HTML
- Estrutura semântica (main, nav, aside, etc)
- Labels descritivos (id, class, data-attributes)
- Acessibilidade (alt text, aria-labels)
```

---

### 2️⃣ **style.css** - O Design (Como fica bonito)

**O que faz:** Dar estilo visual a tudo

```
┌─────────────────────────────────────┐
│ ├─ Cores (roxo, azul, verde)       │
│ ├─ Fontes (Segoe UI, monospace)     │
│ ├─ Layout (Grid, Flexbox)          │
│ ├─ Animações (Fade-in, Pulse)      │
│ ├─ Responsivo (Mobile/Tablet/PC)   │
│ └─ Temas (Light/Dark ready)        │
└─────────────────────────────────────┘
```

**Seções principais:**

| Seção | Função |
|-------|--------|
| **Variáveis CSS** | Cores, dimensões (reutilizáveis) |
| **Layout Base** | Grid, Flexbox, containers |
| **Componentes** | Botões, cards, inputs |
| **Screens** | Autenticação, aplicação |
| **Views** | Estilos específicos de cada view |
| **Modals** | Popups e overlays |
| **Responsive** | Media queries para diferentes telas |

**Em código:**
```css
:root {
  --primary: #6366f1;     /* Roxo principal */
  --secondary: #8b5cf6;   /* Roxo escuro */
  --accent: #ec4899;      /* Rosa */
  /* ... mais cores */
}

@media (max-width: 768px) {
  /* Layout mobile-first */
}
```

---

### 3️⃣ **app.js** - A Lógica (O "cérebro")

**O que faz:** Tudo que faz o app funcionar

```
[Usuário clica] → [JavaScript detecta] → [Ação executada] → [Interface atualiza]
```

**Principais funções:**

#### Autenticação (Login)
```javascript
setupAuth()           - Inicializa formulários
loginUser()           - Cria usuário + salva dados
logout()              - Limpa tudo + volta ao login
checkAuth()           - Verifica se já está logado
```

#### Dashboard
```javascript
updateDashboard()     - Atualiza números e Cards
                      ├─ Tarefas pendentes
                      ├─ Concluídas
                      ├─ On-chain
                      └─ Hashes gerados
```

#### Tarefas
```javascript
updateTasksList()     - Renderiza cards de tarefas
selectTaskForEditor() - Abre tarefa selecionada
filterBySubject()     - Filtra por disciplina
calculateDaysLeft()   - Quantos dias faltam
setTaskPriority()     - Define urgência (cores)
```

#### Editor
```javascript
setupEditor()         - Inicializa o campo de texto
autoSaveResponse()    - Salva a cada 10 segundos (auto)
saveDraft()           - Salva manualmente (botão)
insertFormatting()    - Bold, itálico, links
validateResponse()    - Mínimo 10 caracteres
updateCharCount()     - Mostra quantos caracteres
```

#### Blockchain
```javascript
prepareSubmit()       - Confirma envio (modal)
submitToBlockchain()  - Registra na blockchain
confirmSubmit()       - Aguarda confirmação
showSuccessModal()    - Mostra ID da transação
copyTxId()           - Copiar para área de transferência
```

#### Histórico
```javascript
updateHistoryView()   - Lista todos os envios
formatTimestamp()     - Data/hora legível
```

#### Blockchain View
```javascript
updateBlockchainView() - Mostra transações
refreshTransactions()  - Atualiza lista
displayTxDetails()     - Detalhes de cada TX
```

---

### 4️⃣ **blockchain.js** - Segurança (Criptografia)

**O que faz:** Simula blockchain Solana

```
┌────────────────────────────────────┐
│ Sua resposta:                      │
│ "A Revolução Francesa foi..."      │
└────────────────────────────────────┘
             ↓
     [SHA-256 Hash]
             ↓
┌────────────────────────────────────┐
│ Hash resultante (único):           │
│ a3f9e2c1d5b8f4g6h9i2j5k8l1m4n7o  │
└────────────────────────────────────┘
             ↓
    [Registra na "blockchain"]
             ↓
┌────────────────────────────────────┐
│ Transação criada:                  │
│ {                                  │
│   id: "5jB7nK9mL2pQ8vX3yZ1aB...", │
│   hash: "a3f9e2c1d5b8f4...",      │
│   timestamp: "2026-05-11T14:30",   │
│   status: "confirmed"              │
│ }                                  │
└────────────────────────────────────┘
```

**Classe: BlockchainSimulator**

| Método | O que faz |
|--------|-----------|
| **generateHash()** | Converte resposta em hash único (SHA-256) |
| **generateTransactionId()** | Cria ID único estilo Solana |
| **createTransaction()** | Cria nova transação |
| **confirmTransaction()** | Marca como confirmada (irreversível) |
| **getTransaction()** | Busca uma transação específica |
| **getAllTransactions()** | Lista todas as transações |
| **saveToStorage()** | Salva em localStorage (persistência) |
| **loadFromStorage()** | Recupera ao recarregar página |

**Em código:**
```javascript
class BlockchainSimulator {
  async generateHash(data) {
    // SHA-256 usando Web Crypto API
    // Resultado: hash único de 64 caracteres
  }
  
  async createTransaction(data) {
    // Nova transação com ID único
    // Timestamp imutável
  }
  
  async confirmTransaction(txId) {
    // Marca como confirmada
    // 32 confirmações (equivalente Solana)
  }
}
```

---

## 🔄 Como Tudo Funciona Junto

### Cenário Completo: Enviar uma Tarefa

```
1. INTERFACE (index.html)
   └─ Usuário vê formulário de login
      
2. CSS (style.css)
   └─ Formulário é bonito e responsivo
      
3. Javascript (app.js)
   └─ setupAuth() inicializa listeners
      
4. USUÁRIO
   └─ Digita email "joao@escola.com"
   └─ Digita senha "123456"
   └─ Clica botão "Entrar"
      
5. JAVASCRIPT (app.js)
   └─ loginForm.onsubmit é disparado
   └─ loginUser() cria objeto usuário
   └─ Salva em localStorage
   └─ showAppScreen() muda para interface principal
      
6. INTERFACE (index.html)
   └─ Dashboard apareça
      
7. JAVASCRIPT (app.js)
   └─ initializeApp() é executada
   └─ setupNavigation() ativa cliques
   └─ updateDashboard() calcula números
   └─ updateTasksList() renderiza tarefas
      
8. USUÁRIO
   └─ Vê 5 tarefas disponíveis
   └─ Clica na tarefa de História
      
9. JAVASCRIPT (app.js)
   └─ selectTaskForEditor("task_001")
   └─ state.currentTask é setado
      
10. INTERFACE (index.html)
    └─ Editor aparece com info da tarefa
       
11. CSS (style.css)
    └─ Editor é estilizado
       
12. JAVASCRIPT (app.js)
    └─ setupEditor() inicializa listeners
       
13. USUÁRIO
    └─ Escreve resposta "A Revolução Francesa foi..."
    └─ Vê contador: "450 caracteres"
    └─ Vê status: "✅ Salvo"
       
14. JAVASCRIPT (app.js)
    └─ responseEditor.oninput dispara
    └─ autoSaveResponse() salva em localStorage
    └─ draft_task_001 agora tem conteúdo
       
15. USUÁRIO
    └─ Clica "⛓️ Registrar na Blockchain"
       
16. JAVASCRIPT (app.js)
    └─ prepareSubmit() valida resposta
    └─ Modal de confirmação aparece
       
17. USUÁRIO
    └─ Clica "Confirmar Envio"
       
18. JAVASCRIPT (app.js)
    └─ submitToBlockchain() é executada
       
19. JAVASCRIPT (blockchain.js)
    └─ blockchain.createTransaction() é chamada
    └─ generateHash() cria SHA-256 da resposta
    └─ generateTransactionId() cria ID único
    └─ createTransaction() retorna TX com status "pending"
       
20. JAVASCRIPT (app.js)
    └─ setTimeout(2000ms) aguarda "confirmação"
       
21. JAVASCRIPT (blockchain.js)
    └─ confirmTransaction(txId)
    └─ TX status muda para "confirmed"
    └─ Confirmações = 32
    └─ saveToStorage() persiste em localStorage
       
22. JAVASCRIPT (app.js)
    └─ showSuccessModal(txId)
       
23. INTERFACE (index.html)
    └─ Modal de sucesso aparece
       
24. CSS (style.css)
    └─ Modal é estilizado com sucesso verde
       
25. USUÁRIO
    └─ Vê TX ID: "5jB7nK9mL2pQ8vX3yZ1aB4cD6eF9gH0iJ"
    └─ Clica para copiar
    └─ Aparece "ID copiado!" em popup
       
26. USUÁRIO
    └─ Clica "Fechar"
       
27. JAVASCRIPT (app.js)
    └─ Modal fecha
    └─ Editor limpa (value = "")
    └─ updateDashboard() é chamada
    └─ Dashboard mostra: "Concluídas: 1", "On-Chain: 1"
       
28. INTERFACE (index.html)
    └─ Dashboard atualizado
    └─ "✅ Concluídas: 1"
    └─ "⛓️ On-Chain: 1"
    └─ "🔐 Hashes Gerados: 1"
       
FIM: Tarefa registrada com sucesso na blockchain! ✅
```

---

## 📊 O que cada arquivo influencia

```
┌─────────────────┐
│     index.html  │  Define ESTRUTURA
│  (HTML5)        │  - Elementos (botões, inputs, cards)
│                 │  - Layout (header, sidebar, main)
│  ↓              │  - Accessibility
│  Cria elementos │
└─────────────────┘
        ↓
┌─────────────────┐
│     style.css   │  Define APARÊNCIA  
│  (CSS3)         │  - Cores (roxo, azul)
│                 │  - Dimensões (padding, margin)
│  ↓              │  - Animações (fade-in)
│  Estiliza       │  - Responsividade (mobile)
└─────────────────┘
        ↓
┌─────────────────┐
│     app.js      │  Define COMPORTAMENTO
│  (JavaScript)   │  - Cliques (onclick)
│                 │  - Salvamentos (auto-save)
│  ↓              │  - Atualizações (DOM updates)
│  Controla       │  - Validações
└─────────────────┘
        ↓
┌─────────────────┐
│  blockchain.js  │  Define SEGURANÇA
│  (JavaScript)   │  - Hashes (SHA-256)
│                 │  - Transações (imutáveis)
│  ↓              │  - Persistência (localStorage)
│  Protege        │  - Confirmações
└─────────────────┘
        ↓
    USER SEES
   EXPERIENCE
```

---

## 💾 Dados Salvos Onde

| Dados | Local | Formato |
|-------|-------|---------|
| **Usuário** | localStorage[`educhain_user`] | JSON |
| **Rascunhos** | localStorage[`draft_[taskId]`] | String (texto) |
| **Submissões** | localStorage[`educhain_submissions`] | JSON |
| **Blockchain** | localStorage[`blockchain_transactions`] | JSON |
| **Tarefas** | state.tasks (memória) | Array JS |

---

## 🎯 Propósito de Cada Seção

### Dashboard 📊
**Para:** Verificar progresso geral  
**Mostra:** Números (quantas tarefas, quantas concluídas, etc)  
**Ajuda:** Saber o que fazer a seguir

### Tarefas ✏️
**Para:** Ver lista de atividades  
**Mostra:** Todos os trabalhos, disciplina, prazo, urgência  
**Ajuda:** Escolher qual tarefa fazer

### Editor 📝
**Para:** Escrever a resposta  
**Mostra:** Campo de texto grande com formatação  
**Ajuda:** Responder com conforto e segurança (auto-save)

### Histórico ⏱️
**Para:** Ver o que já foi entregue  
**Mostra:** Lista de envios com data, hash, TX ID  
**Ajuda:** Ter "prova" de que entregou

### Blockchain ⛓️
**Para:** Tecnicamente verificar tudo  
**Mostra:** Transações, IDs, hashes, status  
**Ajuda:** Educador ou auditor verificar autenticidade

---

## 🚀 Resumo Final

| O que | Arquivo | O que faz |
|-------|---------|-----------|
| **Interface** | index.html | Desenha tudo |
| **Estilo** | style.css | Deixa bonito |
| **Lógica** | app.js | Faz funcionar |
| **Segurança** | blockchain.js | Protege dados |

**Resultado:** Um caderno digital seguro, bonito e funcional! ✨

---

*Documentação clara e visual ✅*
