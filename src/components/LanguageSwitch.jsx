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
      <div className="language-options">
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
