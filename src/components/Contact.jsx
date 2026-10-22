import { useRef, useState } from 'react';
import { t, useLanguage } from '../i18n.js';
import { normalizeText, buildWhatsAppUrl } from '../contact-utils.js';

export default function Contact() {
  useLanguage();
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const update = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };
  const submit = (event) => {
    event.preventDefault();
    const name = normalizeText(values.name, 100);
    const email = normalizeText(values.email, 150);
    const message = normalizeText(values.message, 1200, true);
    const nextErrors = {};
    if (!name) nextErrors.name = 'Informe seu nome.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email))
      nextErrors.email = 'Informe um e-mail válido.';
    if (!message) nextErrors.message = 'Conte um pouco sobre seu projeto.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      formRef.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    window.open(
      buildWhatsAppUrl(
        [
          t('Olá! Quero conversar sobre um projeto com a Amplium.'),
          '',
          t('Nome') + ': ' + name,
          ...(email ? [t('E-mail') + ': ' + email] : []),
          t('Minha necessidade') + ': ' + message,
        ].join('\n'),
      ),
      '_blank',
      'noopener,noreferrer',
    );
  };
  return (
    <section className="closing simple-contact" id="contato" aria-labelledby="contact-heading">
      <div className="wrap">
        <div className="simple-contact-layout">
          <div className="simple-contact-copy">
            <h2 id="contact-heading">{t('Vamos conversar sobre seu projeto?')}</h2>
          </div>
          <form
            ref={formRef}
            className="project-brief simple-brief"
            method="post"
            noValidate
            onSubmit={submit}
          >
            <div className="brief-fields">
              <label htmlFor="project-name">
                {t('Seu nome')}
                <input
                  id="project-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={values.name}
                  onChange={update}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'project-name-error' : undefined}
                />
                {errors.name && (
                  <span className="field-error" id="project-name-error" role="alert">
                    {t(errors.name)}
                  </span>
                )}
              </label>
              <label htmlFor="project-email">
                {t('E-mail')} <small>{t('Opcional')}</small>
                <input
                  id="project-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={150}
                  value={values.email}
                  onChange={update}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'project-email-error' : undefined}
                />
                {errors.email && (
                  <span className="field-error" id="project-email-error" role="alert">
                    {t(errors.email)}
                  </span>
                )}
              </label>
              <label className="brief-description" htmlFor="project-message">
                {t('Sobre seu projeto')}
                <textarea
                  id="project-message"
                  name="message"
                  required
                  rows={4}
                  maxLength={1200}
                  placeholder={t('Qual desafio você quer resolver?')}
                  value={values.message}
                  onChange={update}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'project-message-error' : undefined}
                />
                {errors.message && (
                  <span className="field-error" id="project-message-error" role="alert">
                    {t(errors.message)}
                  </span>
                )}
              </label>
            </div>
            <button type="submit" className="primary is-ready">
              {t('Conversar no WhatsApp')} <span aria-hidden="true">↗</span>
            </button>
            <p className="simple-brief-note">
              {t('O WhatsApp será aberto com sua mensagem pronta para enviar.')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
