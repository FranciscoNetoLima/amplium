import { t, useLanguage, localizedWhatsApp } from '../i18n.js';

export default function Footer() {
  useLanguage();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src="assets/amplium-logo.png"
              srcSet="assets/amplium-logo-360.webp 360w, assets/amplium-logo-720.webp 720w"
              sizes="210px"
              alt={t('Amplium — Technology, Amplified.')}
              width="2170"
              height="725"
              loading="lazy"
            />
          </div>
          <div className="footer-socials" aria-label={t('Canais de contato')}>
            <a
              className="footer-social-link footer-social-whatsapp"
              href={localizedWhatsApp('https://wa.me/5588992431477')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('WhatsApp da Amplium')}
            >
              <span className="footer-social-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
                </svg>
              </span>
              <span className="footer-social-copy">
                <b>{t('Whatsapp')}</b>
                <small>{t('Conversar agora')}</small>
              </span>
            </a>
            <a
              className="footer-social-link footer-social-instagram"
              href="https://www.instagram.com/amplium.pro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Instagram da Amplium')}
            >
              <span className="footer-social-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </span>
              <span className="footer-social-copy">
                <b>{t('Instagram')}</b>
                <small>@amplium.pro</small>
              </span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t('© 2026 Amplium. Todos os direitos reservados. Technology, Amplified.')}</span>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        <img src="assets/amplium-wordmark.webp" width="1260" height="205" alt="" loading="lazy" />
      </div>
    </footer>
  );
}
