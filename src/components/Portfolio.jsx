import { useState } from 'react';
import { t, useLanguage } from '../i18n.js';
import './portfolio.css';

const projects = [
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
];

export default function Portfolio() {
  useLanguage();
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find((project) => project.id === activeId) ?? projects[0];
  return (
    <section
      className="section wrap portfolio-section"
      id="portfolio"
      aria-labelledby="portfolio-heading"
    >
      <div className="section-head portfolio-heading">
        <div>
          <div className="eyebrow">{t('PORTFÓLIO')}</div>
          <h2 id="portfolio-heading">{t('Projetos para explorar.')}</h2>
        </div>
        <p>{t('02 projetos')}</p>
      </div>
      <div className="portfolio-showcase">
        <div className="portfolio-list" aria-label={t('Projetos do portfólio')}>
          {projects.map((project, index) => {
            const selected = project.id === activeId;
            return (
              <article className={`portfolio-item${selected ? ' is-active' : ''}`} key={project.id}>
                <button
                  type="button"
                  className="portfolio-select"
                  aria-pressed={selected}
                  aria-controls="portfolio-preview-panel"
                  onClick={() => setActiveId(project.id)}
                >
                  <span className="portfolio-index">0{index + 1}</span>
                  <span className="portfolio-item-title">{project.name}</span>
                  <span className="portfolio-item-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="portfolio-item-label">{t(project.label)}</span>
                </button>
                {selected && (
                  <div className="portfolio-details">
                    <p>{t(project.description)}</p>
                    <ul className="portfolio-features" aria-label={t('Recursos do projeto')}>
                      {project.features.map((feature) => (
                        <li key={feature}>{t(feature)}</li>
                      ))}
                    </ul>
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
                )}
              </article>
            );
          })}
        </div>
        <div
          className="portfolio-stage"
          id="portfolio-preview-panel"
          aria-label={`${t('Prévia do projeto')} ${activeProject.name}`}
        >
          <div className="portfolio-stage-topline">
            <span>{t('PRÉVIA DO PROJETO')}</span>
            <span>{activeProject.name}</span>
          </div>
          <div className="portfolio-preview" key={activeProject.id}>
            <div className="portfolio-desktop">
              <div className="portfolio-browser-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{activeProject.name}</span>
              </div>
              <img
                src={`assets/portfolio/${activeProject.id}-desktop-1200.webp`}
                srcSet={`assets/portfolio/${activeProject.id}-desktop-720.webp 720w, assets/portfolio/${activeProject.id}-desktop-1200.webp 1200w`}
                sizes="(max-width: 760px) 80vw, (max-width: 1100px) 55vw, 760px"
                width="1200"
                height="683"
                loading="lazy"
                decoding="async"
                alt={t(activeProject.desktopAlt)}
              />
            </div>
            <div className="portfolio-phone">
              <span className="portfolio-phone-camera" aria-hidden="true" />
              <img
                src={`assets/portfolio/${activeProject.id}-mobile.webp`}
                width="390"
                height="844"
                loading="lazy"
                decoding="async"
                alt={t(activeProject.mobileAlt)}
              />
            </div>
          </div>
          <div className="portfolio-stage-caption">
            <span>{t('VISUALIZAÇÃO DESKTOP + MOBILE')}</span>
            <span>
              0{projects.findIndex((project) => project.id === activeProject.id) + 1} / 0
              {projects.length}
            </span>
          </div>
        </div>
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
