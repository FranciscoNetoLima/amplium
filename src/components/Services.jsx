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
            <h2 id="services-heading">{t('Soluções para seu negócio avançar.')}</h2>
          </div>
          <p>
            {t('Da primeira visita à venda, conectamos tecnologia aos resultados que você busca.')}
          </p>
        </div>
        <div className="services-grid">
          <article className="service-card service-card--sites reveal">
            <span className="service-number">01 //</span>
            <h3>{t('Sites')}</h3>
            <p>
              {t(
                'Mostre o valor da sua empresa e facilite o contato de quem já procura pelo que você oferece.',
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
            <span className="service-caption">{t('Presença digital com identidade')}</span>
          </article>
          <article className="service-card service-card--landing reveal">
            <span className="service-number">02 //</span>
            <h3>{t('Landing pages')}</h3>
            <p>
              {t('Dê à sua oferta uma página clara, feita para transformar interesse em contatos.')}
            </p>
            <div className="service-visual landing-preview" aria-hidden="true">
              <div className="landing-line"></div>
              <div className="landing-line"></div>
              <div className="landing-cta">{t('Vamos conversar ↗')}</div>
              <div className="landing-orbit"></div>
            </div>
            <span className="service-caption">{t('Da oferta ao próximo passo')}</span>
          </article>
          <article className="service-card service-card--commerce reveal">
            <span className="service-number">03 //</span>
            <h3>{t('E-commerce')}</h3>
            <p>
              {t('Deixe seus produtos fáceis de encontrar e a compra mais simples de concluir.')}
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
            <span className="service-caption">{t('Sua loja, online')}</span>
          </article>
          <article className="service-card service-card--crm reveal">
            <span className="service-number">04 //</span>
            <h3>{t('Sistemas & CRM')}</h3>
            <p>
              {t('Organize contatos e negociações para sua equipe saber qual é o próximo passo.')}
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
            <span className="service-caption">{t('Uma operação mais organizada')}</span>
          </article>
          <article className="service-card service-card--automation reveal">
            <span className="service-number">05 //</span>
            <h3>{t('Automações & IA')}</h3>
            <p>
              {t('Reduza tarefas repetitivas e libere tempo para atender melhor seus clientes.')}
            </p>
            <div className="service-visual automation-preview" aria-hidden="true">
              <span>{t('Entrada')}</span>
              <i></i>
              <span>{t('Automação')}</span>
              <i></i>
              <span>{t('Ação')}</span>
            </div>
            <span className="service-caption">{t('Ferramentas que trabalham juntas')}</span>
          </article>
          <article className="service-card service-card--ads reveal">
            <span className="service-number">06 //</span>
            <h3>{t('Tráfego pago')}</h3>
            <p>
              {t('Apresente sua oferta ao público certo e acompanhe as oportunidades geradas.')}
            </p>
            <div className="service-visual ads-preview" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="service-caption">{t('Sua oferta encontra seu público')}</span>
          </article>
        </div>
        <article id="captacao" className="capture-card reveal" aria-labelledby="capture-heading">
          <div className="capture-copy">
            <span className="service-number">07 //</span>
            <span className="capture-label">{t('Para ampliar sua divulgação')}</span>
            <h3 id="capture-heading">{t('Da divulgação à negociação.')}</h3>
            <p className="capture-description">
              {t(
                'Unimos anúncios, landing page e CRM para você atrair interessados e acompanhar cada oportunidade até a conversa com sua equipe.',
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
