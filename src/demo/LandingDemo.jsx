import { useState } from 'react';
import { ShowcaseShell, useDemoCopy } from './ShowcaseShell.jsx';

const copy = {
  pt: {
    title: 'Um ar mais agradável começa com o cuidado certo.',
    lead: 'Uma página de oferta para a Brisa Clima: manutenção preventiva de ar-condicionado para residências e empresas.',
    tag: 'MANUTENÇÃO PREVENTIVA / BRISA CLIMA',
    hero: 'Cuide do seu ar-condicionado antes que ele interrompa sua rotina.',
    heroText:
      'Limpeza, inspeção e orientação em uma visita planejada para o seu equipamento e o seu ambiente.',
    quote: 'Solicitar orçamento →',
    learn: 'Entenda o serviço ↓',
    visual: 'Conforto para o seu espaço, cuidado para o seu equipamento.',
    offer: 'O que está incluído na conversa inicial',
    offerText:
      'O atendimento começa entendendo seu equipamento, o uso do ambiente e os sinais que você percebe. Assim, o escopo do serviço fica claro antes da execução.',
    benefits: [
      [
        'Inspeção orientada',
        'Verificamos o funcionamento e conversamos sobre sinais de desgaste ou falhas.',
      ],
      [
        'Limpeza planejada',
        'Definimos o cuidado adequado para os componentes acessíveis do equipamento.',
      ],
      [
        'Próximos passos claros',
        'Explicamos o que foi observado e quando uma avaliação adicional pode ser necessária.',
      ],
    ],
    stepsTitle: 'Como funciona o atendimento',
    steps: [
      ['01', 'Conte o que precisa', 'Descreva o ambiente, o aparelho e sua dúvida.'],
      [
        '02',
        'Receba uma orientação',
        'O escopo da visita e as condições são apresentados antes de começar.',
      ],
      ['03', 'Cuide do equipamento', 'O serviço é executado conforme o que foi combinado.'],
    ],
    faqTitle: 'Dúvidas frequentes',
    faq: [
      [
        'Quando devo pedir manutenção?',
        'Quando notar mudança no desempenho, ruído ou odor, ou quando quiser organizar uma rotina preventiva para o equipamento.',
      ],
      [
        'O orçamento é feito antes do serviço?',
        'Sim. A avaliação inicial ajuda a definir o escopo; valores e condições são apresentados antes da aprovação.',
      ],
      [
        'Atendem residências e empresas?',
        'Esta demonstração apresenta os dois contextos. Em um projeto real, o atendimento dependeria da região e da disponibilidade da empresa.',
      ],
    ],
    formTitle: 'Conte sobre o seu ambiente.',
    formText:
      'Teste como um visitante solicitaria uma proposta. Use apenas dados fictícios: nenhuma informação é enviada ou armazenada.',
    name: 'Nome de exemplo',
    namePlaceholder: 'Pessoa Exemplo',
    email: 'E-mail de exemplo',
    space: 'Tipo de ambiente',
    spaceDefault: 'Selecione',
    fill: 'Preencha este campo.',
    home: 'Residência',
    business: 'Empresa',
    message: 'O que acontece com o equipamento?',
    messagePlaceholder: 'Ex.: O aparelho faz um ruído diferente e quero avaliar a manutenção.',
    send: 'Simular solicitação →',
    success: 'Solicitação demonstrativa concluída. Nenhum dado foi enviado ou armazenado.',
  },
  en: {
    title: 'Better air starts with the right care.',
    lead: 'An offer page for Brisa Clima: preventive air-conditioning maintenance for homes and businesses.',
    tag: 'PREVENTIVE MAINTENANCE / BRISA CLIMA',
    hero: 'Care for your air conditioner before it disrupts your day.',
    heroText:
      'Cleaning, inspection and guidance in a visit planned around your equipment and space.',
    quote: 'Request a quote →',
    learn: 'Explore the service ↓',
    visual: 'Comfort for your space, care for your equipment.',
    offer: 'What the first conversation covers',
    offerText:
      'We start by understanding your equipment, how the space is used and what you have noticed. That makes the scope clear before work begins.',
    benefits: [
      ['Guided inspection', 'We check operation and discuss signs of wear or faults.'],
      ['Planned cleaning', 'We define the right care for accessible equipment components.'],
      [
        'Clear next steps',
        'We explain what was observed and whether further assessment may be needed.',
      ],
    ],
    stepsTitle: 'How the service works',
    steps: [
      ['01', 'Tell us what you need', 'Describe the space, unit and your question.'],
      ['02', 'Get guidance', 'Scope and conditions are presented before work starts.'],
      ['03', 'Care for the equipment', 'The work follows the agreed scope.'],
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      [
        'When should I request maintenance?',
        'When you notice changes in performance, noise or smell, or want to plan preventive care.',
      ],
      [
        'Is the quote provided before work?',
        'Yes. An initial assessment helps define the scope; prices and conditions are presented before approval.',
      ],
      [
        'Do you serve homes and businesses?',
        'This demo shows both contexts. Real service would depend on the company’s area and availability.',
      ],
    ],
    formTitle: 'Tell us about your space.',
    formText:
      'Try how a visitor would request a quote. Use fictional details only: nothing is sent or stored.',
    name: 'Example name',
    namePlaceholder: 'Example Person',
    email: 'Example email',
    space: 'Type of space',
    spaceDefault: 'Select one',
    fill: 'Please fill out this field.',
    home: 'Home',
    business: 'Business',
    message: 'What is happening with the unit?',
    messagePlaceholder: 'E.g. The unit makes a different noise and I want to assess maintenance.',
    send: 'Simulate request →',
    success: 'Demo request complete. No data was sent or stored.',
  },
};

