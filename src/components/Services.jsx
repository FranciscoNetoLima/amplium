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
                'Um site para apresentar sua empresa, valorizar sua marca e facilitar o contato com quem procura seus serviços.',
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
              {t(
                'Uma página focada na sua oferta, com uma mensagem clara e um caminho direto para o visitante entrar em contato.',
              )}
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
              {t('Produtos organizados e uma experiência de compra simples, da vitrine ao pedido.')}
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
              {t(
                'Informações, contatos e processos em um só lugar para dar mais clareza à rotina da equipe.',
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
            <span className="service-caption">{t('Uma operação mais organizada')}</span>
          </article>
          <article className="service-card service-card--automation reveal">
            <span className="service-number">05 //</span>
            <h3>{t('Automações & IA')}</h3>
            <p>
              {t(
                'Conecte suas ferramentas e automatize tarefas repetitivas para a equipe se concentrar no que precisa de atenção.',
              )}
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
              {t(
                'Anúncios para apresentar sua oferta ao público certo e acompanhar as oportunidades geradas pelas campanhas.',
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
            <span className="service-caption">{t('Sua oferta encontra seu público')}</span>
          </article>
        </div>
        <article id="captacao" className="capture-card reveal" aria-labelledby="capture-heading">
          <div className="capture-copy">
            <span className="service-number">07 //</span>
            <span className="capture-label">{t('Para ampliar sua divulgação')}</span>
            <h3 id="capture-heading">{t('Captação de oportunidades')}</h3>
            <p className="capture-description">
              {t(
                'Um fluxo integrado que une anúncios, landing page e contato com o cliente. As oportunidades seguem para o CRM, onde sua equipe acompanha as vendas e as métricas das campanhas.',
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
            <li>{t('Landing page focada na sua oferta.')}</li>
            <li>{t('Anúncios para atrair potenciais clientes.')}</li>
            <li>{t('Contatos, vendas e métricas acompanhados no CRM.')}</li>
          </ul>
        </article>
      </section>
    </>
  );
}
