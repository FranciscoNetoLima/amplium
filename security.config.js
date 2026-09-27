export const productionCsp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');

export const productionHeaders = {
  'Content-Security-Policy': `${productionCsp}; frame-ancestors 'none'`,
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export const developmentHeaders = {
  ...productionHeaders,
  'Content-Security-Policy': productionHeaders['Content-Security-Policy']
    .replace("script-src 'self'", "script-src 'self' 'unsafe-inline'")
    .replace("connect-src 'none'", "connect-src 'self' ws://127.0.0.1:4173 ws://localhost:4173"),
};
