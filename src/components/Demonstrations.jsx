import { t, useLanguage } from '../i18n.js';

export default function Demonstrations() {
  useLanguage();
  return (
    <section
      className="section wrap demonstrations-section"
      aria-labelledby="demonstrations-heading"
    >
      <div className="section-head reveal">
        <div>
          <div className="eyebrow">{t('Na prática / Demonstrações')}</div>
          <h2 id="demonstrations-heading">{t('Veja como as soluções se conectam.')}</h2>
        </div>
        <p>{t('Exemplos ilustrativos de uso. São demonstrações, não projetos de clientes.')}</p>
      </div>
      <div className="demonstrations-grid">
        <article className="demonstration-card">
          <span className="demonstration-label">{t('Demonstração')}</span>
          <div className="demonstration-visual" aria-hidden="true">
            <div className="service-visual website-preview">
              <div className="preview-topbar">
                <span></span>
                <span></span>
                <span></span>
                <i>{t('Sua empresa')}</i>
              </div>
              <div className="preview-page">
                <div className="preview-nav">
                  <b></b>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-headline">{t('Serviços e diferenciais')}</div>
                <div className="preview-copy"></div>
                <div className="preview-copy short"></div>
                <div className="preview-button"></div>
              </div>
            </div>
          </div>
          <h3>{t('Site institucional')}</h3>
          <p>
            {t(
              'Informações dispersas dificultam a avaliação da empresa. Um site reúne serviços e diferenciais e oferece um caminho claro para o contato.',
            )}
          </p>
        </article>
        <article className="demonstration-card">
          <span className="demonstration-label">{t('Demonstração')}</span>
          <div className="demonstration-visual" aria-hidden="true">
            <div className="demonstration-flow">
              <div>
                <span>{t('Anúncio')}</span>
                <div className="flow-illustration flow-ad">
                  <b></b>
                  <span></span>
                </div>
              </div>
              <i>→</i>
              <div>
                <span>{t('Landing page')}</span>
                <div className="flow-illustration flow-page">
                  <b></b>
                  <span></span>
                  <span></span>
                  <i></i>
                </div>
              </div>
              <i>→</i>
              <div>
                <span>{t('CRM')}</span>
                <div className="flow-illustration flow-crm">
                  <span>
                    <i></i>
                    <b></b>
                    <b></b>
                  </span>
                  <span>
                    <i></i>
                    <b></b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h3>{t('Captação integrada')}</h3>
          <p>
            {t(
              'O interesse precisa de acompanhamento. Anúncios, landing page e CRM conectados ajudam a seguir o caminho da divulgação ao contato e à negociação.',
            )}
          </p>
        </article>
        <article className="demonstration-card">
          <span className="demonstration-label">{t('Demonstração')}</span>
          <div className="demonstration-visual" aria-hidden="true">
            <div className="service-visual crm-preview">
              <div>
                <i></i>
                <small>{t('Contatos')}</small>
                <span></span>
                <span></span>
              </div>
              <div>
                <i></i>
                <small>{t('Negociações')}</small>
                <span></span>
              </div>
              <div>
                <i></i>
                <small>{t('Próximas ações')}</small>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <h3>{t('Aplicações e CRM')}</h3>
          <p>
            {t(
              'Contatos e próximos passos espalhados dificultam a rotina comercial. Uma aplicação reúne histórico, negociações e próximas ações para organizar o trabalho da equipe.',
            )}
          </p>
        </article>
      </div>
    </section>
  );
}
