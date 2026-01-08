/**
 * Security configuration for the application
 * This file contains centralized security settings that can be used across the application
 */

/**
 * Content Security Policy configuration
 * Defines which resources are allowed to be loaded
 */
export const contentSecurityPolicy = {
  baseUri: ["'self'"],
  connectSrc: ["'self'", "https://api.spotify.com", "https://api.github.com"],
  defaultSrc: ["'self'"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
  frameSrc: ["'none'"],
  imgSrc: ["'self'", "https://i.scdn.co", "data:"],
  objectSrc: ["'none'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'", "https://fonts.googleapis.com"],
};

/**
 * Security headers configuration
 */
export const securityHeaders = {
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
};

/**
 * Environment variable validation
 * Validates required environment variables are set
 */
export const validateEnvVars = (): void => {
  const requiredVars = [
    "SPOTIFY_CLIENT_ID",
    "SPOTIFY_CLIENT_SECRET",
    "SPOTIFY_REFRESH_TOKEN",
    "GITHUB_TOKEN",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};

/**
 * Sanitizes user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input: string): string =>
  input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#x27;")
    .replaceAll("/", "&#x2F;");
