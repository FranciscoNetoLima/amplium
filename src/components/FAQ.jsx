import { t, useLanguage } from '../i18n.js';
import { useState } from 'react';
const questions = [
  {
    question: 'Já tenho Instagram. Por que investir em um site?',
    answer:
      'O Instagram ajuda na divulgação e no relacionamento com o público. O site oferece um espaço próprio para organizar seus serviços, diferenciais, projetos, dúvidas e formas de contato. Assim, quem procura sua empresa consegue entender melhor o que você oferece antes de pedir um orçamento.',
  },
  {
    question: 'Como saber se preciso de um site ou de uma landing page?',
    answer:
      'O site é indicado para apresentar a empresa, seus serviços e diferentes informações em uma estrutura completa. A landing page concentra uma oferta e uma ação específica, como solicitar orçamento, realizar um cadastro ou comprar. A escolha depende do seu objetivo e de como as pessoas chegarão até a página.',
  },
  {
    question: 'Como sistemas, CRM e automações podem ajudar minha empresa?',
    answer:
      'Um CRM organiza contatos e negociações. Sistemas centralizam informações e processos, enquanto automações e IA ajudam em tarefas repetitivas e no atendimento. Primeiro entendemos sua rotina para definir o que faz sentido conectar ou desenvolver.',
  },
  {
    question: 'Vocês também cuidam dos anúncios e da captação de clientes?',
    answer:
      'Sim. Podemos combinar tráfego pago, landing page e acompanhamento dos contatos no CRM. Assim, sua equipe acompanha as oportunidades até a negociação. A verba de anúncios é definida separadamente e paga à plataforma utilizada.',
  },
  {
    question: 'Quanto custa e quanto tempo leva para desenvolver um projeto?',
    answer:
      'O valor e o prazo dependem das páginas, funcionalidades, integrações e materiais necessários. Após entender sua necessidade, apresentamos uma proposta com escopo, cronograma, investimento e condições de pagamento.',
  },
  {
    question: 'Posso atualizar o projeto e contar com suporte depois da entrega?',
    answer:
      'Quando o projeto inclui recursos de edição, orientamos sua equipe sobre como atualizar os conteúdos previstos. Suporte, manutenção, hospedagem e novas funcionalidades seguem as condições definidas na proposta.',
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
            <h2 id="faq-heading">{t('Antes do próximo passo.')}</h2>
          </div>
          <p>
            {t(
              'Respostas para ajudar você a escolher a solução e entender como começamos seu projeto.',
            )}
          </p>
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
