import { createFileRoute } from "@tanstack/react-router";
import { Suspense, use } from "react";

import { ErrorBoundary } from "@/components/error-boundary";
import { ExperienceItem } from "@/components/experience-item";
import { GridItem } from "@/components/grid-item";
import { PersonalCard } from "@/components/PersonalCard";
import { SectionGrid } from "@/components/section-grid";
import {
  type CurrentlyPlayingResult,
  getCurrentlyPlaying,
} from "@/server/spotify";

export const Route = createFileRoute("/")({
  component: Home,
  // Returns a promise without awaiting it so the page renders immediately and
  // the Spotify card streams in once resolved (mirrors the previous Suspense
  // boundary around the async server component).
  loader: () => ({ spotify: getCurrentlyPlaying() }),
});

const SpotifyCard = ({
  promise,
}: {
  promise: Promise<CurrentlyPlayingResult>;
}) => {
  const spotifyData = use(promise);
  return <PersonalCard spotifyData={spotifyData} />;
};

function Home() {
  const { spotify } = Route.useLoaderData();

  return (
    <section className="max-w-2xl mx-auto mt-[5vh]">
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-display font-medium text-5xl tracking-tight w-fit mb-0">
              Joe Fairburn
            </h1>
            <p className="font-display font-light text-lg text-neutral-50">
              Product Engineer
            </p>
          </div>

          {/* About */}
          <SectionGrid title="About">
            <GridItem className="flex flex-col gap-4">
              <p className="font-normal font-body text-sm text-neutral-400 w-fit">
                I&apos;m currently working at Bumper, a FinTech building
                payments and business intelligence tools for the automotive
                industry.
              </p>
              <p className="font-normal font-body text-sm text-neutral-400 w-fit">
                I mostly work with React, Next.js, and TypeScript, across
                product interfaces, design systems, performance, and data-led
                product work.
              </p>
            </GridItem>
          </SectionGrid>

          {/* Experience */}
          <SectionGrid title="Experience">
            <ExperienceItem dateRange="2025 - now" companyName="Bumper">
              Working on frontend for analytics and business intelligence tools
              used by automotive businesses.
            </ExperienceItem>

            <ExperienceItem dateRange="2023 - 2025" companyName="Uppbeat">
              Worked on Uppbeat&apos;s Next.js web app, design system, search
              experience, SEO, analytics tooling, and frontend infrastructure.
            </ExperienceItem>

            {/* Evergreen Energy */}
            <ExperienceItem
              dateRange="2021 - 2023"
              companyName="Evergreen Energy"
            >
              Worked on a Next.js rebuild of internal tools for heat pump
              quotes, calculations, and installation workflows, with QA coverage
              in Playwright and Jest.
            </ExperienceItem>

            {/* ilk agency */}
            <ExperienceItem dateRange="2020 - 2021" companyName="ilk agency">
              Built client websites and headless CMS projects with React,
              Gatsby, and Next.js, working with designers, strategists, and
              account teams.
            </ExperienceItem>
          </SectionGrid>

          {/* Projects */}
          <SectionGrid title="Projects">
            <ExperienceItem dateRange="2026" companyName="RedwoodSDK Docs">
              Built the{" "}
              <a
                href="https://docs.rwsdk.com/"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit the RedwoodSDK documentation"
              >
                RedwoodSDK docs
              </a>{" "}
              with RedwoodSDK, replacing the previous Astro documentation site.
            </ExperienceItem>

            <ExperienceItem dateRange="2025" companyName="Goodpour">
              Personal software for finding coffee shops around the UK, inspired
              by writing from{" "}
              <a
                href="https://leerob.com/personal-software"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Read Lee Robinson's article on personal software"
              >
                Lee Robinson&apos;s writing on personal software
              </a>{" "}
              and{" "}
              <a
                href="https://rwsdk.com/personal-software"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Read RedwoodSDK's notes on personal software"
              >
                RedwoodSDK
              </a>
              .
            </ExperienceItem>

            <ExperienceItem dateRange="2021 - 2026" companyName="Moonsworth">
              Worked on{" "}
              <a
                href="https://www.lunarclient.com"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit Lunar Client"
              >
                Lunar Client
              </a>{" "}
              web projects, reusable frontend components, Electron-based
              launcher, and{" "}
              <a
                href="https://wrapped.lunarclient.com"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit Lunar Client Wrapped"
              >
                Wrapped
              </a>
              , a personalised yearly stats experience.
            </ExperienceItem>
          </SectionGrid>

          {/* Contact */}
          <SectionGrid title="Contact">
            <div className="font-normal text-sm text-neutral-300 w-fit row-start-2 flex gap-2">
              <a
                href="https://github.com/joefairburn"
                target="_blank"
                className="font-light underline"
                aria-label="View GitHub profile"
                rel="noreferrer"
              >
                GitHub
              </a>
              <span className="text-neutral-400" aria-hidden="true">
                /
              </span>
              <a
                href="https://www.linkedin.com/in/joefairburn/"
                target="_blank"
                className="font-light underline"
                aria-label="View LinkedIn profile"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </SectionGrid>
        </div>
      </div>
      <div className="mt-16">
        <ErrorBoundary silent={true}>
          <Suspense fallback={<PersonalCard spotifyData={null} />}>
            <SpotifyCard promise={spotify} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
