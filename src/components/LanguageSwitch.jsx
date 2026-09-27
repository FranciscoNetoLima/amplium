import { t, useLanguage, setLanguage } from '../i18n.js';

export default function LanguageSwitch() {
  const language = useLanguage();
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={t('Idioma do site')}
      data-language={language}
    >
      <svg
        className="language-globe"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M5 6.5h14M5 17.5h14" />
      </svg>
      <div className="language-options">
        <span className="language-indicator" aria-hidden="true" />
        <button
          type="button"
          lang="pt-BR"
          aria-label="Português"
          title="Português"
          aria-pressed={language === 'pt'}
          onClick={() => setLanguage('pt')}
        >
          PT
        </button>
        <button
          type="button"
          lang="en"
          aria-label="English"
          title="English"
          aria-pressed={language === 'en'}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
      </div>
    </div>
  );
}
