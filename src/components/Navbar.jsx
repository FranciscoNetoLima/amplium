import { useEffect, useRef, useState } from 'react';
import { t, useLanguage, localizedWhatsApp } from '../i18n.js';
import LanguageSwitch from './LanguageSwitch.jsx';

const services = [
  ['servico-sites', 'Sites', 'Apresente seus diferenciais e facilite o contato.'],
  ['servico-landing-pages', 'Landing pages', 'Dê à sua oferta um caminho até o orçamento.'],
  ['servico-e-commerce', 'E-commerce', 'Facilite a escolha, o pagamento e o pedido.'],
  ['servico-aplicacoes-crm', 'Aplicações e CRM', 'Organize contatos, negociações e rotinas.'],
  ['servico-automacoes-ia', 'Automações e IA', 'Libere a equipe das tarefas repetitivas.'],
  ['servico-trafego-pago', 'Tráfego pago', 'Divulgue sua oferta e acompanhe os contatos.'],
];

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
                <span className="nav-chevron" aria-hidden="true">
                  ⌄
                </span>
              </button>
              <div className="nav-solutions-panel" id="nav-solutions-panel" hidden={!solutionsOpen}>
                <ul>
                  {services.map(([id, name, benefit]) => (
                    <li key={id}>
                      <a href={'#' + id} onClick={() => setSolutionsOpen(false)}>
                        <strong>{t(name)}</strong>
                        <span>{t(benefit)}</span>
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
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <a href="#metodo" data-nav-section="metodo">
              {t('Como funciona')}
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
