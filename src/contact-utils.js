export const WHATSAPP_URL = 'https://wa.me/5588992431477';

export function normalizeText(value, limit, multiline = false) {
  if (typeof value !== 'string') return '';
  let text = value.normalize('NFC');
  text = text
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g, '');
  if (!multiline) text = text.replace(/\s+/g, ' ');
  if (text.toWellFormed) text = text.toWellFormed();
  else
    text = text.replace(
      /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g,
      '\uFFFD',
    );
  return Array.from(text).slice(0, limit).join('').trim();
}

export function isValidContact(value) {
  const contact = normalizeText(value, 150);
  if (!contact) return true;
  if (contact.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(contact);
  return (
    /^\+?[\d\s().-]+$/.test(contact) &&
    contact.replace(/\D/g, '').length >= 7 &&
    contact.replace(/\D/g, '').length <= 15
  );
}

export function buildWhatsAppUrl(message) {
  const text = normalizeText(message, 2400, true);
  if (!text) return undefined;
  const url = new URL(WHATSAPP_URL);
  url.searchParams.set('text', text);
  return url.href;
}
