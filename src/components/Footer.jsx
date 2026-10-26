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
              width="2167"
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
              <span className="footer-social-copy">
                <b>{t('WhatsApp')}</b>
              </span>
            </a>
            <a
              className="footer-social-link footer-social-instagram"
              href="https://www.instagram.com/amplium.pro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('Instagram da Amplium')}
            >
              <span className="footer-social-copy">
                <b>{t('Instagram')}</b>
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
