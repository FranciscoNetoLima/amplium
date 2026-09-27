import { t, useLanguage, localizedWhatsApp } from '../i18n.js';
import LanguageSwitch from './LanguageSwitch.jsx';
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
              alt={t('Amplium — Technology, Amplified.')}
              width="2170"
              height="725"
            />
          </a>
          <div className="links" id="nav-links">
            <a href="#inicio" aria-current="page">
              {t('Início')}
            </a>
            <a href="#servicos">{t('Serviços')}</a>
            <a href="#solucoes">{t('Soluções')}</a>
            <a href="#metodo">{t('Como trabalhamos')}</a>
            <a href="#faq">{t('FAQ')}</a>
          </div>
          <div className="nav-actions">
            <LanguageSwitch />
            <a
              className="nav-cta"
              href={localizedWhatsApp(
                'https://wa.me/5588992431477?text=Ol%C3%A1%21%20Quero%20conversar%20sobre%20um%20projeto%20para%20minha%20empresa.',
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Fale com a Amplium ↗')}
            </a>
            <button
              className="menu"
              aria-controls="nav-links"
              aria-expanded="false"
              aria-label={t('Abrir menu')}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
