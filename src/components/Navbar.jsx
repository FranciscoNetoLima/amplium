import { useEffect, useRef, useState } from 'react';
import { t, useLanguage, localizedWhatsApp } from '../i18n.js';
import LanguageSwitch from './LanguageSwitch.jsx';

const services = [
  ['servico-sites', 'Sites', 'Apresente melhor sua empresa.'],
  ['servico-landing-pages', 'Landing pages', 'Transforme interesse em contatos.'],
  ['servico-e-commerce', 'E-commerce', 'Facilite suas vendas online.'],
  ['servico-aplicacoes-crm', 'Aplicações e CRM', 'Organize a operação e as vendas.'],
  ['servico-automacoes-ia', 'Automações e IA', 'Agilize tarefas e atendimento.'],
  ['servico-trafego-pago', 'Tráfego pago', 'Alcance potenciais clientes.'],
];

function ServiceIcon({ index }) {
  return (
    <span className="nav-service-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {index === 0 && (
          <>
            <circle cx="12" cy="12" r="8" />
            <path d="M4 12h16M12 4c-2 2-3 5-3 8s1 6 3 8M12 4c2 2 3 5 3 8s-1 6-3 8" />
          </>
        )}
        {index === 1 && (
          <>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M4 9h16" />
          </>
        )}
        {index === 2 && (
          <>
            <path d="M5 9h14l-1 11H6L5 9Z" />
            <path d="M9 9V7a3 3 0 0 1 6 0v2" />
          </>
        )}
        {index === 3 && (
          <>
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
          </>
        )}
        {index === 4 && (
          <>
            <rect x="3" y="4" width="7" height="7" rx="2" />
            <rect x="14" y="13" width="7" height="7" rx="2" />
            <path d="M7 11v4a3 3 0 0 0 3 3h4" />
          </>
        )}
        {index === 5 && (
          <>
            <path d="M4 20V5M4 20h16M8 17v-5M12 17V8M16 17v-8M20 17v-4" />
          </>
        )}
      </svg>
    </span>
  );
}

export default function Navbar() {
  useLanguage();
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    const close = () => setSolutionsOpen(false);
    window.addEventListener('navmenuclose', close);
    return () => window.removeEventListener('navmenuclose', close);
  }, []);
  useEffect(() => {
    if (!solutionsOpen) return;
    const closeOutside = (event) => {
      if (!solutionsRef.current.contains(event.target)) setSolutionsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSolutionsOpen(false);
        if (triggerRef.current.getClientRects().length) triggerRef.current.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [solutionsOpen]);
  const handleSolutionsKeys = (event) => {
    if (event.key === 'Escape' && solutionsOpen) {
      event.preventDefault();
      event.stopPropagation();
      setSolutionsOpen(false);
      triggerRef.current.focus();
    }
  };
  return (
    <>
      <header className="topbar">
        <nav className="nav wrap" aria-label={t('Navegação principal')}>
          <a className="brand" href="#inicio" aria-label={t('Amplium — início')}>
            <img
              className="brand-logo"
              src="assets/amplium-logo.png"
              srcSet="assets/amplium-logo-360.webp 360w, assets/amplium-logo-720.webp 720w"
              sizes="210px"
              alt={t('Amplium — Technology, Amplified.')}
              width="2170"
              height="725"
            />
          </a>
          <div className="links" id="nav-links">
            <div className="nav-solutions" ref={solutionsRef} onKeyDown={handleSolutionsKeys}>
              <button
                type="button"
                className="nav-solutions-trigger"
                data-nav-section="servicos"
                ref={triggerRef}
                aria-expanded={solutionsOpen}
                aria-controls="nav-solutions-panel"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
              >
                {t('Soluções')}
                <span className="nav-chevron" aria-hidden="true" />
              </button>
              <div className="nav-solutions-panel" id="nav-solutions-panel" hidden={!solutionsOpen}>
                <ul>
                  {services.map(([id, name, benefit], index) => (
                    <li key={id}>
                      <a href={'#' + id} onClick={() => setSolutionsOpen(false)}>
                        <ServiceIcon index={index} />
                        <span className="nav-service-copy">
                          <strong>{t(name)}</strong>
                          <span>{t(benefit)}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  className="nav-objectives-link"
                  href="#solucoes"
                  onClick={() => setSolutionsOpen(false)}
                >
                  {t('Escolha a solução pelo seu objetivo')}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <a href="#metodo" data-nav-section="metodo">
              {t('Como trabalhamos')}
            </a>
            <a href="#faq" data-nav-section="faq">
              {t('Dúvidas')}
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
            <LanguageSwitch />
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
