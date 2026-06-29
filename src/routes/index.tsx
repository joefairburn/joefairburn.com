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
                I&apos;m currently working at Bumper, a fintech building
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
            <ExperienceItem
              dateRange="2025 - now"
              companyName="Bumper"
              href="https://bumper.co"
            >
              Working on frontend for analytics and business intelligence tools
              used by automotive businesses.
            </ExperienceItem>

            <ExperienceItem
              dateRange="2023 - 2025"
              companyName="Uppbeat"
              href="https://uppbeat.io"
            >
              Modernized Uppbeat&apos;s tech stack and grew the frontend team,
              working across the Next.js web app, design system, SEO,
              experimentation tooling, and frontend infrastructure.
            </ExperienceItem>

            {/* Evergreen Energy */}
            <ExperienceItem
              dateRange="2021 - 2023"
              companyName="Evergreen Energy"
            >
              Led a Next.js rebuild of a legacy system while maintaining the
              tools behind heat pump design calculations and data modelling.
            </ExperienceItem>

            {/* ilk agency */}
            <ExperienceItem
              dateRange="2020 - 2021"
              companyName="ilk agency"
              href="https://ilk.agency"
            >
              Built client websites and headless CMS projects with React,
              Gatsby, and Next.js, working with designers, strategists, and
              account teams.
            </ExperienceItem>
          </SectionGrid>

          {/* Projects */}
          <SectionGrid title="Projects">
            <ExperienceItem
              dateRange="2026"
              companyName="RedwoodSDK Docs"
              href="https://docs.rwsdk.com/"
            >
              Built with RedwoodSDK, replacing the previous Astro documentation
              site.
            </ExperienceItem>

            <ExperienceItem
              dateRange="2025"
              companyName="Goodpour"
              href="https://goodpour.co"
            >
              <a
                href="https://rwsdk.com/personal-software"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Read RedwoodSDK's notes on personal software"
              >
                Personal software
              </a>{" "}
              I built for myself to find coffee shops around the UK.
            </ExperienceItem>

            <ExperienceItem
              dateRange="2021 - 2026"
              companyName="Moonsworth"
              href="https://moonsworth.com"
            >
              Worked on a range of projects, including{" "}
              <a
                href="https://www.lunarclient.com"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit Lunar Client"
              >
                Lunar Client
              </a>
              ,{" "}
              <a
                href="https://lunr.pics/"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit Lunar Pics"
              >
                Lunar Pics
              </a>
              , the Electron-based launcher,{" "}
              <a
                href="https://wrapped.lunarclient.com"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit Lunar Client Wrapped"
              >
                Wrapped
              </a>
              , and the{" "}
              <a
                href="https://moonsworth.com"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit the Moonsworth website"
              >
                Moonsworth website
              </a>
              .
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
