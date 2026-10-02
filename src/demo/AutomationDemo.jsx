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
    runAgain: 'Executar novamente ↻',
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
    copy: 'Copiar resposta',
    copied: 'Resposta copiada para a área de transferência.',
    copyUnavailable: 'Não foi possível copiar. Selecione e copie o texto da resposta.',
    waitingStage: 'A próxima etapa aparece aqui durante a execução.',
    active: 'Em andamento',
    done: 'Concluída',
    progress: (current) => `${current} de 5 etapas concluídas`,
    crmOwner: 'Responsável sugerido',
    crmPriority: 'Prioridade',
    crmStatus: 'Status do registro',
    priorityValues: ['Padrão', 'Atenção', 'Alta'],
    crmStatuses: ['Novo contato', 'Em triagem', 'Aguardando avaliação'],
    simulation:
      'IA e integrações simuladas. Nenhuma mensagem é enviada e nenhum dado sai desta página.',
    scenarios: [
      {
        name: 'Interesse em serviço',
        message: 'Olá! Quero saber como funciona a manutenção preventiva do ar-condicionado.',
        category: 'Interesse em serviço',
        record: 'Brisa Clima / Interesse em manutenção',
        priority: 0,
        crmStatus: 0,
        answer:
          'Olá! A manutenção começa com uma avaliação do equipamento e do ambiente. Podemos organizar os detalhes do atendimento e explicar o escopo antes de você decidir.',
        handoff: 'Equipe comercial recebe o interesse e pode confirmar o tipo de equipamento.',
      },
      {
        name: 'Dúvida sobre atendimento',
        message: 'Vocês atendem também espaços comerciais?',
        category: 'Dúvida frequente',
        record: 'Brisa Clima / Dúvida sobre atendimento comercial',
        priority: 1,
        crmStatus: 1,
        answer:
          'A proposta pode considerar espaços residenciais ou comerciais. Para orientar o atendimento, conte como o ambiente é usado e quantos equipamentos há no local.',
        handoff: 'Resposta preparada para revisão humana antes de qualquer envio.',
      },
      {
        name: 'Solicitação de orçamento',
        message: 'Preciso de um orçamento para revisar dois aparelhos que pararam de resfriar.',
        category: 'Pedido de orçamento',
        record: 'Brisa Clima / Avaliação de dois aparelhos',
        priority: 2,
        crmStatus: 2,
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
    runAgain: 'Run again ↻',
    running: 'Running scenario…',
    stages: ['Message received', 'Classification', 'CRM record', 'Suggested reply', 'Handoff'],
    waiting: 'Choose a scenario and run the flow to follow the steps.',
    record: 'Demo record',
    response: 'Suggested reply',
    handoff: 'Next handoff',
    copy: 'Copy reply',
    copied: 'Reply copied to the clipboard.',
    copyUnavailable: 'Could not copy. Select and copy the reply text.',
    waitingStage: 'The next stage will appear here as the flow runs.',
    active: 'In progress',
    done: 'Complete',
    progress: (current) => `${current} of 5 steps complete`,
    crmOwner: 'Suggested owner',
    crmPriority: 'Priority',
    crmStatus: 'Record status',
    priorityValues: ['Standard', 'Attention', 'High'],
    crmStatuses: ['New contact', 'In triage', 'Awaiting assessment'],
    simulation:
      'AI and integrations are simulated. No message is sent and no data leaves this page.',
    scenarios: [
      {
        name: 'Service interest',
        message: 'Hello! I want to know how preventive air-conditioning maintenance works.',
        category: 'Service interest',
        record: 'Brisa Clima / Maintenance enquiry',
        priority: 0,
        crmStatus: 0,
        answer:
          'Hello! Maintenance begins with an assessment of the unit and space. We can explain the scope before you decide.',
        handoff: 'Sales team receives the enquiry and can confirm the equipment type.',
      },
      {
        name: 'Service question',
        message: 'Do you also serve commercial spaces?',
        category: 'Common question',
        record: 'Brisa Clima / Commercial service question',
        priority: 1,
        crmStatus: 1,
        answer:
          'The proposal can cover residential or commercial spaces. Tell us how the space is used and how many units are there.',
        handoff: 'Reply prepared for human review before any sending.',
      },
      {
        name: 'Quote request',
        message: 'I need a quote to check two units that have stopped cooling.',
        category: 'Quote request',
        record: 'Brisa Clima / Assessment of two units',
        priority: 2,
        crmStatus: 2,
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
  const [copyStatus, setCopyStatus] = useState('');
  useEffect(() => {
    if (step < 1 || step >= 5) return;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(
      () => setStep((current) => Math.min(current + 1, 5)),
      reducedMotion ? 140 : 820,
    );
    return () => window.clearTimeout(timer);
  }, [step]);
  const running = step > 0 && step < 5;
  const scenario = c.scenarios[scenarioIndex];
  const start = () => {
    if (running) return;
    setCopyStatus('');
    setStep(1);
  };
  const reset = () => {
    setStep(0);
    setScenarioIndex(0);
    setCopyStatus('');
  };
  const copyResponse = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(scenario.answer);
      setCopyStatus(c.copied);
    } catch {
      setCopyStatus(c.copyUnavailable);
    }
  };
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
                  setCopyStatus('');
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
          <button type="button" className="showcase-button" onClick={start} disabled={running}>
            {running ? c.running : step === 5 ? c.runAgain : c.run}
          </button>
          <p className="automation-disclaimer">{c.simulation}</p>
        </section>
        <section className="automation-output" aria-labelledby="automation-output-title">
          <span className="showcase-eyebrow">{c.flow}</span>
          <h2 id="automation-output-title">{step ? `${step} / 05` : '— / 05'}</h2>
          <div
            className="automation-progress"
            role="progressbar"
            aria-label={c.flow}
            aria-valuemin={0}
            aria-valuemax={5}
            aria-valuenow={step}
          >
            <span style={{ width: `${(step / 5) * 100}%` }} />
          </div>
          <p className="automation-progress-status" role="status" aria-live="polite">
            {step === 0 ? c.waiting : c.progress(step)}
          </p>
          <ol className="automation-steps">
            {c.stages.map((stage, index) => (
              <li
                key={stage}
                className={`${step >= index + 1 ? 'is-done' : ''}${running && step === index ? ' is-active' : ''}`}
                aria-current={running && step === index ? 'step' : undefined}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{stage}</strong>
                <b aria-hidden="true">
                  {step >= index + 1 ? '✓' : running && step === index ? '…' : '·'}
                </b>
              </li>
            ))}
          </ol>
          <div className="automation-results">
            {c.stages.map((stage, index) => {
              const stageNumber = index + 1;
              const done = step >= stageNumber;
              const active = running && step === index;
              return (
                <article
                  className={`automation-result${done ? ' is-done' : ''}${active ? ' is-active' : ''}`}
                  key={stage}
                  aria-label={`${stage}: ${done ? c.done : active ? c.active : c.waitingStage}`}
                >
                  <div className="automation-result-heading">
                    <span className="showcase-eyebrow">{stage}</span>
                    <span className="automation-result-state">
                      {done ? c.done : active ? c.active : c.waitingStage}
                    </span>
                  </div>
                  {done ? (
                    index === 0 ? (
                      <blockquote>“{scenario.message}”</blockquote>
                    ) : index === 1 ? (
                      <p className="automation-classification">{scenario.category}</p>
                    ) : index === 2 ? (
                      <>
                        <h3>{scenario.record}</h3>
                        <dl className="automation-crm-fields">
                          <div>
                            <dt>{c.crmStatus}</dt>
                            <dd>{c.crmStatuses[scenario.crmStatus]}</dd>
                          </div>
                          <div>
                            <dt>{c.crmPriority}</dt>
                            <dd>{c.priorityValues[scenario.priority]}</dd>
                          </div>
                        </dl>
                      </>
                    ) : index === 3 ? (
                      <>
                        <p className="automation-reply">{scenario.answer}</p>
                        <button
                          type="button"
                          className="showcase-text-button automation-copy"
                          onClick={copyResponse}
                        >
                          {c.copy} ↗
                        </button>
                        <span className="automation-copy-status" role="status" aria-live="polite">
                          {copyStatus}
                        </span>
                      </>
                    ) : (
                      <p className="automation-handoff">{scenario.handoff}</p>
                    )
                  ) : (
                    <p className="automation-pending">{active ? c.active : c.waitingStage}</p>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </ShowcaseShell>
  );
}
