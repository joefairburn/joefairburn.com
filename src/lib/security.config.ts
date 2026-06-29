/**
 * Security configuration for the application.
 *
 * These headers are applied to every response (SSR documents, server routes and
 * server functions) by the request middleware in `src/start.ts`.
 */
export const securityHeaders = {
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};
