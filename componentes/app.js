// ========================================
// EDUCHAIN MVP - MAIN APPLICATION
// ========================================

// Global State
const state = {
    user: null,
    currentTask: null,
    currentResponse: null,
    tasks: [],
    submissions: [],
    autoSaveInterval: null
};

// Sample Tasks Data
const sampleTasks = [
    {
        id: 'task_001',
        title: 'Análise da Revolução Francesa',
        description: 'Responda: Quais foram as principais causas da Revolução Francesa e suas consequências para a sociedade europeia? (Mínimo 300 caracteres)',
        subject: 'História',
        dueDate: '2026-05-12',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 'task_002',
        title: 'Resolução de Equações Quadráticas',
        description: 'Resolva as seguintes equações:\n1) x² + 5x + 6 = 0\n2) 2x² - 8x + 6 = 0\n3) x² - 4 = 0',
        subject: 'Matemática',
        dueDate: '2026-05-15',
        priority: 'medium',
        status: 'pending'
    },
    {
        id: 'task_003',
        title: 'Análise de Poema Modernista',
        description: 'Analise um poema de sua escolha do movimento modernista brasileiro. Contexto histórico, figuras de linguagem e significado.',
        subject: 'Português',
        dueDate: '2026-05-20',
        priority: 'low',
        status: 'pending'
    },
    {
        id: 'task_004',
        title: 'Ciclos Biogeoquímicos',
        description: 'Explique o ciclo da água, nitrogênio e carbono. Como esses ciclos são essenciais para a vida no planeta?',
        subject: 'Ciências',
        dueDate: '2026-05-13',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 'task_005',
        title: 'Past Perfect - Exercise',
        description: 'Complete as frases usando o Past Perfect:\n1) She _____ (leave) before I _____ (arrive)\n2) He _____ (study) English for 5 years before _____ (move) to London',
        subject: 'Inglês',
        dueDate: '2026-05-18',
        priority: 'low',
        status: 'pending'
    }
];

// ========================================
// AUTHENTICATION
// ========================================

function setupAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            document.getElementById('loginForm').classList.remove('active');
            document.getElementById('registerForm').classList.remove('active');
            
            tab.classList.add('active');
            document.getElementById(targetTab + 'Form').classList.add('active');
        });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const name = email.split('@')[0];
        
        loginUser(name, email);
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const matricula = document.getElementById('registerMatricula').value;
        
        registerUser(name, email, matricula);
    });
}

function loginUser(name, email) {
    state.user = {
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        wallet: 'DEV_WALLET_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        token: 'jwt_' + Math.random().toString(36).substr(2, 50)
    };

    localStorage.setItem('educhain_user', JSON.stringify(state.user));
    localStorage.setItem('educhain_submissions', JSON.stringify([]));
    
    showAppScreen();
}

function registerUser(name, email, matricula) {
    loginUser(name, email);
}

function logout() {
    localStorage.removeItem('educhain_user');
    localStorage.removeItem('educhain_submissions');
    state.user = null;
    state.submissions = [];
    location.reload();
}

function checkAuth() {
    const stored = localStorage.getItem('educhain_user');
    if (stored) {
        try {
            state.user = JSON.parse(stored);
            const submissions = localStorage.getItem('educhain_submissions');
            state.submissions = submissions ? JSON.parse(submissions) : [];
            showAppScreen();
        } catch (e) {
            console.error('Auth error:', e);
        }
    }
}

// ========================================
// UI MANAGEMENT
// ========================================

function showAppScreen() {
    document.getElementById('authScreen').classList.remove('active');
    document.getElementById('appScreen').classList.add('active');
    
    initializeApp();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewId = item.dataset.view + 'View';
            
            navItems.forEach(n => n.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(viewId).classList.add('active');
            
            if (item.dataset.view === 'blockchain') {
                updateBlockchainView();
            } else if (item.dataset.view === 'history') {
                updateHistoryView();
            } else if (item.dataset.view === 'tasks') {
                updateTasksList();
            }
        });
    });
}

function setupLogout() {
    document.getElementById('logoutBtn').addEventListener('click', logout);
}

// ========================================
// INITIALIZE APP
// ========================================

function initializeApp() {
    // Update header
    document.getElementById('userName').textContent = state.user.name;
    document.getElementById('walletAddress').textContent = state.user.wallet;
    
    // Set date
    const today = new Date();
    document.getElementById('todayDate').textContent = 
        today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    // Initialize data
    state.tasks = sampleTasks;
    
    // Setup listeners
    setupNavigation();
    setupLogout();
    setupDashboard();
    setupEditor();
    setupModals();
    
    // Initial views
    updateDashboard();
    updateTasksList();
}

