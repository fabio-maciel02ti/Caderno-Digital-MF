// ========================================
// BLOCKCHAIN SIMULATOR (Solana-like)
// ========================================

class BlockchainSimulator {
    constructor() {
        this.chain = [];
        this.transactions = [];
        this.difficulty = 4;
        this.loadFromStorage();
    }

    // SHA-256 Hash Simulation
    async generateHash(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(JSON.stringify(data));
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Generate Transaction ID (Solana-like)
    generateTransactionId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 44; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Create Transaction
    async createTransaction(data) {
        const transaction = {
            id: this.generateTransactionId(),
            hash: await this.generateHash(data),
            timestamp: new Date().toISOString(),
            data: data,
            status: 'pending',
            confirmations: 0,
            networkFee: 5000, // lamports (0.000005 SOL)
            network: 'Solana Devnet'
        };

        this.transactions.push(transaction);
        return transaction;
    }

    // Confirm Transaction (Simulate mining)
    async confirmTransaction(txId) {
        const transaction = this.transactions.find(tx => tx.id === txId);
        if (transaction) {
            transaction.status = 'confirmed';
            transaction.confirmations = 32; // Solana finality
            transaction.confirmedAt = new Date().toISOString();
            this.saveToStorage();
            return transaction;
        }
        return null;
    }

    // Get Transaction
    getTransaction(txId) {
        return this.transactions.find(tx => tx.id === txId);
    }

    // Get All Transactions
    getAllTransactions() {
        return this.transactions.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
    }

    // Get Transaction Count
    getTransactionCount() {
        return this.transactions.length;
    }

    // Get Confirmed Transactions
    getConfirmedTransactions() {
        return this.transactions.filter(tx => tx.status === 'confirmed');
    }

    // Save to LocalStorage
    saveToStorage() {
        localStorage.setItem('blockchain_transactions', JSON.stringify(this.transactions));
    }

    // Load from LocalStorage
    loadFromStorage() {
        const stored = localStorage.getItem('blockchain_transactions');
        if (stored) {
            try {
                this.transactions = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading blockchain from storage:', e);
            }
        }
    }

    // Clear Storage (Debug)
    clearStorage() {
        localStorage.removeItem('blockchain_transactions');
        this.transactions = [];
    }
}

// Initialize Blockchain
const blockchain = new BlockchainSimulator();
