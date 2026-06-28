// Augments the Cloudflare `env` (from `cloudflare:workers`) with the secrets
// this app reads at runtime. `wrangler types` regenerates
// `worker-configuration.d.ts`; this file adds bindings that live in `.dev.vars`
// / Cloudflare secrets so they stay typed without being committed.
declare namespace Cloudflare {
  interface Env {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_REFRESH_TOKEN: string;
  }
}
