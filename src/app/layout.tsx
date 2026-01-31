import "@fontsource-variable/inter";
import { clsx } from "clsx";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { securityHeaders } from "@/lib/security.config";

import { Cursor } from "../components/Cursor";
import { CursorProvider } from "../store/cursor-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

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

export const metadata: Metadata = {
  description: "Personal website of Joe Fairburn",
  other: {
    ...securityHeaders,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: "Joe Fairburn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={clsx(
          "bg-[#101010] text-white font-sans p-8 pt-24 min-h-screen",
          inter.className
        )}
      >
        <CursorProvider>
          <main>{children}</main>
          <Cursor />

          {NoiseFilter}
        </CursorProvider>
      </body>
    </html>
  );
}
