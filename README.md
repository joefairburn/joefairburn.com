# Personal Portfolio Site

A modern, minimalist personal portfolio site built with [TanStack Start](https://tanstack.com/start), TypeScript, and Tailwind CSS, deployed to [Cloudflare Workers](https://workers.cloudflare.com/). It showcases professional experience and integrates with the Spotify API to display real-time listening activity.

## 🚀 Features

- **TanStack Start**: Full-stack React framework with type-safe, file-based routing
- **Cloudflare Workers**: SSR runs on Cloudflare's edge via the `@cloudflare/vite-plugin`
- **Server Functions**: Spotify credentials and API calls stay server-only via `createServerFn`
- **Streaming**: The page renders immediately and the Spotify card streams in through a deferred loader (`React.use` + `Suspense`)
- **TypeScript**: Fully typed codebase, including Cloudflare bindings via `wrangler types`
- **Tailwind CSS v4**: Utility-first styling through `@tailwindcss/vite`
- **Accessibility**: ARIA attributes, semantic HTML, and graceful error boundaries

## 📂 Project Structure

```
/
├── public/                 # Static assets (fonts, images, favicon, robots.txt)
├── src/
│   ├── routes/             # File-based routes
│   │   ├── __root.tsx      # Root document, <head> metadata, providers
│   │   └── index.tsx       # Home page + Spotify loader
│   ├── server/             # Server functions (run only on the Worker)
│   │   └── spotify.ts      # createServerFn that reads Spotify secrets from env
│   ├── components/         # Shared UI components
│   │   ├── Cursor/         # Custom cursor
│   │   ├── PersonalCard/   # Spotify activity card
│   │   └── ...
│   ├── lib/                # API clients / utilities (spotify.ts, security.config.ts)
│   ├── store/              # React context (cursor state)
│   ├── styles/globals.css  # Tailwind entry + theme
│   ├── router.tsx          # Router factory (getRouter)
│   └── routeTree.gen.ts    # Generated route tree (do not edit)
├── vite.config.ts          # Vite + TanStack Start + Cloudflare + Tailwind plugins
└── wrangler.jsonc          # Cloudflare Worker configuration
```

## 🔧 Environment Variables

The app reads Spotify credentials from the Cloudflare `env` binding (`cloudflare:workers`).

**Local development** — copy `.dev.vars.example` to `.dev.vars` (gitignored) and fill in:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

**Production** — set them as Worker secrets:

```bash
wrangler secret put SPOTIFY_CLIENT_ID
wrangler secret put SPOTIFY_CLIENT_SECRET
wrangler secret put SPOTIFY_REFRESH_TOKEN
```

If credentials are missing, the Spotify card degrades gracefully to an error state and the rest of the page renders normally.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create your `.dev.vars` from `.dev.vars.example`.

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Commands

| Command           | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `pnpm dev`        | Start the Vite dev server (SSR in workerd)                |
| `pnpm build`      | Build the client and server bundles                       |
| `pnpm preview`    | Preview the production build locally                      |
| `pnpm deploy`     | Build and deploy to Cloudflare Workers (`wrangler`)       |
| `pnpm cf-typegen` | Regenerate `worker-configuration.d.ts` from Worker config |
| `pnpm lint`       | Lint and format check via Ultracite (oxlint + oxfmt)      |

## ☁️ Deployment

The site deploys to Cloudflare Workers. After setting your secrets (see above):

```bash
pnpm deploy
```

The Worker name and runtime settings live in `wrangler.jsonc`. Rerun `pnpm cf-typegen` whenever you change bindings in `wrangler.jsonc`.

## 🎵 Spotify API

The site displays your currently playing or most recently played track. To set this up:

1. Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Copy the Client ID and Client Secret.
3. Generate a refresh token with the `user-read-currently-playing` and `user-read-recently-played` scopes.
4. Provide the three values via `.dev.vars` (local) or `wrangler secret put` (production).

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- GitHub: [@joefairburn](https://github.com/joefairburn)
- LinkedIn: [Joe Fairburn](https://www.linkedin.com/in/joefairburn/)
