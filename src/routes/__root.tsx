/// <reference types="vite/client" />
import "@fontsource-variable/inter";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { clsx } from "clsx";
import { type ReactNode } from "react";

import { Cursor } from "@/components/Cursor";
import { DefaultCatchBoundary } from "@/components/default-catch-boundary";
import { NotFound } from "@/components/not-found";
import { CursorProvider } from "@/store/cursor-context";
import appCss from "@/styles/globals.css?url";

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

export const Route = createRootRoute({
  errorComponent: DefaultCatchBoundary,
  head: () => ({
    links: [
      { href: appCss, rel: "stylesheet" },
      { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
    ],
    meta: [
      { charSet: "utf-8" },
      {
        content: "width=device-width, initial-scale=1.0",
        name: "viewport",
      },
      { title: "Joe Fairburn" },
      {
        content: "Personal website of Joe Fairburn",
        name: "description",
      },
      {
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        name: "robots",
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
        <CursorProvider>
          <main>{children}</main>
          <Cursor />

          {NoiseFilter}
        </CursorProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
