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
            <div className="eyebrow">{t('01 / Soluções')}</div>
            <h2 id="services-heading">{t('Soluções para seu negócio avançar.')}</h2>
          </div>
          <p>
            {t('Da primeira visita à venda, conectamos tecnologia aos resultados que você busca.')}
          </p>
        </div>
        <div className="services-grid">
          <article id="servico-sites" className="service-card service-card--sites reveal">
            <span id="servico-landing-pages" className="service-anchor" aria-hidden="true" />
            <span className="service-number">01 //</span>
            <h3>{t('Sites e landing pages')}</h3>
            <p>
              {t(
                'Apresente sua empresa com um site que gera confiança ou destaque uma oferta com uma landing page focada em contatos e vendas.',
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
            <span className="service-caption">{t('Presença que gera oportunidades')}</span>
            <div className="service-demo-links">
              <a
                className="service-demo-link"
                href="/demonstracoes/site-servicos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('Ver site de exemplo (abre em nova aba)')}
              >
                {t('Ver site de exemplo')} <span aria-hidden="true">↗</span>
              </a>
              <a
                className="service-demo-link"
                href="/demonstracoes/landing-page"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('Ver landing page de exemplo (abre em nova aba)')}
              >
                {t('Ver landing page de exemplo')} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a className="service-demo-link" href="#portfolio">
              {t('Conhecer projeto de portfólio')} <span aria-hidden="true">↓</span>
            </a>
          </article>
          <article id="servico-e-commerce" className="service-card service-card--commerce reveal">
            <span className="service-number">02 //</span>
            <h3>{t('E-commerce')}</h3>
            <p>
              {t(
                'Seu cliente quer comprar, sem esperar respostas. Facilite a venda com produtos, pagamentos e pedidos na sua loja.',
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
            <span className="service-caption">{t('Menos espera para comprar')}</span>
            <a
              className="service-demo-link"
              href="/demonstracoes/e-commerce"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Explorar loja demonstrativa (abre em nova aba)')}
            >
              {t('Explorar loja demonstrativa')} <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article id="servico-aplicacoes-crm" className="service-card service-card--crm reveal">
            <span className="service-number">03 //</span>
            <h3>{t('Aplicações e CRM')}</h3>
            <p>
              {t(
                'Contatos dispersos e retornos esquecidos custam oportunidades. Centralize negociações e rotinas com sistemas e CRM sob medida.',
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
            <span className="service-caption">{t('Mais controle para vender')}</span>
            <a
              className="service-demo-link"
              href="/demonstracoes/aplicacoes-crm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Explorar CRM demonstrativo (abre em nova aba)')}
            >
              {t('Explorar CRM demonstrativo')} <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article
            id="servico-automacoes-ia"
            className="service-card service-card--automation reveal"
          >
            <span className="service-number">04 //</span>
            <h3>{t('Automações e IA')}</h3>
            <p>
              {t(
                'Tarefas repetitivas tiram tempo do atendimento. Automatize rotinas e respostas para sua equipe atender melhor.',
              )}
            </p>
            <div className="service-visual automation-preview" aria-hidden="true">
              <span>{t('Entrada')}</span>
              <i></i>
              <span>{t('Automação')}</span>
              <i></i>
              <span>{t('Ação')}</span>
            </div>
            <span className="service-caption">{t('Libere tempo para crescer')}</span>
            <a
              className="service-demo-link"
              href="/demonstracoes/automacoes-ia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Experimentar automação e IA (abre em nova aba)')}
            >
              {t('Experimentar automação e IA')} <span aria-hidden="true">↗</span>
            </a>
          </article>
          <article id="servico-trafego-pago" className="service-card service-card--ads reveal">
            <span className="service-number">05 //</span>
            <h3>{t('Tráfego pago')}</h3>
            <p>
              {t(
                'Quem precisa da sua solução precisa encontrar você. Direcione anúncios a potenciais clientes e acompanhe os contatos gerados.',
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
            <span className="service-caption">{t('Sua oferta para quem importa')}</span>
            <a
              className="service-demo-link"
              href="/demonstracoes/trafego-pago"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Explorar campanha de exemplo (abre em nova aba)')}
            >
              {t('Explorar campanha de exemplo')} <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
        <article id="captacao" className="capture-card reveal" aria-labelledby="capture-heading">
          <div className="capture-copy">
            <span className="service-number">06 //</span>
            <span className="capture-label">{t('Para ampliar sua divulgação')}</span>
            <h3 id="capture-heading">{t('Da divulgação à negociação.')}</h3>
            <p className="capture-description">
              {t(
                'Anúncios, landing page e CRM conectados ajudam a acompanhar o caminho entre divulgação, contato e negociação. Sua equipe recebe o histórico para dar continuidade a cada oportunidade.',
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
              {t('Quero captar oportunidades ')}
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
            <li>{t('Landing page focada na sua oferta.')}</li>
            <li>{t('Anúncios para atrair potenciais clientes.')}</li>
            <li>{t('Contatos, vendas e métricas acompanhados no CRM.')}</li>
          </ul>
        </article>
      </section>
    </>
  );
}
