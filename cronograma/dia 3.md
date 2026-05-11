# 📚 Projeto EduChain: Caderno Digital
**Integrantes:** Milena e Fábio
**Fase:** DIA 3 - MVP & BLOCKCHAIN (Priorização e Estrutura Técnica)

---

## ⛓️ 1. Blockchain: Onde e Por que faz sentido?
No EduChain, a blockchain não é apenas um banco de dados, mas um **Protocolo de Confiança**. Ela resolve o conflito entre o horário de trabalho do aluno e o horário de funcionamento da escola.

* **Uso de Solana:** Escolhida pela alta velocidade (confirmação em segundos) e custo quase zero, permitindo que cada lição de casa seja uma transação sem peso financeiro para o Estado ou aluno.
* **Recurso Utilizado (Compressed NFTs):** Decidimos utilizar **cNFTs (NFTs Compactados)** da Solana para representar cada atividade concluída. Eles servem como "Selos de Conclusão" que contêm o hash da resposta e o timestamp imutável, custando frações de centavo.

---

## 🚀 2. Definição do MVP Enxuto (Corte do Não-Essencial)
Para garantir a entrega e funcionalidade, focamos no **mínimo necessário** para resolver a dor do aluno:

* **O que ficou (Essencial):**
    * Login simplificado (Link com Caderno Digital).
    * Editor de texto para respostas.
    * Botão "Registrar na Solana" (Geração do selo de entrega).
    * Visualização de histórico de envios com status de prazo.
* **O que cortamos (Para o futuro):**
    * Fórum de discussão entre alunos.
    * Gamificação complexa com rankings.
    * Videoaulas integradas (focaremos apenas na entrega de atividades).

---

## 🗺️ 3. Jornada do Usuário no MVP
1.  **Acesso:** Aluno loga e vê a lista de tarefas do dia.
2.  **Produção:** Escreve a resposta (armazenamento local temporário para não perder dados).
3.  **Registro:** Ao clicar em enviar, o sistema gera um Hash da resposta e envia para a rede Solana.
4.  **Comprovação:** O aluno recebe um link da *Solscan* ou ID da transação que serve como sua garantia legal de entrega.

---

## ✅ 4. Detalhamento dos Entregáveis (Conclusão Dia 2 e 3)

### Entregável Dia 2: Estruturação e Fluxos
* **Fluxo do Usuário:** Mapeamos a transição do ambiente físico para o digital, garantindo que a jornada termine com uma confirmação visual de "Seguro na Blockchain".
* **Wireframes:** Desenho de telas focado em baixo consumo de bateria e facilidade de leitura em telas pequenas.

### Entregável Dia 3: MVP & Prioridades Claras
* **Lógica On-chain:** Definição de que apenas metadados (Quem fez? Quando? Qual lição?) vão para a rede principal, mantendo a eficiência.
* **Priorização:** O sistema agora é focado 100% na **Prova de Entrega dentro do Prazo**. 
* **Validação Técnica:** Escolha da infraestrutura de cNFTs da Solana para escala em massa de alunos.

---

## 🚀 Resumo Visual da Solução Final

```text
  [ ALUNO TRABALHADOR ] 
           ↓
  [ FAZ A TAREFA ÀS 23h ] 
           ↓
  [ REGISTRA NA SOLANA ] → (Gerado carimbo de tempo imutável)
           ↓
  [ PROFESSOR VALIDA ]   → (Acesso ao hash para conferência)
           ↓
  [ RESULTADO ]: Aluno não é prejudicado por não estar na aula física.
