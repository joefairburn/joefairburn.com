import { clsx } from "clsx";
import { useRef } from "react";

import { CursorIcon } from "./cursor-icon";
import { CursorProvider } from "./providers/cursor-provider";

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  return (
    <CursorProvider cursorRef={cursorRef}>
      <div
        ref={cursorRef}
        className={clsx(
          "size-5 fixed top-0 left-0 pointer-events-none z-50 transition-[opacity] duration-200 ease-easy overflow-visible flex items-center justify-center"
        )}
        aria-hidden="true"
      >
        <CursorIcon />
      </div>
    </CursorProvider>
  );
};
