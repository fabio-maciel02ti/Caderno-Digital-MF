# 📚 Projeto EduChain: Caderno Digital
**Integrantes:** Milena e Fábio
**Fase:** DIA 2 - ESTRUTURANDO A SOLUÇÃO

---

## ⚙️ 1. Como a Solução Funciona
O **EduChain** opera como uma camada de confiança (Trust Layer) entre o aluno e o sistema da Secretaria de Educação.
1.  **Sincronização:** O app consome as atividades pendentes do Caderno Digital oficial.
2.  **Execução Offline/Online:** O aluno realiza a tarefa no app.
3.  **Criptografia & Assinatura:** Ao finalizar, a resposta é criptografada e o aluno assina a transação com sua chave privada (identidade digital).
4.  **Registro na Solana:** O hash da atividade + Timestamp são enviados para a rede Solana.
5.  **Validação Docente:** O professor recebe a prova de entrega imutável e atribui a nota, que também é registrada on-chain.

---

## 🗺️ 2. Jornada do Usuário (User Journey)
Focamos no aluno que trabalha ou tem restrições de tempo:
* **Entrada:** Aluno abre o app no autocarro ou após o trabalho.
* **Ação:** Visualiza "Atividades Pendentes" com cronómetro de prazo real da blockchain.
* **Esforço:** Realiza a escrita da resposta dentro do ambiente seguro.
* **Alívio:** Clica em "Enviar para Blockchain". Recebe o comprovativo (TXID) de que a tarefa está salva para sempre.
* **Recompensa:** Visualiza sua nota e progresso acumulado em um portefólio digital.

---

## 🔄 3. Fluxo do Sistema (User Flow)
```text
[Início] 
   ↓
[Login Biométrico / Chave Privada]
   ↓
[Dashboard: Lista de Atividades] → (Dados da Sec. Educação)
   ↓
[Tela de Escrita / Resposta]
   ↓
[Criptografar Dados]
   ↓
[Enviar Transação para Solana]
   ↓
[Confirmação na Rede ( < 2s )]
   ↓
[Notificação de Sucesso para Professor]
   ↓
[Fim]
