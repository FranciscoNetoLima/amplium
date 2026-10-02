import { useEffect, useRef, useState } from 'react';
import { ShowcaseShell, useDemoCopy } from './ShowcaseShell.jsx';

const copy = {
  pt: {
    title: 'Da divulgação ao contato, cada etapa conectada.',
    lead: 'Acompanhe uma campanha fictícia da Brisa Clima. O anúncio não está ativo e não há métricas ou captação real de contatos.',
    kicker: 'CAMPANHA DE EXEMPLO / BRISA CLIMA',
    steps: ['Anúncio', 'Landing page', 'Solicitação', 'CRM'],
    next: 'Continuar percurso →',
    previous: '← Etapa anterior',
    externalNote:
      'Este link abre outra demonstração em uma nova aba; seu percurso aqui continua disponível.',
    inPageNote: 'O botão do anúncio avança apenas esta simulação; a campanha não está ativa.',
    campaignStatus: 'Campanha fictícia / não veiculada',
    objective: 'Objetivo da campanha',
    objectiveText:
      'Apresentar a manutenção preventiva e orientar interessados até um pedido de avaliação.',
    offerName: 'Manutenção preventiva de ar-condicionado',
    offerMatch: 'A mensagem do anúncio e a oferta da página mantêm o mesmo serviço em foco.',
    recordCreated: 'Oportunidade fictícia organizada no CRM demonstrativo.',
    recordStatus: 'Etapa comercial',
    statusNew: 'Novo contato',
    nextAction: 'Próxima ação sugerida',
    nextActions: [
      'Confirmar o tipo de equipamento e o ambiente.',
      'Entender os sinais observados antes de orientar a avaliação.',
      'Explicar o escopo do serviço e combinar os próximos passos.',
    ],
    recordId: 'OPORTUNIDADE / EXEMPLO 01',
    adTitle: 'O ar-condicionado pede atenção?',
    adText:
      'Conheça a manutenção preventiva da Brisa Clima e entenda o cuidado indicado para o seu espaço.',
    sponsored: 'Prévia de anúncio / não veiculado',
    audience: 'Público pretendido',
    audienceText: 'Pessoas e empresas interessadas em cuidar de equipamentos de climatização.',
    message: 'Mensagem da campanha',
    messageText:
      'Uma oferta específica, com convite claro para conhecer o serviço antes de pedir orçamento.',
    adButton: 'Conhecer serviço ↗',
    landingTitle: 'A página mantém a promessa do anúncio.',
    landingText:
      'A oferta apresenta o que o serviço envolve, responde dúvidas e orienta o visitante até uma solicitação de orçamento.',
    openLanding: 'Abrir landing page demonstrativa ↗',
    contactTitle: 'Transforme interesse em solicitação.',
    contactText:
      'Escolha dados de exemplo para simular o contato. Nenhuma informação pessoal é necessária, enviada ou armazenada.',
    type: 'Tipo de ambiente',
    types: ['Residência', 'Empresa'],
    need: 'Necessidade',
    needs: ['Manutenção preventiva', 'Avaliar falha no aparelho', 'Entender o serviço'],
    submit: 'Simular contato →',
    crmTitle: 'A oportunidade chega com contexto.',
    crmText:
      'A solicitação demonstrativa foi organizada em um registro local, com origem e necessidade. A equipe teria contexto para dar continuidade.',
    record: 'Oportunidade de exemplo',
    source: 'Origem: anúncio → landing page → formulário',
    viewCrm: 'Explorar CRM demonstrativo ↗',
    resetNotice: 'Percurso reiniciado.',
  },
  en: {
    title: 'From promotion to enquiry, every step connected.',
    lead: 'Follow a fictional Brisa Clima campaign. The ad is not active and there are no real metrics or lead capture.',
    kicker: 'EXAMPLE CAMPAIGN / BRISA CLIMA',
    steps: ['Ad', 'Landing page', 'Enquiry', 'CRM'],
    next: 'Continue journey →',
    previous: '← Previous step',
    externalNote: 'This link opens another demo in a new tab; your journey here stays available.',
    inPageNote: 'The ad button advances this simulation only; the campaign is not active.',
    campaignStatus: 'Fictional campaign / not running',
    objective: 'Campaign objective',
    objectiveText:
      'Present preventive maintenance and guide interested visitors to request an assessment.',
    offerName: 'Preventive air-conditioning maintenance',
    offerMatch: 'The ad message and landing-page offer keep the same service in focus.',
    recordCreated: 'Fictional opportunity added to the demo CRM.',
    recordStatus: 'Sales stage',
    statusNew: 'New contact',
    nextAction: 'Suggested next action',
    nextActions: [
      'Confirm the equipment type and the space.',
      'Understand the reported signs before guiding the assessment.',
      'Explain the service scope and agree on next steps.',
    ],
    recordId: 'OPPORTUNITY / EXAMPLE 01',
    adTitle: 'Does your air conditioner need attention?',
    adText:
      'Explore Brisa Clima preventive maintenance and understand the right care for your space.',
    sponsored: 'Ad preview / not running',
    audience: 'Intended audience',
    audienceText: 'People and businesses interested in caring for air-conditioning equipment.',
    message: 'Campaign message',
    messageText:
      'A specific offer with a clear invitation to explore the service before requesting a quote.',
    adButton: 'Explore service ↗',
    landingTitle: 'The page keeps the ad’s promise.',
    landingText:
      'The offer explains the service, answers questions and guides visitors toward a quote request.',
    openLanding: 'Open example landing page ↗',
    contactTitle: 'Turn interest into an enquiry.',
    contactText:
      'Choose example data to simulate an enquiry. No personal details are needed, sent or stored.',
    type: 'Type of space',
    types: ['Home', 'Business'],
    need: 'Need',
    needs: ['Preventive maintenance', 'Assess a faulty unit', 'Understand the service'],
    submit: 'Simulate enquiry →',
    crmTitle: 'The opportunity arrives with context.',
    crmText:
      'The demo enquiry was organized in a local record with its source and need. A team would have context to follow up.',
    record: 'Example opportunity',
    source: 'Source: ad → landing page → form',
    viewCrm: 'Explore demo CRM ↗',
    resetNotice: 'Journey reset.',
  },
};
const landing = '/demonstracoes/landing-page';
const crm = '/demonstracoes/aplicacoes-crm';

