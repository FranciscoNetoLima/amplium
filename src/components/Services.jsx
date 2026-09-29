import { t, useLanguage, localizedWhatsApp } from '../i18n.js';
export default function Services() {
  useLanguage();
  return (
    <>
      <section
        className="section wrap services-section"
        id="servicos"
        aria-labelledby="services-heading"
      >
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">{t('01 / O que fazemos')}</div>
            <h2 id="services-heading">{t('Nossos serviços.')}</h2>
          </div>
          <p>
            {t(
              'Da presença digital à rotina da equipe, soluções pensadas para o que seu negócio precisa.',
            )}
          </p>
        </div>
        <div className="services-grid">
          <article className="service-card service-card--sites reveal">
            <span className="service-number">01 //</span>
            <h3>{t('Sites')}</h3>
            <p>
              {t(
                'Autoridade imediata para o seu negócio. Um posicionamento digital sólido que transmite confiança logo no primeiro clique e faz o seu cliente entender por que deve escolher a sua empresa e não o concorrente.',
              )}
            </p>
            <div className="service-visual website-preview" aria-hidden="true">
              <div className="preview-topbar">
                <span></span>
                <span></span>
                <span></span>
                <i>{t('AMPLIUM')}</i>
              </div>
              <div className="preview-page">
                <div className="preview-nav">
                  <b></b>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-headline">
                  {t('Sua marca.')}
                  <br />
                  {t('Mais presente.')}
                </div>
                <div className="preview-copy"></div>
                <div className="preview-copy short"></div>
                <div className="preview-button"></div>
                <div className="preview-tiles">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <span className="service-caption">{t('AUTORIDADE & CREDIBILIDADE')}</span>
          </article>
          <article className="service-card service-card--landing reveal">
            <span className="service-number">02 //</span>
            <h3>{t('Landing pages')}</h3>
            <p>
              {t(
                'Máxima conversão para a sua oferta. Páginas desenhadas para eliminar distrações e conduzir o visitante diretamente para o botão de compra ou contato no WhatsApp, reduzindo o custo por cliente.',
              )}
            </p>
            <div className="service-visual landing-preview" aria-hidden="true">
              <div className="landing-line"></div>
              <div className="landing-line"></div>
              <div className="landing-cta">{t('Vamos conversar ↗')}</div>
              <div className="landing-orbit"></div>
            </div>
            <span className="service-caption">{t('ALTA TAXA DE CONVERSÃO')}</span>
          </article>
          <article className="service-card service-card--commerce reveal">
            <span className="service-number">03 //</span>
            <h3>{t('E-commerce')}</h3>
            <p>
              {t(
                'Vendas ativas sem atrito. Lojas virtuais rápidas, seguras e intuitivas, estruturadas para transformar navegação em carrinho fechado de forma automática.',
              )}
            </p>
            <div className="service-visual commerce-preview" aria-hidden="true">
              <div>
                <span></span>
                <i></i>
                <b></b>
              </div>
              <div>
                <span></span>
                <i></i>
                <b></b>
              </div>
              <div>
                <span></span>
                <i></i>
                <b></b>
              </div>
            </div>
            <span className="service-caption">{t('SUA LOJA VENDENDO 24/7')}</span>
          </article>
          <article className="service-card service-card--crm reveal">
            <span className="service-number">04 //</span>
            <h3>{t('Sistemas & CRM')}</h3>
            <p>
              {t(
                'Fim dos contatos perdidos. Centralize clientes, negociações e rotinas em um painel único para que sua equipe nunca mais deixe uma venda escapar por falta de acompanhamento.',
              )}
            </p>
            <div className="service-visual crm-preview" aria-hidden="true">
              <div>
                <i></i>
                <span></span>
                <span></span>
              </div>
              <div>
                <i></i>
                <span></span>
              </div>
              <div>
                <i></i>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <span className="service-caption">{t('OPERAÇÃO ESCALÁVEL E ORGANIZADA')}</span>
          </article>
          <article className="service-card service-card--automation reveal">
            <span className="service-number">05 //</span>
            <h3>{t('Automações & IA')}</h3>
            <p>
              {t(
                'Respostas instantâneas e processos inteligentes. Atenda clientes 24/7, faça disparos e elimine horas de trabalho manual para focar apenas nas decisões estratégicas.',
              )}
            </p>
            <div className="service-visual automation-preview" aria-hidden="true">
              <span>{t('Entrada')}</span>
              <i></i>
              <span>{t('Automação')}</span>
              <i></i>
              <span>{t('Ação')}</span>
            </div>
            <span className="service-caption">{t('PROCESSOS QUE TRABALHAM POR VOCÊ')}</span>
          </article>
          <article className="service-card service-card--ads reveal">
            <span className="service-number">06 //</span>
            <h3>{t('Tráfego pago')}</h3>
            <p>
              {t(
                'Atração contínua do cliente certo. Campanhas orientadas a retorno sobre investimento (ROI), colocando sua solução diante de quem já tem intenção real de compra.',
              )}
            </p>
            <div className="service-visual ads-preview" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="service-caption">{t('CLIENTES QUALIFICADOS TODOS OS DIAS')}</span>
          </article>
        </div>
        <article id="captacao" className="capture-card reveal" aria-labelledby="capture-heading">
          <div className="capture-copy">
            <span className="service-number">07 //</span>
            <span className="capture-label">{t('Para ampliar sua divulgação')}</span>
            <h3 id="capture-heading">
              {t('O ecossistema completo: do primeiro anúncio à venda fechada.')}
            </h3>
            <p className="capture-description">
              {t(
                'Um anúncio solto ou um site isolado não sustentam o crescimento da sua empresa. Integramos tráfego qualificado, páginas de alta resposta e automação de CRM para que nenhum lead fique sem resposta e sua equipe saiba exatamente o retorno de cada real investido.',
              )}
            </p>
            <a
              className="primary capture-cta"
              href={localizedWhatsApp(
                'https://wa.me/5588992431477?text=Ol%C3%A1%21%20Tenho%20interesse%20na%20solu%C3%A7%C3%A3o%20de%20capta%C3%A7%C3%A3o%20de%20oportunidades%20da%20Amplium.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Conhecer essa solução ')}
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="capture-flow" aria-label={t('Etapas da captação de oportunidades')}>
            <p className="capture-flow-label">{t('Fluxo integrado de conversão')}</p>
            <ol className="capture-steps">
              <li className="capture-step">
                <button
                  type="button"
                  className="flow-stage"
                  data-stage="0"
                  aria-pressed="true"
                  aria-controls="capture-stage-note"
                >
                  <span className="flow-chrome" aria-hidden="true">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span></span>
                  </span>
                  <small>{t('Etapa 01')}</small>
                  <strong>{t('Anúncio')}</strong>
                  <div className="flow-illustration flow-ad" aria-hidden="true">
                    <b></b>
                    <span></span>
                  </div>
                </button>
              </li>
              <li className="capture-step">
                <button
                  type="button"
                  className="flow-stage"
                  data-stage="1"
                  aria-pressed="false"
                  aria-controls="capture-stage-note"
                >
                  <span className="flow-chrome" aria-hidden="true">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span></span>
                  </span>
                  <small>{t('Etapa 02')}</small>
                  <strong>{t('Landing page')}</strong>
                  <div className="flow-illustration flow-page" aria-hidden="true">
                    <b></b>
                    <span></span>
                    <span></span>
                    <i></i>
                  </div>
                </button>
              </li>
              <li className="capture-step">
                <button
                  type="button"
                  className="flow-stage"
                  data-stage="2"
                  aria-pressed="false"
                  aria-controls="capture-stage-note"
                >
                  <span className="flow-chrome" aria-hidden="true">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span></span>
                  </span>
                  <small>{t('Etapa 03')}</small>
                  <strong>{t('Contato')}</strong>
                  <div className="flow-illustration flow-chat" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </button>
              </li>
              <li className="capture-step">
                <button
                  type="button"
                  className="flow-stage"
                  data-stage="3"
                  aria-pressed="false"
                  aria-controls="capture-stage-note"
                >
                  <span className="flow-chrome" aria-hidden="true">
                    <i></i>
                    <i></i>
                    <i></i>
                    <span></span>
                  </span>
                  <small>{t('Etapa 04')}</small>
                  <strong>{t('CRM & vendas')}</strong>
                  <div className="flow-illustration flow-crm" aria-hidden="true">
                    <span>
                      <i></i>
                      <b></b>
                      <b></b>
                    </span>
                    <span>
                      <i></i>
                      <b></b>
                    </span>
                    <span>
                      <i></i>
                      <b></b>
                      <b></b>
                    </span>
                  </div>
                </button>
              </li>
            </ol>
            <p id="capture-stage-note" className="capture-stage-note" aria-live="off">
              {t('Anúncios apresentam sua oferta a potenciais clientes.')}
            </p>
          </div>
          <ul className="capture-benefits">
            <li>{t('Landing page focada na sua oferta com alta conversão.')}</li>
            <li>{t('Anúncios para atrair clientes prontos para comprar.')}</li>
            <li>{t('Contatos, vendas e métricas centralizados no CRM.')}</li>
          </ul>
        </article>
      </section>
    </>
  );
}
