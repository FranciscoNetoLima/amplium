import { t, useLanguage } from '../i18n.js';
import './portfolio.css';

const projects = [
  {
    id: 'oral-face',
    name: 'Oral Face Odontologia',
    description:
      'Site institucional para apresentar a clínica, os tratamentos e facilitar o agendamento.',
    url: 'https://clinicaoralface.vercel.app/#inicio',
    desktopAlt: 'Página inicial do projeto Oral Face Odontologia em uma tela de computador.',
    mobileAlt: 'Versão mobile do projeto Oral Face Odontologia.',
    linkLabel: 'Explorar o site Oral Face Odontologia (abre em nova aba)',
  },
  {
    id: 'ana-victoria',
    name: 'Dra. Ana Victória Lima',
    description: 'Presença digital para apresentar a atuação e orientar o próximo contato.',
    url: 'https://advanavictoria.vercel.app/#inicio',
    desktopAlt: 'Página inicial do projeto Dra. Ana Victória Lima em uma tela de computador.',
    mobileAlt: 'Versão mobile do projeto Dra. Ana Victória Lima.',
    linkLabel: 'Explorar o site Dra. Ana Victória Lima (abre em nova aba)',
  },
];

const hoverBounds = new WeakMap();
function beginHover(event) {
  if (event.pointerType === 'touch') return;
  event.currentTarget.setAttribute('data-pointer-hover', '');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  hoverBounds.set(event.currentTarget, event.currentTarget.getBoundingClientRect());
}
function moveHover(event) {
  const card = event.currentTarget;
  const bounds = hoverBounds.get(card);
  if (!bounds) return;
  const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
  const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
  card.style.setProperty('--portfolio-x', `${Math.round(x * 12)}px`);
  card.style.setProperty('--portfolio-y', `${Math.round(y * 8)}px`);
}
function endHover(event) {
  hoverBounds.delete(event.currentTarget);
  event.currentTarget.removeAttribute('data-pointer-hover');
  for (const name of ['x', 'y']) {
    event.currentTarget.style.removeProperty(`--portfolio-${name}`);
  }
}

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
          <div className="eyebrow">{t('02 / Portfólio')}</div>
          <h2 id="portfolio-heading">{t('Ideias colocadas em prática.')}</h2>
        </div>
      </div>
      <div className="portfolio-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`portfolio-project portfolio-project--${project.id}`}
            aria-labelledby={`portfolio-${project.id}-title`}
            onPointerEnter={beginHover}
            onPointerMove={moveHover}
            onPointerLeave={endHover}
            onPointerCancel={endHover}
          >
            <div className="portfolio-preview">
              <span className="portfolio-art-orbit" aria-hidden="true" />
              <div className="portfolio-desktop">
                <div className="portfolio-browser-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{project.name}</span>
                </div>
                <img
                  src={`assets/portfolio/${project.id}-desktop-1440.webp`}
                  srcSet={`assets/portfolio/${project.id}-desktop-1440.webp 1440w, assets/portfolio/${project.id}-desktop-2880.webp 2880w`}
                  sizes="(max-width: 760px) 80vw, (max-width: 1100px) 40vw, 510px"
                  width="1440"
                  height="820"
                  loading="lazy"
                  decoding="async"
                  alt={t(project.desktopAlt)}
                />
              </div>
              <div className="portfolio-phone">
                <span className="portfolio-phone-camera" aria-hidden="true" />
                <img
                  src={`assets/portfolio/${project.id}-mobile.webp`}
                  srcSet={`assets/portfolio/${project.id}-mobile.webp 1x, assets/portfolio/${project.id}-mobile-780.webp 2x`}
                  width="390"
                  height="844"
                  loading="lazy"
                  decoding="async"
                  alt={t(project.mobileAlt)}
                />
              </div>
            </div>
            <div className="portfolio-copy">
              <h3 id={`portfolio-${project.id}-title`}>{project.name}</h3>
              <p>{t(project.description)}</p>
              <div className="portfolio-actions">
                <a
                  className="portfolio-open"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(project.linkLabel)}
                >
                  <span className="portfolio-open-text">{t('Explorar o site')}</span>
                  <span className="portfolio-open-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
