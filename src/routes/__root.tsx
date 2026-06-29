/// <reference types="vite/client" />
import "@fontsource-variable/inter";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { clsx } from "clsx";
import { lazy, Suspense, type ReactNode } from "react";

import { Cursor } from "@/components/Cursor";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";

import appCss from "@/styles/globals.css?url";

// Router devtools are dev-only; in production this resolves to a no-op so the
// devtools bundle is never shipped to users.
const RouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/react-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtools,
      }))
    );

const NoiseFilter = (
  <svg
    className="pointer-events-none fixed inset-0 top-0 bottom-0 right-0 left-0 -z-50 h-full w-full overflow-hidden opacity-[0.075]"
    aria-hidden="true"
  >
    <filter id="fractalNoise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency=".55"
        numOctaves="1"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#fractalNoise)" />
  </svg>
);

const SITE_URL = "https://joefairburn.com";
const SITE_TITLE = "Joe Fairburn — Product Engineer";
const SITE_DESCRIPTION =
  "Joe Fairburn — product engineer building product interfaces, design systems, and performance-focused front-ends. Currently at Bumper, a fintech in the automotive industry.";

export const Route = createRootRoute({
  errorComponent: DefaultCatchBoundary,
  head: () => ({
    links: [
      { href: appCss, rel: "stylesheet" },
      {
        as: "font",
        crossOrigin: "anonymous",
        href: "/fonts/tobias/Tobias-Uprights.woff2",
        rel: "preload",
        type: "font/woff2",
      },
      { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
      { href: SITE_URL, rel: "canonical" },
    ],
    meta: [
      { charSet: "utf-8" },
      {
        content: "width=device-width, initial-scale=1.0",
        name: "viewport",
      },
      { title: SITE_TITLE },
      { content: SITE_DESCRIPTION, name: "description" },
      {
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        name: "robots",
      },
      // Open Graph (LinkedIn, Slack, Discord, iMessage, Facebook)
      { content: SITE_TITLE, property: "og:title" },
      { content: SITE_DESCRIPTION, property: "og:description" },
      { content: "website", property: "og:type" },
      { content: SITE_URL, property: "og:url" },
      { content: "Joe Fairburn", property: "og:site_name" },
      { content: "en_GB", property: "og:locale" },
      { content: `${SITE_URL}/og.png`, property: "og:image" },
      { content: "1200", property: "og:image:width" },
      { content: "630", property: "og:image:height" },
      { content: SITE_TITLE, property: "og:image:alt" },
      // Twitter / X
      { content: "summary_large_image", name: "twitter:card" },
      { content: SITE_TITLE, name: "twitter:title" },
      { content: SITE_DESCRIPTION, name: "twitter:description" },
      { content: `${SITE_URL}/og.png`, name: "twitter:image" },
      { content: SITE_TITLE, name: "twitter:image:alt" },
      // Structured data (Google Knowledge Graph / answer engines)
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "Person",
          jobTitle: "Product Engineer",
          knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "Design Systems",
            "Web Performance",
          ],
          name: "Joe Fairburn",
          sameAs: [
            "https://github.com/joefairburn",
            "https://www.linkedin.com/in/joefairburn/",
          ],
          url: SITE_URL,
          worksFor: {
            "@type": "Organization",
            name: "Bumper",
            url: "https://bumper.co",
          },
        },
      },
    ],
  }),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        className={clsx(
          "bg-[#101010] text-white font-body p-8 pt-24 min-h-screen"
        )}
      >
        <main>{children}</main>
        <Cursor />

        {NoiseFilter}
        <Suspense>
          <RouterDevtools />
        </Suspense>
        <Scripts />
      </body>
    </html>
  );
}
