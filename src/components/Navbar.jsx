import { t, useLanguage, localizedWhatsApp } from '../i18n.js';

export default function Navbar() {
  useLanguage();
  return (
    <>
      <header className="topbar">
        <nav className="nav wrap" aria-label={t('Navegação principal')}>
          <a className="brand" href="#inicio" aria-label={t('Amplium — início')}>
            <img
              className="brand-logo"
              src="assets/amplium-logo.png"
              srcSet="assets/amplium-logo-360.webp 360w, assets/amplium-logo-720.webp 720w"
              sizes="(max-width: 639px) 175px, 210px"
              alt={t('Amplium — Technology, Amplified.')}
              width="2167"
              height="725"
              fetchPriority="high"
              decoding="async"
            />
          </a>
          <div className="links" id="nav-links">
            <a href="#servicos" data-nav-section="servicos">
              {t('Soluções')}
            </a>
            <a href="#portfolio" data-nav-section="portfolio">
              {t('Portfólio')}
            </a>
            <a
              className="nav-mobile-contact"
              href={localizedWhatsApp(
                'https://wa.me/5588992431477?text=Ol%C3%A1%21%20Quero%20conversar%20sobre%20um%20projeto%20para%20minha%20empresa.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Conversar no WhatsApp')}
            </a>
          </div>
          <div className="nav-actions">
            <a
              className="nav-cta"
              href={localizedWhatsApp(
                'https://wa.me/5588992431477?text=Ol%C3%A1%21%20Quero%20conversar%20sobre%20um%20projeto%20para%20minha%20empresa.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Conversar no WhatsApp')}
            </a>
            <button
              className="menu"
              aria-controls="nav-links"
              aria-expanded="false"
              aria-label={t('Abrir menu')}
            >
              <span className="menu-icon menu-icon-open" aria-hidden="true">
                ☰
              </span>
              <span className="menu-icon menu-icon-close" aria-hidden="true">
                ×
              </span>
            </button>
          </div>
        </nav>
      </header>
      <div className="nav-scrim" aria-hidden="true" />
    </>
  );
}
