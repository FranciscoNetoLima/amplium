import { t, useLanguage } from '../i18n.js';
import './portfolio.css';

export default function Portfolio() {
  useLanguage();
  return (
    <section
      className="section wrap portfolio-section"
      id="portfolio"
      aria-labelledby="portfolio-heading"
    >
      <div className="section-head">
        <div>
          <div className="eyebrow">{t('PORTFÓLIO / PROJETO INDEPENDENTE')}</div>
          <h2 id="portfolio-heading">{t('Uma ideia colocada em prática.')}</h2>
        </div>
        <p>{t('Explore um projeto desenvolvido pela Amplium.')}</p>
      </div>
      <article className="portfolio-project" aria-labelledby="portfolio-project-title">
        <div className="portfolio-preview">
          <div className="portfolio-desktop">
            <div className="portfolio-browser-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>Pet Show Cariri</span>
            </div>
            <img
              src="assets/portfolio/petshow-desktop-1200.webp"
              srcSet="assets/portfolio/petshow-desktop-720.webp 720w, assets/portfolio/petshow-desktop-1200.webp 1200w"
              sizes="(max-width: 760px) 80vw, (max-width: 1100px) 48vw, 650px"
              width="1200"
              height="683"
              loading="lazy"
              decoding="async"
              alt={t('Página inicial do projeto Pet Show Cariri em uma tela de computador.')}
            />
          </div>
          <div className="portfolio-phone">
            <span className="portfolio-phone-camera" aria-hidden="true" />
            <img
              src="assets/portfolio/petshow-mobile.webp"
              width="390"
              height="844"
              loading="lazy"
              decoding="async"
              alt={t('Versão mobile do projeto Pet Show Cariri.')}
            />
          </div>
        </div>
        <div className="portfolio-copy">
          <span className="portfolio-label">{t('Projeto independente')}</span>
          <h3 id="portfolio-project-title">Pet Show Cariri</h3>
          <p>
            {t(
              'Proposta de site institucional para apresentar os serviços de clínica veterinária, banho e tosa e pet shop, com navegação clara e acesso direto ao contato.',
            )}
          </p>
          <ul className="portfolio-features" aria-label={t('Recursos do projeto')}>
            <li>{t('Design responsivo')}</li>
            <li>{t('Navegação completa')}</li>
            <li>{t('Contato facilitado')}</li>
          </ul>
          <div className="portfolio-actions">
            <a
              className="primary portfolio-open"
              href="https://petshowcariri.vercel.app/#inicio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Explorar o site Pet Show Cariri (abre em nova aba)')}
            >
              {t('Explorar o site')} <span aria-hidden="true">↗</span>
            </a>
            <a className="portfolio-contact" href="#contato">
              {t('Quero um projeto assim')} <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="portfolio-disclaimer">
            {t('Projeto de portfólio — proposta independente, não contratada pela empresa.')}
          </p>
        </div>
      </article>
    </section>
  );
}
