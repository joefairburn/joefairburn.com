import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";

export const NotFound = ({ children }: { children?: ReactNode }) => (
  <div className="max-w-2xl mx-auto mt-[5vh] flex flex-col gap-4">
    <h1 className="font-display font-medium text-3xl tracking-tight">
      Page not found
    </h1>
    <div className="text-sm text-neutral-400">
      {children ?? <p>The page you were looking for doesn&apos;t exist.</p>}
    </div>
    <Link to="/" className="text-sm underline w-fit">
      Go back home
    </Link>
  </div>
);
