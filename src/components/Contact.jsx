import { t, useLanguage } from '../i18n.js';
import { useEffect, useRef, useState } from 'react';
import { normalizeText, isValidContact, buildWhatsAppUrl } from '../contact-utils.js';
const goals = [
  'Presença digital',
  'Captação de clientes',
  'Vendas',
  'Organização',
  'Atendimento',
  'Ainda não sei',
];
const paths = [
  'M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01',
  'M12 3v4 M12 17v4 M3 12h4 M17 12h4 M12 8a4 4 0 1 0 0 8a4 4 0 0 0 0-8',
  'M4 4h2l3 12h10l2-8H7 M10 20h.01 M18 20h.01',
  'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  'M4 5h16v12H9l-5 4z M8 9h8 M8 13h5',
  'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4 M12 18h.01',
];
const situations = {
  'Presença digital': {
    question: 'Como sua empresa aparece hoje na internet?',
    options: [
      'Só nas redes sociais',
      'Tenho um site para melhorar',
      'Ainda não tenho presença digital',
    ],
  },
  'Captação de clientes': {
    question: 'Como chegam novos clientes hoje?',
    options: [
      'Indicações e redes sociais',
      'Já faço anúncios',
      'Tenho anúncios e landing page',
      'Quero começar do zero',
    ],
  },
  Vendas: {
    question: 'Como você vende atualmente?',
    options: [
      'WhatsApp ou redes sociais',
      'Loja física',
      'Já tenho uma loja virtual',
      'Quero começar a vender online',
    ],
  },
  Organização: {
    question: 'Como você organiza a operação hoje?',
    options: [
      'Planilhas e tarefas manuais',
      'Já utilizo um CRM',
      'Tenho sistemas que não se conectam',
      'Preciso definir um processo',
    ],
  },
  Atendimento: {
    question: 'Como funciona seu atendimento hoje?',
    options: [
      'Tudo é feito pela equipe',
      'Já utilizo automações',
      'Preciso organizar contatos e pedidos',
      'Quero entender as possibilidades',
    ],
  },
  'Ainda não sei': {
    question: 'Qual situação mais se aproxima do seu momento?',
    options: [
      'Estou começando um negócio',
      'Quero melhorar o que já existe',
      'Preciso de orientação para decidir',
    ],
  },
};
export default function Contact() {
  useLanguage();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    situation: '',
    name: '',
    contact: '',
    description: '',
  });
  const headingRef = useRef(null);
  const interacted = useRef(false);
  useEffect(() => {
    if (interacted.current)
      headingRef.current?.focus({
        preventScroll: true,
      });
  }, [step]);
  const update = (key, value) =>
    setAnswers((previous) => ({
      ...previous,
      [key]: value,
    }));
  const go = (next) => {
    interacted.current = true;
    setStep(next);
  };
  const buildMessage = () =>
    [
      t('Olá! Quero conversar sobre um projeto com a Amplium.'),
      '',
      `${t('Nome')}: ${normalizeText(answers.name, 100)}`,
      ...(normalizeText(answers.contact, 150)
        ? [`${t('Contato')}: ${normalizeText(answers.contact, 150)}`]
        : []),
      `${t('Quero melhorar')}: ${t(answers.goal)}`,
      `${t('Meu momento')}: ${t(answers.situation || 'Prefiro explicar na conversa')}`,
      ...(normalizeText(answers.description, 1200, true)
        ? [`${t('Minha necessidade')}: ${normalizeText(answers.description, 1200, true)}`]
        : []),
    ].join('\n');
  const submit = (event) => {
    event.preventDefault();
    if (step < 3) {
      go(step + 1);
      return;
    }
    const contactField = event.currentTarget.elements.namedItem('contact');
    const invalid = !isValidContact(answers.contact);
    const nameField = event.currentTarget.elements.namedItem('name');
    nameField?.setCustomValidity(normalizeText(answers.name, 100) ? '' : t('Informe seu nome.'));
    contactField?.setCustomValidity(
      invalid ? t('Informe um telefone válido com código de área ou um e-mail válido.') : '',
    );
    if (!normalizeText(answers.name, 100) || invalid) {
      event.currentTarget.reportValidity();
      return;
    }
    const nextMessage = buildMessage();
    window.open(buildWhatsAppUrl(nextMessage), '_blank', 'noopener,noreferrer');
  };
  const stepReady =
    step === 1
      ? Boolean(answers.goal)
      : step === 2
        ? Boolean(answers.situation)
        : Boolean(normalizeText(answers.name, 100)) && isValidContact(answers.contact);
  const situation = situations[answers.goal];
  const title =
    step === 1
      ? 'O que você quer melhorar?'
      : step === 2
        ? situation.question
        : 'Como podemos chamar você?';
  return (
    <section className="closing" id="contato">
      <div className="wrap closing-inner reveal">
        <div className="eyebrow">{t('O próximo passo é seu')}</div>
        <h2>{t('Seu próximo cliente precisa encontrar uma boa razão para escolher você.')}</h2>
        <p>
          {t(
            'Conte seu objetivo para a Amplium. Vamos definir uma solução que faça sentido para o seu negócio.',
          )}
        </p>
        <form className="project-brief brief-wizard" method="post" onSubmit={submit}>
          <div className="brief-progress-head">
            <span>{t(`Etapa ${step} de 3`)}</span>
            <span>{t('Vamos entender seu projeto')}</span>
          </div>
          <div
            className="brief-progress"
            role="progressbar"
            aria-label={t('Progresso do questionário')}
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={step}
          >
            <span
              style={{
                width: `${(step / 3) * 100}%`,
              }}
            />
          </div>
          <div className="brief-step" key={step}>
            <h3 ref={headingRef} tabIndex={-1}>
              {t(title)}
            </h3>
            {t(
              step === 1 && (
                <fieldset className="brief-group">
                  <legend className="brief-sr-only">{t('Escolha o objetivo do projeto')}</legend>
                  <div className="brief-goals">
                    {t(
                      goals.map((goal, index) => (
                        <label className="brief-choice" key={goal}>
                          <input
                            type="radio"
                            name="goal"
                            value={goal}
                            checked={answers.goal === goal}
                            onChange={() =>
                              setAnswers((previous) => ({
                                ...previous,
                                goal,
                                situation: '',
                              }))
                            }
                            required
                          />
                          <span>
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d={paths[index]} />
                            </svg>
                            {t(goal)}
                            <b aria-hidden="true">{t(answers.goal === goal ? '✓' : '↗')}</b>
                          </span>
                        </label>
                      )),
                    )}
                  </div>
                </fieldset>
              ),
            )}
            {t(
              step === 2 && (
                <fieldset className="brief-group">
                  <legend className="brief-sr-only">
                    {t('Selecione sua situação atual, se desejar')}
                  </legend>
                  <p className="brief-step-note">
                    {t(
                      'Escolha a opção mais próxima da sua realidade. Você também pode pular esta pergunta.',
                    )}
                  </p>
                  <div className="brief-situations">
                    {t(
                      situation.options.map((option) => (
                        <label className="brief-choice" key={option}>
                          <input
                            type="radio"
                            name="situation"
                            value={option}
                            checked={answers.situation === option}
                            onChange={() => update('situation', option)}
                          />
                          <span>
                            {t(option)}
                            <b aria-hidden="true">{t(answers.situation === option ? '✓' : '+')}</b>
                          </span>
                        </label>
                      )),
                    )}
                  </div>
                </fieldset>
              ),
            )}
            {t(
              step === 3 && (
                <div className="brief-fields">
                  <label>
                    {t('Seu nome')}
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder={t('Como você se chama?')}
                      value={answers.name}
                      onChange={(event) => {
                        event.target.setCustomValidity('');
                        update('name', event.target.value);
                      }}
                      required
                      maxLength={100}
                      pattern=".*\S.*"
                    />
                  </label>
                  <label>
                    {t('Telefone ou e-mail ')}
                    <small>{t('Opcional')}</small>
                    <input
                      name="contact"
                      placeholder={t('Seu melhor contato')}
                      value={answers.contact}
                      onChange={(event) => {
                        event.target.setCustomValidity('');
                        update('contact', event.target.value);
                      }}
                      maxLength={150}
                    />
                  </label>
                  <label className="brief-description">
                    {t('Conte um pouco sobre sua necessidade ')}
                    <small>{t('Opcional')}</small>
                    <textarea
                      name="description"
                      placeholder={t('Qual desafio você quer resolver?')}
                      rows={3}
                      value={answers.description}
                      onChange={(event) => update('description', event.target.value)}
                      maxLength={1200}
                    />
                  </label>
                </div>
              ),
            )}
          </div>
          <div className="brief-wizard-actions">
            {t(
              step > 1 && (
                <button type="button" className="brief-back" onClick={() => go(step - 1)}>
                  {t('← Voltar')}
                </button>
              ),
            )}
            <button
              type="submit"
              className={`primary${stepReady ? ' is-ready' : ''}`}
              disabled={step === 1 && !answers.goal}
            >
              {t(
                step === 3
                  ? 'Enviar mensagem pelo WhatsApp ↗'
                  : step === 2 && !answers.situation
                    ? 'Pular e continuar →'
                    : 'Continuar →',
              )}
            </button>
          </div>
        </form>
        <a
          className="brief-direct"
          href={buildWhatsAppUrl(t('Olá! Quero conversar sobre um projeto para minha empresa.'))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Prefiro conversar diretamente ')}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
