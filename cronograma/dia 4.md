# 📚 Projeto EduChain: Caderno Digital
**Integrantes:** Milena e Fábio
**Fase:** DIA 4 - CONSTRUÇÃO (Arquitetura e Desenvolvimento)

---

## 🏗️ 1. Arquitetura do Sistema
Para o Dia 4, definimos uma arquitetura robusta que separa a interface do usuário da lógica de contratos inteligentes na Solana:

* **Frontend:** Aplicação Web Responsiva (Mobile-First) para garantir que o aluno acesse de qualquer celular.
* **Camada Blockchain:** Programas em Rust (Anchor Framework) implantados na Devnet da Solana.
* **Integração:** Web3.js para comunicação entre o navegador do aluno e a rede blockchain.
* **Armazenamento de Dados:** * **On-chain:** Hash da atividade, Timestamp (Data/Hora) e Assinatura do Aluno.
    * **Off-chain (Local):** Cache para rascunhos de respostas (evita perda de dados se a internet cair).

---

## 🛠️ 2. Tecnologias Escolhidas
* **Linguagem de Contrato:** Rust (Alta performance e segurança).
* **Frontend:** React + Tailwind CSS (Agilidade no desenvolvimento e leveza).
* **Wallet:** Integração com Phantom/Solflare (Identidade digital do aluno).
* **Infraestrutura:** RPC da Helius para compressão de dados (cNFTs).

---

## 📊 3. Divisão de Tarefas & Repositório
Organizamos o desenvolvimento em sprints curtas:
* **Milena:** Desenvolvimento do Frontend, telas de login e editor de texto.
* **Fábio:** Escrita do Smart Contract em Rust e configuração do ambiente Solana.
* **Conjunto:** Integração do botão "Registrar Atividade" e testes de envio.

---

## ✅ 4. Conclusão Detalhada dos Entregáveis (Dias 1, 2 e 3)

### 🟢 Entregável Dia 1: Descoberta & Ideação
* **Problema Validado:** Identificamos que a rigidez escolar exclui alunos trabalhadores.
* **Proposta de Valor:** O EduChain foi definido como uma "ferramenta de soberania", onde o aluno é dono de sua prova de esforço através da criptografia.

### 🟣 Entregável Dia 2: Estruturação da Solução
* **Jornada do Usuário:** Mapeamos cada passo, do rascunho offline ao registro imutável.
* **Fluxos de Interface:** Criamos o design inicial focado em acessibilidade, garantindo que o sistema seja intuitivo mesmo para quem nunca usou blockchain.

### 🔵 Entregável Dia 3: MVP & Blockchain
* **Priorização Estrita:** Removemos funções de rede social para focar 100% na **Segurança do Registro**.
* **Definição Técnica:** Escolhemos o uso de **cNFTs (Compressed NFTs)**, tornando viável registrar milhares de atividades escolares com custo próximo de zero, utilizando a infraestrutura escalável da Solana.

---

## 🚀 Status da Construção (Dia 4)
* [x] Repositório Git organizado.
* [x] Estrutura básica do Smart Contract criada.
* [ ] Integração Frontend-Blockchain (Em andamento).
* [ ] Teste de carga de registros (Pendente).

```text
  [ BASE TÉCNICA SÓLIDA ] 
           ↓
  [ FRONTEND REACT ] + [ SMART CONTRACT RUST ] 
           ↓
  [ INTEGRAÇÃO WEB3 ] 
           ↓
  [ ENTREGÁVEL ]: MVP em desenvolvimento com arquitetura escalável.