export default function TrafficDemo() {
  const c = useDemoCopy(copy);
  const [step, setStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [type, setType] = useState('residencia');
  const [need, setNeed] = useState('manutencao');
  const [record, setRecord] = useState(null);
  const [notice, setNotice] = useState('');
  const stageTitle = useRef(null);
  const previousStep = useRef(step);
  useEffect(() => {
    if (previousStep.current !== step) {
      stageTitle.current?.focus({ preventScroll: true });
      previousStep.current = step;
    }
  }, [step]);
  const goToStep = (nextStep) => {
    const safeStep = Math.min(3, Math.max(0, nextStep));
    setStep(safeStep);
    setFurthestStep((current) => Math.max(current, safeStep));
    if (safeStep !== 3) setNotice('');
  };
  const reset = () => {
    setStep(0);
    setFurthestStep(0);
    setType('residencia');
    setNeed('manutencao');
    setRecord(null);
    setNotice(c.resetNotice);
  };
  const submit = (event) => {
    event.preventDefault();
    setRecord({ type, need, status: 'novo' });
    setStep(3);
    setFurthestStep(3);
    setNotice(c.recordCreated);
  };
  const crmUrl = `${crm}?origem=campanha&tipo=${record?.type ?? type}&necessidade=${record?.need ?? need}`;
  const typeName = (value) => c.types[value === 'empresa' ? 1 : 0];
  const needName = (value) =>
    c.needs[['manutencao', 'falha', 'informacao'].indexOf(value)] ?? c.needs[0];
  return (
    <ShowcaseShell
      variant="traffic"
      brand="ROTA DIGITAL"
      title={c.title}
      lead={c.lead}
      cardId="servico-trafego-pago"
      onReset={reset}
    >
      <div className="showcase-wrap traffic-layout">
        <nav className="traffic-steps" aria-label={c.kicker}>
          {c.steps.map((label, index) => (
            <button
              type="button"
              key={label}
              className={`${step === index ? 'is-active' : ''} ${index < step ? 'is-done' : ''}`.trim()}
              aria-current={step === index ? 'step' : undefined}
              disabled={index > furthestStep || (index === 3 && !record)}
              onClick={() => goToStep(index)}
            >
              <span>0{index + 1}</span>
              {label}
            </button>
          ))}
        </nav>
        <p role="status" className="showcase-success">
          {notice}
        </p>
        <section className={`traffic-stage traffic-stage--${step}`}>
          {step === 0 && (
            <>
              <div className="traffic-stage-copy">
                <span className="showcase-eyebrow">{c.kicker} / 01</span>
                <h2 ref={stageTitle} tabIndex={-1}>
                  {c.adTitle}
                </h2>
                <p>{c.adText}</p>
                <div className="traffic-facts">
                  <div>
                    <strong>{c.audience}</strong>
                    <span>{c.audienceText}</span>
                  </div>
                  <div>
                    <strong>{c.objective}</strong>
                    <span>{c.objectiveText}</span>
                  </div>
                  <div>
                    <strong>{c.message}</strong>
                    <span>{c.messageText}</span>
                  </div>
                </div>
                <button type="button" className="showcase-button" onClick={() => goToStep(1)}>
                  {c.next}
                </button>
              </div>
              <div className="traffic-ad">
                <span className="traffic-ad-status">{c.campaignStatus}</span>
                <small className="traffic-ad-context">{c.sponsored}</small>
                <div className="traffic-ad-art" aria-hidden="true">
                  <i />
                  <b />
                </div>
                <strong>BRISA CLIMA</strong>
                <h3>{c.adTitle}</h3>
                <p>{c.adText}</p>
                <button type="button" className="traffic-ad-button" onClick={() => goToStep(1)}>
                  {c.adButton}
                </button>
                <small className="traffic-in-page-note">{c.inPageNote}</small>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="traffic-stage-copy">
                <span className="showcase-eyebrow">{c.kicker} / 02</span>
                <h2 ref={stageTitle} tabIndex={-1}>
                  {c.landingTitle}
                </h2>
                <p>{c.landingText}</p>
                <div className="showcase-actions">
                  <a
                    className="showcase-text-link"
                    href={landing}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.openLanding}. ${c.externalNote}`}
                  >
                    {c.openLanding}
                  </a>
                  <button type="button" className="showcase-button" onClick={() => goToStep(2)}>
                    {c.next}
                  </button>
                </div>
                <p className="traffic-external-note">{c.externalNote}</p>
              </div>
              <div className="traffic-browser" aria-label={c.landingTitle}>
                <div className="traffic-browser-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="showcase-eyebrow">BRISA CLIMA</span>
                <h3>{c.adTitle}</h3>
                <strong className="traffic-offer-name">{c.offerName}</strong>
                <p>{c.landingText}</p>
                <p className="traffic-promise-match">{c.offerMatch}</p>
                <a href={landing} target="_blank" rel="noopener noreferrer">
                  {c.openLanding}
                </a>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="traffic-stage-copy">
                <span className="showcase-eyebrow">{c.kicker} / 03</span>
                <h2 ref={stageTitle} tabIndex={-1}>
                  {c.contactTitle}
                </h2>
                <p>{c.contactText}</p>
              </div>
              <form className="showcase-form traffic-form" onSubmit={submit}>
                <label>
                  {c.type}
                  <select
                    value={type}
                    onChange={(event) => {
                      setType(event.target.value);
                      setRecord(null);
                      setFurthestStep(2);
                      setNotice('');
                    }}
                  >
                    <option value="residencia">{c.types[0]}</option>
                    <option value="empresa">{c.types[1]}</option>
                  </select>
                </label>
                <label>
                  {c.need}
                  <select
                    value={need}
                    onChange={(event) => {
                      setNeed(event.target.value);
                      setRecord(null);
                      setFurthestStep(2);
                      setNotice('');
                    }}
                  >
                    <option value="manutencao">{c.needs[0]}</option>
                    <option value="falha">{c.needs[1]}</option>
                    <option value="informacao">{c.needs[2]}</option>
                  </select>
                </label>
                <button type="submit" className="showcase-button">
                  {c.submit}
                </button>
              </form>
            </>
          )}
          {step === 3 && record && (
            <>
              <div className="traffic-stage-copy">
                <span className="showcase-eyebrow">{c.kicker} / 04</span>
                <h2 ref={stageTitle} tabIndex={-1}>
                  {c.crmTitle}
                </h2>
                <p>{c.crmText}</p>
                <a
                  className="showcase-button"
                  href={crmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.viewCrm}. ${c.externalNote}`}
                >
                  {c.viewCrm}
                </a>
                <p className="traffic-external-note">{c.externalNote}</p>
              </div>
              <div className="traffic-record">
                <span className="showcase-eyebrow">CRM / {c.record}</span>
                <span className="traffic-record-id">{c.recordId}</span>
                <h3>BRISA CLIMA</h3>
                <dl>
                  <div>
                    <dt>{c.type}</dt>
                    <dd>{typeName(record.type)}</dd>
                  </div>
                  <div>
                    <dt>{c.need}</dt>
                    <dd>{needName(record.need)}</dd>
                  </div>
                  <div>
                    <dt>{c.source}</dt>
                    <dd>✓</dd>
                  </div>
                  <div>
                    <dt>{c.recordStatus}</dt>
                    <dd>{c.statusNew}</dd>
                  </div>
                  <div>
                    <dt>{c.nextAction}</dt>
                    <dd>
                      {c.nextActions[['manutencao', 'falha', 'informacao'].indexOf(record.need)]}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          )}
        </section>
        {step > 0 && (
          <button
            type="button"
            className="showcase-quiet-button traffic-back"
            onClick={() => goToStep(step - 1)}
          >
            {c.previous}
          </button>
        )}
      </div>
    </ShowcaseShell>
  );
}
