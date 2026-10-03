import { t, useLanguage, localizedWhatsApp } from '../i18n.js';
export default function Footer() {
  useLanguage();
  return (
    <>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-intro reveal">
              <a className="footer-brand" href="#inicio" aria-label={t('Amplium — início')}>
                <img
                  src="assets/amplium-logo.png"
                  srcSet="assets/amplium-logo-360.webp 360w, assets/amplium-logo-720.webp 720w"
                  sizes="210px"
                  alt={t('Amplium — Technology, Amplified.')}
                  width="2170"
                  height="725"
                  loading="lazy"
                />
              </a>
              <p>
                {t(
                  'Desenvolvemos sites, landing pages, lojas virtuais e sistemas, com soluções de automação, inteligência artificial e tráfego pago para apoiar sua presença digital, suas vendas e sua operação.',
                )}
              </p>
              <div className="footer-socials">
                <a
                  href="https://instagram.com/amplium.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('Instagram da Amplium')}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M17.5 6.5h.01" />
                  </svg>
                </a>
                <a
                  href={localizedWhatsApp('https://wa.me/5588992431477')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('WhatsApp da Amplium')}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
                  </svg>
                </a>
              </div>
            </div>
            <nav className="footer-column reveal" aria-label={t('Navegação no rodapé')}>
              <h4>{t('Navegação')}</h4>
              <ul>
                <li>
                  <a href="#inicio">{t('Início')}</a>
                </li>
                <li>
                  <a href="#servicos">{t('Soluções')}</a>
                </li>
                <li>
                  <a href="#solucoes">{t('Escolha a solução pelo seu objetivo')}</a>
                </li>
                <li>
                  <a href="#metodo">{t('Como trabalhamos')}</a>
                </li>
                <li>
                  <a href="#faq">{t('Dúvidas')}</a>
                </li>
              </ul>
            </nav>
            <nav className="footer-column reveal" aria-label={t('Soluções da Amplium')}>
              <h4>{t('Soluções')}</h4>
              <ul>
                <li>
                  <a href="#servico-sites">{t('Sites')}</a>
                </li>
                <li>
                  <a href="#servico-landing-pages">{t('Landing pages')}</a>
                </li>
                <li>
                  <a href="#servico-e-commerce">{t('E-commerce')}</a>
                </li>
                <li>
                  <a href="#servico-aplicacoes-crm">{t('Aplicações e CRM')}</a>
                </li>
                <li>
                  <a href="#servico-automacoes-ia">{t('Automações e IA')}</a>
                </li>
                <li>
                  <a href="#servico-trafego-pago">{t('Tráfego pago')}</a>
                </li>
              </ul>
            </nav>
            <div className="footer-column reveal">
              <h4>{t('Contato')}</h4>
              <ul>
                <li>
                  <a
                    href={localizedWhatsApp(
                      'https://wa.me/5588992431477?text=Ol%C3%A1%21%20Quero%20conversar%20sobre%20um%20projeto%20para%20minha%20empresa.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Whatsapp')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/amplium.co"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('Instagram')}
                  </a>
                </li>
                <li>{t('Atendimento nacional e internacional')}</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t('© 2026 Amplium. Todos os direitos reservados. Technology, Amplified.')}</span>
            <a href="#inicio">
              {t('Voltar ao topo ')}
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          <img src="assets/amplium-wordmark.webp" width="1260" height="205" alt="" loading="lazy" />
        </div>
      </footer>
    </>
  );
}