// ========================================
// DASHBOARD
// ========================================

function setupDashboard() {
    updateDashboard();
}

function updateDashboard() {
    // Update stats
    const pending = state.tasks.filter(t => t.status === 'pending').length;
    const completed = state.submissions.length;
    const onChain = state.submissions.filter(s => s.status === 'confirmed').length;
    
    document.getElementById('statPending').textContent = pending;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statOnChain').textContent = onChain;
    document.getElementById('statHashes').textContent = state.submissions.length;
    
    // Update urgent tasks
    const urgent = state.tasks.filter(t => {
        const dueDate = new Date(t.dueDate);
        const today = new Date();
        const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        return daysLeft < 2 && t.status === 'pending';
    });
    
    const urgentList = document.getElementById('urgentTasks');
    if (urgent.length === 0) {
        urgentList.innerHTML = '<p class="empty-state">Nenhuma tarefa urgente</p>';
    } else {
        urgentList.innerHTML = urgent.map(task => `
            <div class="urgent-item">
                <div>
                    <strong>${task.title}</strong><br>
                    <span>${task.subject}</span>
                </div>
                <span class="badge priority-high">Urgente</span>
            </div>
        `).join('');
    }
    
    // Update recent submits
    const recent = state.submissions.slice(0, 5);
    const recentList = document.getElementById('recentSubmits');
    if (recent.length === 0) {
        recentList.innerHTML = '<p class="empty-state">Nenhum envio recente</p>';
    } else {
        recentList.innerHTML = recent.map(sub => `
            <div class="recent-item">
                <div>
                    <strong>${state.tasks.find(t => t.id === sub.taskId)?.title || 'Tarefa'}</strong><br>
                    <span>${new Date(sub.timestamp).toLocaleString('pt-BR')}</span>
                </div>
                <span class="badge priority-${sub.status === 'confirmed' ? 'low' : 'medium'}">
                    ${sub.status === 'confirmed' ? '✅ On-Chain' : '⏳ Pendente'}
                </span>
            </div>
        `).join('');
    }
}

// ========================================
// TASKS
// ========================================

