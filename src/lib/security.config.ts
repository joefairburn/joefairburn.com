/**
 * Security configuration for the application
 * This file contains centralized security settings that can be used across the application
 */

/**
 * Content Security Policy configuration
 * Defines which resources are allowed to be loaded
 */
export const contentSecurityPolicy = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'", "https://analytics.example.com"],
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  imgSrc: ["'self'", "https://i.scdn.co", "data:"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
  connectSrc: ["'self'", "https://api.spotify.com", "https://api.github.com"],
  frameSrc: ["'none'"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"]
};

/**
 * Formats the CSP object into a string for use in headers
 * @returns Formatted CSP string
 */
export function formatCSP(): string {
  return Object.entries(contentSecurityPolicy)
    .map(([key, values]) => {
      return `${kebabCase(key)} ${values.join(' ')};`;
    })
    .join(' ');
}

/**
 * Converts camelCase to kebab-case
 * @param str String to convert
 * @returns Kebab-case string
 */
function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Security headers configuration
 */
export const securityHeaders = {
  // Prevent XSS attacks
  'X-XSS-Protection': '1; mode=block',
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  // Strict transport security
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Feature policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

/**
 * Environment variable validation
 * Validates required environment variables are set
 */
export function validateEnvVars(): void {
  const requiredVars = [
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET',
    'SPOTIFY_REFRESH_TOKEN',
    'GITHUB_TOKEN'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

/**
 * Sanitizes user input to prevent XSS
 * @param input User input string
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
} 