import { createMiddleware, createStart } from "@tanstack/react-start";

import { securityHeaders } from "@/lib/security.config";

/**
 * Adds the security headers to every response (SSR documents, server routes and
 * server functions) as real HTTP headers rather than `<meta>` tags, so headers
 * like X-Frame-Options and Strict-Transport-Security are actually enforced.
 */
const securityHeadersMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    const result = await next();

    for (const [name, value] of Object.entries(securityHeaders)) {
      result.response.headers.set(name, value);
    }

    return result;
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeadersMiddleware],
}));
