import { t, useLanguage } from '../i18n.js';
export default function Services() {
  useLanguage();
  return (
    <>
      <section
        className="section wrap services-section"
        id="servicos"
        aria-labelledby="services-heading"
      >
        <span id="solucoes" className="service-anchor" aria-hidden="true" />
        <div className="section-head">
          <div>
            <div className="eyebrow">{t('01 / Soluções')}</div>
            <h2 id="services-heading">{t('Soluções para seu negócio avançar.')}</h2>
          </div>
        </div>
        <div className="services-grid">
          <article id="servico-sites" className="service-card service-card--sites reveal">
            <span id="servico-landing-pages" className="service-anchor" aria-hidden="true" />
            <span className="service-number">01 //</span>
            <h3>{t('Sites e landing pages')}</h3>
            <p>
              {t(
                'Sites e landing pages sob medida para apresentar sua empresa e transformar visitas em contatos.',
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
            <a className="service-portfolio-link" href="#portfolio">
              {t('Conhecer portfólio')} <span aria-hidden="true">↓</span>
            </a>
          </article>
          <article id="servico-trafego-pago" className="service-card service-card--ads reveal">
            <span className="service-number">02 //</span>
            <h3>{t('Tráfego pago')}</h3>
            <p>
              {t(
                'Campanhas alinhadas ao seu público para atrair potenciais clientes e orientar os próximos ajustes.',
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
          </article>
          <article
            id="servico-automacoes-ia"
            className="service-card service-card--automation reveal"
          >
            <span className="service-number">03 //</span>
            <h3>{t('Agentes de IA')}</h3>
            <p>
              {t('Agentes de IA configurados para suas demandas e para a rotina da sua equipe.')}
            </p>
            <div className="service-visual automation-preview" aria-hidden="true">
              <span>{t('Entrada')}</span>
              <i></i>
              <span>{t('Automação')}</span>
              <i></i>
              <span>{t('Ação')}</span>
            </div>
          </article>
          <article id="servico-aplicacoes-crm" className="service-card service-card--crm reveal">
            <span className="service-number">04 //</span>
            <h3>{t('Aplicações e CRM')}</h3>
            <p>
              {t(
                'Aplicações sob medida e CRM ajustado à sua operação para organizar contatos, negociações e processos.',
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
          </article>
        </div>
        <p className="services-summary">
          {t('Também conectamos anúncios, landing page e CRM para acompanhar suas oportunidades.')}
        </p>
      </section>
    </>
  );
}
