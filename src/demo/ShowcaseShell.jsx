import { useEffect } from 'react';
import { useLanguage } from '../i18n.js';
import './showcase.css';

const common = {
  pt: {
    notice: 'Projeto demonstrativo — empresa e dados fictícios.',
    back: 'Voltar à Amplium',
    simulation: 'Experiência interativa / dados de exemplo',
    demoLabel: 'AMPLIUM / DEMONSTRAÇÃO',
    agency: 'Uma possibilidade para o seu negócio',
    agencyText: 'Quer uma solução como esta, criada para a realidade da sua empresa?',
    project: 'Conte seu projeto ↗',
    reset: 'Reiniciar demonstração',
  },
  en: {
    notice: 'Demo project — fictional company and details.',
    back: 'Back to Amplium',
    simulation: 'Interactive experience / example data',
    demoLabel: 'AMPLIUM / DEMO',
    agency: 'A possibility for your business',
    agencyText: 'Want a solution like this, built around your business?',
    project: 'Tell us about your project ↗',
    reset: 'Reset demo',
  },
};

export function useDemoCopy(copy) {
  const language = useLanguage();
  return copy[language] ?? copy.pt;
}

export function ShowcaseShell({ variant, brand, title, lead, cardId, children, onReset }) {
  const language = useLanguage();
  const c = common[language] ?? common.pt;
  useEffect(() => {
    document.title = `${title} — ${brand} | Amplium`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', `${lead} ${c.notice}`);
  }, [brand, title, lead, c.notice]);
  return (
    <div className={`showcase showcase--${variant}`}>
      <div className="showcase-banner">
        <div className="showcase-wrap">
          <span>{c.notice}</span>
          <a href={`/#${cardId}`}>{c.back} ↗</a>
        </div>
      </div>
      <header className="showcase-header">
        <div className="showcase-wrap showcase-header-inner">
          <span className="showcase-brand" aria-label={brand}>
            <i aria-hidden="true">✳</i>
            {brand}
          </span>
          <span className="showcase-header-note">{c.simulation}</span>
        </div>
      </header>
      <main id="showcase-main">
        <div className="showcase-wrap showcase-intro">
          <span className="showcase-eyebrow">{c.demoLabel}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
          {onReset && (
            <button type="button" className="showcase-quiet-button" onClick={onReset}>
              {c.reset} ↺
            </button>
          )}
        </div>
        {children}
      </main>
      <footer className="showcase-footer">
        <div className="showcase-wrap showcase-footer-inner">
          <div>
            <span className="showcase-eyebrow">AMPLIUM</span>
            <h2>{c.agency}</h2>
            <p>{c.agencyText}</p>
          </div>
          <a className="showcase-button" href="/#contato">
            {c.project}
          </a>
        </div>
        <div className="showcase-wrap showcase-footer-bottom">
          <span>{c.notice}</span>
          <a href={`/#${cardId}`}>{c.back} ↗</a>
        </div>
      </footer>
    </div>
  );
}
