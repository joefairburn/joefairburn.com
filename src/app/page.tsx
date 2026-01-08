import { Suspense } from "react";

import { ErrorBoundary } from "../components/error-boundary";
import { ExperienceItem } from "../components/experience-item";
import { GridItem } from "../components/grid-item";
import { PersonalCard } from "../components/PersonalCard";
import { SectionGrid } from "../components/section-grid";
import { CurrentlyPlaying } from "./currently-playing";

/**
 * Home page component
 */
export default function Home() {
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
                My focus is on creating thoughtful, user-centric experiences,
                blending interaction design with robust engineering to ship
                features that feel seamless and purposeful.
              </p>
              <p className="font-normal font-body text-sm text-neutral-400 w-fit">
                I thrive on turning complex problems into intuitive experiences.
              </p>
            </GridItem>
          </SectionGrid>

          {/* Experience */}
          <SectionGrid title="Experience">
            <ExperienceItem dateRange="2025-Present" companyName="Bumper">
              Leading the frontend build of an analytics platform that delivers
              actionable insights to help automotive businesses stay
              competitive.
            </ExperienceItem>

            <ExperienceItem dateRange="2023-2025" companyName="Uppbeat">
              Led a full frontend rewrite and serverless migration, achieving{" "}
              <strong>5x faster load times</strong> and{" "}
              <strong>20% infrastructure savings</strong>. Scaled the team from{" "}
              <strong>1 to 4 engineers</strong> while collaborating with design
              to build a cohesive design system. Pioneered a self-serve
              analytics and experimentation stack that accelerated product
              iteration.
            </ExperienceItem>

            {/* Moonsworth */}
            <ExperienceItem dateRange="2021-Present" companyName="Moonsworth">
              Built and scaled{" "}
              <a
                href="https://www.lunarclient.com"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit Lunar Client"
              >
                Lunar Client
              </a>{" "}
              to <strong>2M+ monthly users</strong>, collaborating closely with
              design on performance and conversion. Created{" "}
              <a
                href="https://wrapped.lunarclient.com"
                target="_blank"
                className="underline"
                rel="noreferrer"
                aria-label="Visit Lunar Client Wrapped"
              >
                Wrapped
              </a>
              , a viral data storytelling experience that drove engagement and
              sign-ups.
            </ExperienceItem>

            {/* Evergreen Energy */}
            <ExperienceItem
              dateRange="2021-2023"
              companyName="Evergreen Energy"
            >
              Architected and delivered end-to-end redevelopment of a legacy PHP
              platform into Next.js, owning product design and stakeholder
              collaboration. Built a calculation system for heat pump
              installations that replaced manual processes.
            </ExperienceItem>

            {/* ilk agency */}
            <ExperienceItem dateRange="2020-2021" companyName="ilk agency">
              Pioneered the transition to headless CMS architecture with React
              and Next.js, reducing hosting costs and improving performance.
              Collaborated with designers and strategists to deliver client
              projects on tight deadlines.
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
            <CurrentlyPlaying />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}
