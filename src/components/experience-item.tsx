import { type ReactNode } from "react";

import { GridItem } from "./grid-item";

interface ExperienceItemProps {
  dateRange: string;
  companyName: string;
  children: ReactNode;
}

export const ExperienceItem = ({
  dateRange,
  companyName,
  children,
}: ExperienceItemProps) => (
  <GridItem
    label={dateRange}
    className="font-normal font-display text-sm text-neutral-300 w-fit flex flex-col gap-2"
  >
    <p className="font-normal font-body text-sm text-neutral-300 w-fit">
      {companyName}
    </p>
    <p className="font-normal font-body text-sm text-neutral-400 w-fit">
      {children}
    </p>
  </GridItem>
);