function updateTasksList() {
    const list = document.getElementById('tasksList');
    const filter = document.getElementById('filterSubject').value;
    
    let filtered = state.tasks;
    if (filter) {
        filtered = filtered.filter(t => t.subject === filter);
    }
    
    list.innerHTML = filtered.map(task => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        let priorityClass = 'priority-low';
        if (daysLeft < 1) priorityClass = 'priority-high';
        else if (daysLeft < 3) priorityClass = 'priority-medium';
        
        return `
            <div class="task-card ${task.priority === 'high' ? 'high' : ''}" onclick="selectTaskForEditor('${task.id}')">
                <div class="task-header">
                    <span class="task-title">${task.title}</span>
                    <span class="badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
                </div>
                <div class="task-desc">${task.description.substring(0, 100)}...</div>
                <div class="task-footer">
                    <span class="task-subject">${task.subject}</span>
                    <span class="task-due">Prazo: ${new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                    <span class="task-status">${daysLeft > 0 ? daysLeft + ' dias' : 'Vencido'}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Update modal list for editor
    document.getElementById('selectorTasksList').innerHTML = filtered.map(task => `
        <div class="task-card" onclick="selectTaskFromModal('${task.id}')">
            <div class="task-header">
                <span class="task-title">${task.title}</span>
                <span class="badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
            </div>
            <div class="task-desc">${task.description.substring(0, 100)}...</div>
            <div class="task-footer">
                <span class="task-subject">${task.subject}</span>
            </div>
        </div>
    `).join('');
}

document.getElementById('filterSubject').addEventListener('change', updateTasksList);

// ========================================
// EDITOR
// ========================================

function setupEditor() {
    const editor = document.getElementById('responseEditor');
    const charCount = document.querySelector('.char-count');
    

    editor.addEventListener('input', () => {
        charCount.textContent = editor.value.length + ' caracteres';
        
        // Check if content to enable submit
        if (state.currentTask && editor.value.length >= 10) {
            document.getElementById('submitBlockchainBtn').disabled = false;
        } else {
            document.getElementById('submitBlockchainBtn').disabled = true;
        }
        
        // Auto-save
        autoSaveResponse();
    });

    // Toolbar buttons
    document.getElementById('boldBtn').addEventListener('click', () => insertFormatting('**', '**'));
    document.getElementById('italicBtn').addEventListener('click', () => insertFormatting('_', '_'));
    document.getElementById('linkBtn').addEventListener('click', () => insertFormatting('[', '](url)'));
    document.getElementById('clearBtn').addEventListener('click', () => {
        if (confirm('Deseja limpar todo o conteúdo?')) {
            editor.value = '';
            charCount.textContent = '0 caracteres';
        }
    });

    document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);
    document.getElementById('submitBlockchainBtn').addEventListener('click', prepareSubmit);
    document.getElementById('selectTaskBtn').addEventListener('click', () => {
        document.getElementById('taskSelectorModal').classList.add('active');
    });
}

function insertFormatting(before, after) {
    const editor = document.getElementById('responseEditor');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editor.value.substring(start, end);
    const newText = editor.value.substring(0, start) + before + selected + after + editor.value.substring(end);
    
    editor.value = newText;
    editor.selectionStart = start + before.length;
    editor.selectionEnd = start + before.length + selected.length;
    editor.focus();
}

function selectTaskForEditor(taskId) {
    selectTaskFromModal(taskId);
}

function selectTaskFromModal(taskId) {
    state.currentTask = state.tasks.find(t => t.id === taskId);
    
    if (state.currentTask) {
        // Close modal
        document.getElementById('taskSelectorModal').classList.remove('active');
        
        // Update UI
        document.getElementById('editorTaskTitle').textContent = state.currentTask.title;
        document.getElementById('editorTaskSubject').textContent = state.currentTask.subject;
        
        const daysLeft = Math.ceil((new Date(state.currentTask.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        let priorityText = 'Prazo confortável';
        let priorityClass = 'priority-low';
        
        if (daysLeft < 1) { priorityText = 'Crítico'; priorityClass = 'priority-high'; }
        else if (daysLeft < 3) { priorityText = 'Próximo'; priorityClass = 'priority-medium'; }
        
        document.getElementById('editorTaskDue').textContent = priorityText;
        document.getElementById('editorTaskDue').className = 'badge ' + priorityClass;
        document.getElementById('editorTaskDesc').textContent = state.currentTask.description;
        
        // Show task info
        document.getElementById('taskInfo').classList.add('show');
        document.getElementById('editorEmpty').style.display = 'none';
        
        // Load draft if exists
        const draft = localStorage.getItem('draft_' + taskId);
        if (draft) {
            document.getElementById('responseEditor').value = draft;
        }
        
        // Switch to editor view
        document.querySelector('[data-view="editor"]').click();
    }
}

function autoSaveResponse() {
    if (state.currentTask) {
        localStorage.setItem('draft_' + state.currentTask.id, document.getElementById('responseEditor').value);
        
        const status = document.getElementById('autoSaveStatus');
        status.textContent = 'Salvando...';
        status.classList.add('saving');
        status.classList.remove('saved');
        
        setTimeout(() => {
            status.textContent = 'Alterações salvas';
            status.classList.remove('saving');
            status.classList.add('saved');
        }, 500);
    }
}

function saveDraft() {
    if (state.currentTask) {
        autoSaveResponse();
        alert('Rascunho salvo com sucesso!');
    }
}

function prepareSubmit() {
    if (!state.currentTask) {
        alert('Selecione uma tarefa');
        return;
    }
    
    const response = document.getElementById('responseEditor').value;
    if (response.length < 10) {
        alert('Escreva pelo menos 10 caracteres');
        return;
    }
    
    // Show confirmation modal
    document.getElementById('confirmTaskName').textContent = state.currentTask.title;
    document.getElementById('confirmResponsePreview').textContent = response.substring(0, 150) + '...';
    document.getElementById('confirmSubmitModal').classList.add('active');
}

// ========================================
// BLOCKCHAIN SUBMISSION
// ========================================

async function submitToBlockchain() {
    const response = document.getElementById('responseEditor').value;
    
    try {
        // Create transaction
        const transaction = await blockchain.createTransaction({
            studentId: state.user.id,
            taskId: state.currentTask.id,
            taskTitle: state.currentTask.title,
            response: response,
            subject: state.currentTask.subject,
            submittedAt: new Date().toISOString()
        });
        
        // Simulate confirmation delay
        setTimeout(async () => {
            await blockchain.confirmTransaction(transaction.id);
            
            // Save submission
            const submission = {
                id: transaction.id,
                taskId: state.currentTask.id,
                taskTitle: state.currentTask.title,
                responsHash: transaction.hash,
                timestamp: transaction.timestamp,
                status: 'confirmed',
                transactionId: transaction.id
            };
            
            state.submissions.push(submission);
            localStorage.setItem('educhain_submissions', JSON.stringify(state.submissions));
            
            // Clear draft
            localStorage.removeItem('draft_' + state.currentTask.id);
            
            // Show success
            showSuccessModal(transaction.id);
            
            // Update dashboard
            updateDashboard();
        }, 2000);
        
        // Close confirm modal
        document.getElementById('confirmSubmitModal').classList.remove('active');
        
    } catch (error) {
        console.error('Error submitting to blockchain:', error);
        alert('Erro ao registrar na blockchain');
    }
}

// ========================================
// HISTORY
// ========================================

function updateHistoryView() {
    const list = document.getElementById('historiesList');
    
    if (state.submissions.length === 0) {
        list.innerHTML = '<p class="empty-state">Nenhum envio registrado</p>';
        return;
    }
    
    list.innerHTML = state.submissions.map(sub => `
        <div class="history-item">
            <div class="history-header">
                <span class="history-title">${sub.taskTitle}</span>
                <span class="history-date">${new Date(sub.timestamp).toLocaleString('pt-BR')}</span>
            </div>
            <div class="history-details">
                <div class="history-detail">
                    <span class="history-detail-label">Hash SHA-256:</span>
                    <span class="history-detail-value">${sub.responsHash.substring(0, 32)}...</span>
                </div>
                <div class="history-detail">
                    <span class="history-detail-label">TX ID:</span>
                    <span class="history-detail-value">${sub.transactionId}</span>
                </div>
            </div>
            <span class="history-status confirmed">✅ Confirmado na Blockchain</span>
        </div>
    `).join('');
}

// ========================================
// BLOCKCHAIN VIEW
// ========================================

function updateBlockchainView() {
    const txs = blockchain.getAllTransactions();
    document.getElementById('totalTransactions').textContent = txs.length;
    document.getElementById('confirmedTransactions').textContent = blockchain.getConfirmedTransactions().length;
    
    const list = document.getElementById('transactionsList');
    
    if (txs.length === 0) {
        list.innerHTML = '<p class="empty-state">Nenhuma transação registrada</p>';
        return;
    }
    
    list.innerHTML = txs.map(tx => `
        <div class="transaction-item">
            <div class="tx-header">
                <span class="tx-id-show">${tx.id}</span>
                <span class="tx-timestamp">${new Date(tx.timestamp).toLocaleString('pt-BR')}</span>
            </div>
            <div class="tx-details">
                <div>
                    <strong>Status:</strong> 
                    <span style="color: ${tx.status === 'confirmed' ? '#10b981' : '#f59e0b'}">
                        ${tx.status === 'confirmed' ? '✅ Confirmada' : '⏳ Pendente'}
                    </span>
                </div>
                <div>
                    <strong>Hash:</strong> 
                    <span style="font-family: monospace">${tx.hash.substring(0, 20)}...</span>
                </div>
                <div>
                    <strong>Confirmações:</strong> ${tx.confirmations || 0}
                </div>
                <div>
                    <strong>Taxa de Rede:</strong> ${tx.networkFee} lamports (~${(tx.networkFee / 1000000).toFixed(6)} SOL)
                </div>
            </div>
        </div>
    `).join('');
}

document.getElementById('refreshBlockchainBtn')?.addEventListener('click', updateBlockchainView);

// ========================================
// MODALS
// ========================================

function setupModals() {
    // Task Selector Modal
    const taskSelectorModal = document.getElementById('taskSelectorModal');
    taskSelectorModal?.querySelector('.close-modal').addEventListener('click', () => {
        taskSelectorModal.classList.remove('active');
    });

    // Confirm Submit Modal
    const confirmModal = document.getElementById('confirmSubmitModal');
    confirmModal?.querySelector('.close-modal').addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });
    
    document.getElementById('cancelSubmitBtn')?.addEventListener('click', () => {
        confirmModal.classList.remove('active');
    });
    
    document.getElementById('confirmSubmitBtn')?.addEventListener('click', submitToBlockchain);

    // Success Modal
    const successModal = document.getElementById('successModal');
    document.getElementById('copyTxBtn')?.addEventListener('click', () => {
        const txId = document.getElementById('successTxId').textContent;
        navigator.clipboard.writeText(txId);
        alert('ID copiado para a área de transferência!');
    });
    
    document.getElementById('closeSuccessBtn')?.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.getElementById('responseEditor').value = '';
        selectTaskForEditor(null);
        updateDashboard();
    });

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === taskSelectorModal) taskSelectorModal.classList.remove('active');
        if (e.target === confirmModal) confirmModal.classList.remove('active');
        if (e.target === successModal) successModal.classList.remove('active');
    });
}

function showSuccessModal(txId) {
    document.getElementById('successTxId').textContent = txId;
    document.getElementById('successModal').classList.add('active');
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    setupAuth();
    checkAuth();
});
