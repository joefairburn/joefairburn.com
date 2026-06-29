import { type ReactNode } from "react";

import { GridItem } from "./grid-item";

interface ExperienceItemProps {
  dateRange: string;
  companyName: string;
  href?: string;
  children: ReactNode;
}

export const ExperienceItem = ({
  dateRange,
  companyName,
  href,
  children,
}: ExperienceItemProps) => (
  <GridItem
    label={dateRange}
    className="font-normal font-display text-sm text-neutral-300 w-fit flex flex-col gap-2"
  >
    <p className="font-normal font-body text-sm text-neutral-300 w-fit">
      {href ? (
        <a
          href={href}
          target="_blank"
          className="group inline-flex items-center gap-1"
          rel="noreferrer"
          aria-label={`Visit ${companyName}`}
        >
          {companyName}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-3 text-neutral-500 transition-colors group-hover:text-neutral-300"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      ) : (
        companyName
      )}
    </p>
    <p className="font-normal font-body text-sm text-neutral-400 w-fit">
      {children}
    </p>
  </GridItem>
);
