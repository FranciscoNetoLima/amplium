import { t, useLanguage } from '../i18n.js';
import { useState } from 'react';
const questions = [
  {
    question: 'Já tenho Instagram. Por que investir em um site?',
    answer:
      'O Instagram ajuda as pessoas a descobrir sua marca. No site, elas encontram seus serviços, diferenciais e formas de contato em um só lugar.',
  },
  {
    question: 'Como saber se preciso de um site ou de uma landing page?',
    answer:
      'O site apresenta sua empresa de forma completa. A landing page concentra uma oferta e conduz o visitante a uma ação específica.',
  },
  {
    question: 'Como sistemas, CRM e automações podem ajudar minha empresa?',
    answer:
      'O CRM organiza contatos e negociações. As automações reduzem tarefas repetitivas e ajudam sua equipe a acompanhar cada oportunidade.',
  },
  {
    question: 'Vocês também cuidam dos anúncios e da captação de clientes?',
    answer:
      'Sim. Podemos conectar anúncios, landing page e CRM para acompanhar os contatos gerados. A verba dos anúncios é definida à parte.',
  },
  {
    question: 'Quanto custa e quanto tempo leva para desenvolver um projeto?',
    answer:
      'Depende do escopo. Após entender seu projeto, apresentamos proposta com investimento, prazo e entregas.',
  },
  {
    question: 'Posso atualizar o projeto e contar com suporte depois da entrega?',
    answer: 'As condições de suporte, manutenção e futuras melhorias são definidas na proposta.',
  },
];
export default function FAQ() {
  useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">{t('04 / Dúvidas frequentes')}</div>
            <h2 id="faq-heading">{t('O que você precisa saber para começar.')}</h2>
          </div>
          <p>{t('Respostas diretas para escolher a solução certa.')}</p>
        </div>
        <div className="faq-list reveal">
          {t(
            questions.map(({ question, answer }, index) => {
              const expanded = openIndex === index;
              return (
                <div className={`faq-item${expanded ? ' is-open' : ''}`} key={question}>
                  <h3>
                    <button
                      id={`faq-question-${index}`}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenIndex(expanded ? null : index)}
                    >
                      <span className="faq-number" aria-hidden="true">
                        0{t(index + 1)}
                      </span>
                      <span>{t(question)}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    aria-hidden={!expanded}
                    inert={!expanded}
                  >
                    <div>
                      <p>{t(answer)}</p>
                    </div>
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>
    </section>
  );
}
