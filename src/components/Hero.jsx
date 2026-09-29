import { t, useLanguage } from '../i18n.js';
import HeroBackdrop from './HeroBackdrop.jsx';
export default function Hero() {
  useLanguage();
  return (
    <>
      <section className="hero" id="inicio">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>
              {t('Tecnologia')}
              <br />
              {t(' que ')}
              <em>{t('amplia')}</em>
              <br /> <span className="hero-condensed">{t('o seu negócio.')}</span>
            </h1>
            <p>
              {t(
                'Transformamos sua presença digital em oportunidades de negócio. Criamos sites, campanhas e automações que ajudam você a atrair os clientes certos, vender mais e simplificar a gestão da sua empresa.',
              )}
            </p>
            <div className="hero-action">
              <a className="primary" href="#contato">
                {t('Vamos conversar ↗')}
              </a>
              <a className="plain-link" href="#solucoes">
                {t('Conheça as soluções ↓')}
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <HeroBackdrop />
            <div className="hero-symbol-motion">
              <img
                className="hero-symbol"
                src="assets/symbol-1.png"
                srcSet="assets/symbol-1-400.webp 400w, assets/symbol-1-640.webp 640w"
                sizes="(max-width: 980px) 270px, min(37vw, 470px)"
                alt={t('')}
                width="1254"
                height="1254"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="band" tabIndex="0" aria-label={t('Serviços da Amplium')}>
        <div className="marquee">
          <span className="marquee-item">
            {t('SITES ')}
            <b aria-hidden="true">✦</b>
          </span>
          <span className="marquee-item">
            {t('LANDING PAGES ')}
            <b aria-hidden="true">✦</b>
          </span>
          <span className="marquee-item">
            {t('SISTEMAS & CRM ')}
            <b aria-hidden="true">✦</b>
          </span>
          <span className="marquee-item">
            {t('AUTOMAÇÕES & IA ')}
            <b aria-hidden="true">✦</b>
          </span>
          <span className="marquee-item">
            {t('TRÁFEGO PAGO ')}
            <b aria-hidden="true">✦</b>
          </span>
          <span className="marquee-item">
            {t('E-COMMERCE ')}
            <b aria-hidden="true">✦</b>
          </span>
        </div>
      </div>
    </>
  );
}
