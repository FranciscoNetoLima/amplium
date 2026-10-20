import { t, useLanguage } from '../i18n.js';
import './portfolio.css';

const projects = [
  {
    id: 'petshow',
    name: 'Pet Show Cariri',
    label: 'Projeto independente',
    description: 'Site institucional para apresentar serviços e facilitar o contato.',
    features: ['Design responsivo', 'Navegação clara', 'Contato facilitado'],
    url: 'https://petshowcariri.vercel.app/#inicio',
    desktopAlt: 'Página inicial do projeto Pet Show Cariri em uma tela de computador.',
    mobileAlt: 'Versão mobile do projeto Pet Show Cariri.',
    linkLabel: 'Explorar o site Pet Show Cariri (abre em nova aba)',
    disclaimer: 'Projeto de portfólio — proposta independente, não contratada pela empresa.',
  },
  {
    id: 'ana-victoria',
    name: 'Dra. Ana Victória Lima',
    label: 'Site institucional',
    description: 'Presença digital para apresentar a atuação e orientar o próximo contato.',
    features: ['Design responsivo', 'Conteúdo organizado', 'Contato facilitado'],
    url: 'https://advanavictoria.vercel.app/#inicio',
    desktopAlt: 'Página inicial do projeto Dra. Ana Victória Lima em uma tela de computador.',
    mobileAlt: 'Versão mobile do projeto Dra. Ana Victória Lima.',
    linkLabel: 'Explorar o site Dra. Ana Victória Lima (abre em nova aba)',
  },
];

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
          <div className="eyebrow">{t('PORTFÓLIO')}</div>
          <h2 id="portfolio-heading">{t('Ideias colocadas em prática.')}</h2>
        </div>
        <p>{t('Conheça alguns projetos desenvolvidos pela Amplium.')}</p>
      </div>
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="portfolio-project"
            aria-labelledby={`portfolio-${project.id}-title`}
          >
            <div className="portfolio-project-meta" aria-hidden="true">
              <span>
                {t('PORTFÓLIO')} / 0{index + 1}
              </span>
              <span className="portfolio-meta-mark">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="portfolio-preview">
              <div className="portfolio-desktop">
                <div className="portfolio-browser-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{project.name}</span>
                </div>
                <img
                  src={`assets/portfolio/${project.id}-desktop-1200.webp`}
                  srcSet={`assets/portfolio/${project.id}-desktop-720.webp 720w, assets/portfolio/${project.id}-desktop-1200.webp 1200w`}
                  sizes="(max-width: 760px) 80vw, (max-width: 1100px) 40vw, 510px"
                  width="1200"
                  height="683"
                  loading="lazy"
                  decoding="async"
                  alt={t(project.desktopAlt)}
                />
              </div>
              <div className="portfolio-phone">
                <span className="portfolio-phone-camera" aria-hidden="true" />
                <img
                  src={`assets/portfolio/${project.id}-mobile.webp`}
                  width="390"
                  height="844"
                  loading="lazy"
                  decoding="async"
                  alt={t(project.mobileAlt)}
                />
              </div>
            </div>
            <div className="portfolio-copy">
              <span className="portfolio-label">{t(project.label)}</span>
              <h3 id={`portfolio-${project.id}-title`}>{project.name}</h3>
              <p>{t(project.description)}</p>
              <ul className="portfolio-features" aria-label={t('Recursos do projeto')}>
                {project.features.map((feature) => (
                  <li key={feature}>{t(feature)}</li>
                ))}
              </ul>
              <div className="portfolio-actions">
                <a
                  className="primary portfolio-open"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(project.linkLabel)}
                >
                  {t('Explorar o site')} <span aria-hidden="true">↗</span>
                </a>
                {project.disclaimer && (
                  <p className="portfolio-disclaimer">{t(project.disclaimer)}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="portfolio-invitation">
        <p>{t('Seu negócio também pode ter um site assim.')}</p>
        <a className="portfolio-contact" href="#contato">
          {t('Conte seu projeto')} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
