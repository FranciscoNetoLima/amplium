import { useState } from 'react';
import { ShowcaseShell, useDemoCopy } from './ShowcaseShell.jsx';

const copy = {
  pt: {
    title: 'Da divulgação ao contato, cada etapa conectada.',
    lead: 'Acompanhe uma campanha fictícia da Brisa Clima. O anúncio não está ativo e não há métricas ou captação real de contatos.',
    kicker: 'CAMPANHA DE EXEMPLO / BRISA CLIMA',
    steps: ['Anúncio', 'Landing page', 'Solicitação', 'CRM'],
    next: 'Continuar percurso →',
    previous: '← Etapa anterior',
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
  const [type, setType] = useState('residencia');
  const [need, setNeed] = useState('manutencao');
  const [record, setRecord] = useState(null);
  const [notice, setNotice] = useState('');
  const reset = () => {
    setStep(0);
    setType('residencia');
    setNeed('manutencao');
    setRecord(null);
    setNotice(c.resetNotice);
  };
  const submit = (event) => {
    event.preventDefault();
    setRecord({ type, need });
    setStep(3);
    setNotice('');
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
              className={step === index ? 'is-active' : ''}
              aria-current={step === index ? 'step' : undefined}
              disabled={index === 3 && !record}
              onClick={() => setStep(index)}
            >
              <span>0{index + 1}</span>
              {label}
            </button>
          ))}
        </nav>
        <p role="status" className="showcase-success">
          {notice}
        </p>
        <section className="traffic-stage" aria-live="polite">
          {step === 0 && (
            <>
              <div className="traffic-stage-copy">
                <span className="showcase-eyebrow">{c.kicker} / 01</span>
                <h2>{c.adTitle}</h2>
                <p>{c.adText}</p>
                <div className="traffic-facts">
                  <div>
                    <strong>{c.audience}</strong>
                    <span>{c.audienceText}</span>
                  </div>
                  <div>
                    <strong>{c.message}</strong>
                    <span>{c.messageText}</span>
                  </div>
                </div>
                <button type="button" className="showcase-button" onClick={() => setStep(1)}>
                  {c.next}
                </button>
              </div>
              <div className="traffic-ad">
                <span>{c.sponsored}</span>
                <div className="traffic-ad-art" aria-hidden="true">
                  <i />
                  <b />
                </div>
                <strong>BRISA CLIMA</strong>
                <h3>{c.adTitle}</h3>
                <p>{c.adText}</p>
                <span className="traffic-ad-button">{c.adButton}</span>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="traffic-stage-copy">
                <span className="showcase-eyebrow">{c.kicker} / 02</span>
                <h2>{c.landingTitle}</h2>
                <p>{c.landingText}</p>
                <div className="showcase-actions">
                  <a
                    className="showcase-text-link"
                    href={landing}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.openLanding}
                  </a>
                  <button type="button" className="showcase-button" onClick={() => setStep(2)}>
                    {c.next}
                  </button>
                </div>
              </div>
              <div className="traffic-browser" aria-label={c.landingTitle}>
                <div className="traffic-browser-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="showcase-eyebrow">BRISA CLIMA</span>
                <h3>{c.adTitle}</h3>
                <p>{c.landingText}</p>
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
                <h2>{c.contactTitle}</h2>
                <p>{c.contactText}</p>
              </div>
              <form className="showcase-form traffic-form" onSubmit={submit}>
                <label>
                  {c.type}
                  <select value={type} onChange={(event) => setType(event.target.value)}>
                    <option value="residencia">{c.types[0]}</option>
                    <option value="empresa">{c.types[1]}</option>
                  </select>
                </label>
                <label>
                  {c.need}
                  <select value={need} onChange={(event) => setNeed(event.target.value)}>
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
                <h2>{c.crmTitle}</h2>
                <p>{c.crmText}</p>
                <a className="showcase-button" href={crmUrl}>
                  {c.viewCrm}
                </a>
              </div>
              <div className="traffic-record">
                <span className="showcase-eyebrow">CRM / {c.record}</span>
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
                </dl>
              </div>
            </>
          )}
        </section>
        {step > 0 && (
          <button
            type="button"
            className="showcase-quiet-button traffic-back"
            onClick={() => setStep((current) => current - 1)}
          >
            {c.previous}
          </button>
        )}
      </div>
    </ShowcaseShell>
  );
}
