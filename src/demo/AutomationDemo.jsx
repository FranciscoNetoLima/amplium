import { useEffect, useState } from 'react';
import { ShowcaseShell, useDemoCopy } from './ShowcaseShell.jsx';

const copy = {
  pt: {
    title: 'Do primeiro contato ao próximo passo, sem perder contexto.',
    lead: 'Experimente um fluxo fictício de atendimento e organização comercial. A classificação, a IA e o CRM são simulados com regras locais.',
    kicker: 'AUTOMAÇÃO / ATENDIMENTO',
    inbox: 'MENSAGEM / 01',
    flow: 'FLUXO / 01—05',
    choose: 'Escolha uma mensagem de exemplo',
    run: 'Executar cenário →',
    running: 'Processando cenário…',
    stages: [
      'Mensagem recebida',
      'Classificação',
      'Registro no CRM',
      'Resposta sugerida',
      'Encaminhamento',
    ],
    waiting: 'Escolha um cenário e execute o fluxo para acompanhar as etapas.',
    record: 'Registro demonstrativo',
    response: 'Resposta sugerida',
    handoff: 'Próximo atendimento',
    simulation:
      'IA e integrações simuladas. Nenhuma mensagem é enviada e nenhum dado sai desta página.',
    scenarios: [
      {
        name: 'Interesse em serviço',
        message: 'Olá! Quero saber como funciona a manutenção preventiva do ar-condicionado.',
        category: 'Interesse em serviço',
        record: 'Brisa Clima / Interesse em manutenção',
        answer:
          'Olá! A manutenção começa com uma avaliação do equipamento e do ambiente. Podemos organizar os detalhes do atendimento e explicar o escopo antes de você decidir.',
        handoff: 'Equipe comercial recebe o interesse e pode confirmar o tipo de equipamento.',
      },
      {
        name: 'Dúvida sobre atendimento',
        message: 'Vocês atendem também espaços comerciais?',
        category: 'Dúvida frequente',
        record: 'Brisa Clima / Dúvida sobre atendimento comercial',
        answer:
          'A proposta pode considerar espaços residenciais ou comerciais. Para orientar o atendimento, conte como o ambiente é usado e quantos equipamentos há no local.',
        handoff: 'Resposta preparada para revisão humana antes de qualquer envio.',
      },
      {
        name: 'Solicitação de orçamento',
        message: 'Preciso de um orçamento para revisar dois aparelhos que pararam de resfriar.',
        category: 'Pedido de orçamento',
        record: 'Brisa Clima / Avaliação de dois aparelhos',
        answer:
          'Entendemos sua solicitação. Um profissional precisa avaliar os equipamentos para definir o serviço e apresentar as condições antes da execução.',
        handoff:
          'Prioridade de avaliação: equipe humana verifica os detalhes e prepara a proposta.',
      },
    ],
  },
  en: {
    title: 'From first contact to the next step, with context intact.',
    lead: 'Try a fictional customer-service and sales workflow. Classification, AI and CRM are simulated with local rules.',
    kicker: 'AUTOMATION / SERVICE',
    inbox: 'INBOX / 01',
    flow: 'FLOW / 01—05',
    choose: 'Choose an example message',
    run: 'Run scenario →',
    running: 'Running scenario…',
    stages: ['Message received', 'Classification', 'CRM record', 'Suggested reply', 'Handoff'],
    waiting: 'Choose a scenario and run the flow to follow the steps.',
    record: 'Demo record',
    response: 'Suggested reply',
    handoff: 'Next handoff',
    simulation:
      'AI and integrations are simulated. No message is sent and no data leaves this page.',
    scenarios: [
      {
        name: 'Service interest',
        message: 'Hello! I want to know how preventive air-conditioning maintenance works.',
        category: 'Service interest',
        record: 'Brisa Clima / Maintenance enquiry',
        answer:
          'Hello! Maintenance begins with an assessment of the unit and space. We can explain the scope before you decide.',
        handoff: 'Sales team receives the enquiry and can confirm the equipment type.',
      },
      {
        name: 'Service question',
        message: 'Do you also serve commercial spaces?',
        category: 'Common question',
        record: 'Brisa Clima / Commercial service question',
        answer:
          'The proposal can cover residential or commercial spaces. Tell us how the space is used and how many units are there.',
        handoff: 'Reply prepared for human review before any sending.',
      },
      {
        name: 'Quote request',
        message: 'I need a quote to check two units that have stopped cooling.',
        category: 'Quote request',
        record: 'Brisa Clima / Assessment of two units',
        answer:
          'We understand your request. A professional needs to assess the units before defining the service and its terms.',
        handoff: 'Human team reviews the details and prepares the proposal.',
      },
    ],
  },
};

export default function AutomationDemo() {
  const c = useDemoCopy(copy);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step < 1 || step >= 5) return;
    const timer = window.setTimeout(() => setStep((current) => current + 1), 950);
    return () => window.clearTimeout(timer);
  }, [step]);
  const reset = () => {
    setStep(0);
    setScenarioIndex(0);
  };
  const scenario = c.scenarios[scenarioIndex];
  return (
    <ShowcaseShell
      variant="automation"
      brand="PULSO FLOW"
      title={c.title}
      lead={c.lead}
      cardId="servico-automacoes-ia"
      onReset={reset}
    >
      <div className="showcase-wrap automation-layout">
        <section className="automation-input">
          <span className="showcase-eyebrow">{c.kicker}</span>
          <h2>{c.choose}</h2>
          <div className="automation-scenarios" role="group" aria-label={c.choose}>
            {c.scenarios.map((item, index) => (
              <button
                type="button"
                key={item.name}
                className={scenarioIndex === index ? 'is-active' : ''}
                aria-pressed={scenarioIndex === index}
                onClick={() => {
                  setScenarioIndex(index);
                  setStep(0);
                }}
              >
                {item.name}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="automation-message">
            <span>{c.inbox}</span>
            <p>“{scenario.message}”</p>
          </div>
          <button
            type="button"
            className="showcase-button"
            onClick={() => setStep(1)}
            disabled={step > 0 && step < 5}
          >
            {step > 0 && step < 5 ? c.running : c.run}
          </button>
          <p className="automation-disclaimer">{c.simulation}</p>
        </section>
        <section className="automation-output" aria-live="polite">
          <span className="showcase-eyebrow">{c.flow}</span>
          <h2>{step ? `${Math.min(step, 5)} / 05` : '— / 05'}</h2>
          <ol className="automation-steps">
            {c.stages.map((stage, index) => (
              <li key={stage} className={step > index ? 'is-done' : ''}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{stage}</strong>
                <b aria-hidden="true">{step > index ? '✓' : '·'}</b>
              </li>
            ))}
          </ol>
          {step === 0 ? (
            <p className="showcase-empty">{c.waiting}</p>
          ) : (
            <div className="automation-results">
              <div>
                <span className="showcase-eyebrow">{c.stages[1]}</span>
                <p>{step >= 2 ? scenario.category : '…'}</p>
              </div>
              <div>
                <span className="showcase-eyebrow">{c.record}</span>
                <p>{step >= 3 ? scenario.record : '…'}</p>
              </div>
              <div>
                <span className="showcase-eyebrow">{c.response}</span>
                <p>{step >= 4 ? scenario.answer : '…'}</p>
              </div>
              <div>
                <span className="showcase-eyebrow">{c.handoff}</span>
                <p>{step >= 5 ? scenario.handoff : '…'}</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </ShowcaseShell>
  );
}
