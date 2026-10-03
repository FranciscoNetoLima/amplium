import { useSyncExternalStore } from 'react';
import translations from './translations.json';
import { WHATSAPP_URL, normalizeText, buildWhatsAppUrl } from './contact-utils.js';

let language = 'pt';
try {
  if (localStorage.getItem('amplium-language') === 'en') language = 'en';
} catch {}
const subscribers = new Set();
const english = Object.assign(Object.create(null), translations);
const reverse = Object.assign(
  Object.create(null),
  Object.fromEntries(Object.entries(english).map(([pt, en]) => [en, pt])),
);
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const makePattern = (entries) =>
  new RegExp(
    '(?<![\\p{L}])(?:' +
      Object.keys(entries)
        .sort((a, b) => b.length - a.length)
        .map(escape)
        .join('|') +
      ')(?![\\p{L}])',
    'gu',
  );
const phrases = makePattern(english);
const reversePhrases = makePattern(reverse);

export function t(value) {
  if (typeof value !== 'string') return value;
  const text = value.trim();
  if (language === 'pt')
    return reverse[text]
      ? value.replace(text, reverse[text])
      : value.replace(reversePhrases, (key) => reverse[key]);
  if (english[text]) return value.replace(text, english[text]);
  if (/^Etapa \d de 3$/.test(text)) return text.replace('Etapa', 'Step').replace(' de ', ' of ');
  if (/^\d de 7: /.test(text))
    return text.replace(' de 7:', ' of 7:').replace(phrases, (key) => english[key]);
  return value.replace(phrases, (key) => english[key]);
}

export function localizedWhatsApp(value) {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value);
    if (
      url.origin !== 'https://wa.me' ||
      url.username ||
      url.password ||
      url.pathname !== new URL(WHATSAPP_URL).pathname
    )
      return undefined;
    const text = url.searchParams.get('text');
    return text ? buildWhatsAppUrl(t(normalizeText(text, 2400, true))) : WHATSAPP_URL;
  } catch {
    return undefined;
  }
}

function updateMetadata() {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  document.title =
    language === 'en'
      ? 'Amplium — Technology that expands your business'
      : 'Amplium — Tecnologia que amplia negócios';
  const description =
    language === 'en'
      ? 'Websites, landing pages, e-commerce, systems and automation to expand your business possibilities.'
      : 'Sites, landing pages, e-commerce, sistemas e automações para ampliar as possibilidades do seu negócio.';
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
}

export function setLanguage(next) {
  if (!['pt', 'en'].includes(next) || next === language) return;
  language = next;
  try {
    localStorage.setItem('amplium-language', next);
  } catch {}
  updateMetadata();
  subscribers.forEach((notify) => notify());
  requestAnimationFrame(() => window.dispatchEvent(new Event('languagechange')));
}
export function useLanguage() {
  return useSyncExternalStore(
    (notify) => {
      subscribers.add(notify);
      return () => subscribers.delete(notify);
    },
    () => language,
    () => 'pt',
  );
}
export function prepareHydration() {
  const preferred = language;
  language = 'pt';
  updateMetadata();
  return () => setLanguage(preferred);
}
updateMetadata();