export default function LandingDemo() {
  const c = useDemoCopy(copy);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', space: '', message: '' });
  const update = (event) => {
    event.target.setCustomValidity('');
    setSubmitted(false);
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  };
  const submit = (event) => {
    event.preventDefault();
    for (const [key, value] of Object.entries(values)) {
      if (!value.trim()) {
        const field = event.currentTarget.elements.namedItem(key);
        field.setCustomValidity(c.fill);
        field.reportValidity();
        return;
      }
    }
    setSubmitted(true);
    setValues({ name: '', email: '', space: '', message: '' });
  };
  const reset = () => {
    setSubmitted(false);
    setValues({ name: '', email: '', space: '', message: '' });
  };
  return (
    <ShowcaseShell
      variant="landing"
      brand="BRISA CLIMA"
      title={c.title}
      lead={c.lead}
      cardId="servico-landing-pages"
      onReset={reset}
    >
      <section className="showcase-wrap landing-hero">
        <div>
          <span className="showcase-eyebrow">{c.tag}</span>
          <h2>{c.hero}</h2>
          <p>{c.heroText}</p>
          <div className="showcase-actions">
            <a className="showcase-button" href="#formulario">
              {c.quote}
            </a>
            <a className="showcase-text-link" href="#servico">
              {c.learn}
            </a>
          </div>
        </div>
        <div className="landing-art" aria-hidden="true">
          <span className="landing-art-sun" />
          <span className="landing-art-unit" />
          <span className="landing-art-line landing-art-line-one" />
          <span className="landing-art-line landing-art-line-two" />
          <b>{c.visual}</b>
        </div>
      </section>
      <section className="showcase-wrap showcase-section" id="servico">
        <div className="showcase-section-head">
          <span className="showcase-eyebrow">BRISA CLIMA / 01</span>
          <h2>{c.offer}</h2>
          <p>{c.offerText}</p>
        </div>
        <div className="showcase-three-grid">
          {c.benefits.map(([title, text], index) => (
            <article className="showcase-card" key={title}>
              <span className="showcase-card-number">0{index + 1} /</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="showcase-wrap showcase-section landing-steps">
        <div className="showcase-section-head">
          <span className="showcase-eyebrow">BRISA CLIMA / 02</span>
          <h2>{c.stepsTitle}</h2>
        </div>
        <ol>
          {c.steps.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="showcase-wrap showcase-section landing-faq">
        <div className="showcase-section-head">
          <span className="showcase-eyebrow">BRISA CLIMA / 03</span>
          <h2>{c.faqTitle}</h2>
        </div>
        <div>
          {c.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="showcase-wrap showcase-section landing-form-section" id="formulario">
        <div>
          <span className="showcase-eyebrow">BRISA CLIMA / CONTATO</span>
          <h2>{c.formTitle}</h2>
          <p>{c.formText}</p>
        </div>
        <form className="showcase-form" onSubmit={submit}>
          <div className="showcase-form-row">
            <label>
              {c.name}
              <input
                name="name"
                required
                minLength={2}
                maxLength={80}
                value={values.name}
                onChange={update}
                placeholder={c.namePlaceholder}
              />
            </label>
            <label>
              {c.email}
              <input
                name="email"
                type="email"
                required
                maxLength={120}
                value={values.email}
                onChange={update}
                placeholder="exemplo@example.com"
              />
            </label>
          </div>
          <label>
            {c.space}
            <select name="space" required value={values.space} onChange={update}>
              <option value="">{c.spaceDefault}</option>
              <option value="residencia">{c.home}</option>
              <option value="empresa">{c.business}</option>
            </select>
          </label>
          <label>
            {c.message}
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={800}
              rows={4}
              value={values.message}
              onChange={update}
              placeholder={c.messagePlaceholder}
            />
          </label>
          <button type="submit" className="showcase-button">
            {c.send}
          </button>
          <p role="status" aria-live="polite" className="showcase-success">
            {submitted ? c.success : ''}
          </p>
        </form>
      </section>
    </ShowcaseShell>
  );
}
