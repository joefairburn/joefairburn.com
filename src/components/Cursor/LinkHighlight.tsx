"use client";

import { Portal } from "@radix-ui/react-portal";
import clsx from "clsx";
import { AnimatePresence, motion, type Transition } from "motion/react";

interface LinkHighlightProps {
  rect: DOMRect | null;
  isLink?: boolean;
}

const baseTransition: Transition = {
  bounce: 10,
  damping: 10,
  mass: 1,
  type: "spring",
};

const xTransition: Transition = {
  ...baseTransition,
  type: "spring",
  mass: 0.2,
  damping: 10,
  stiffness: 75,
};
const yTransition: Transition = {
  ...baseTransition,
  type: "spring",
  mass: 1,
  damping: 10,
};

const transition: Transition = {
  ...baseTransition,
  opacity: { ...baseTransition, ease: "easeOut", delay: 0.2 },
  scale: { ...baseTransition, ease: "easeOut", delay: 0, duration: 0.1 },
  x: xTransition,
  width: xTransition,
  y: yTransition,
  height: yTransition,
};

export const LinkHighlight = ({ rect, isLink }: LinkHighlightProps) => {
  if (!rect) {
    return null;
  }
  return (
    <Portal container={document.body} asChild>
      <AnimatePresence>
        {isLink && (
          <motion.div
            key="cursor-text"
            className={clsx(
              "absolute -z-10 bg-amber-200/10 backdrop-blur-md top-0 left-0 w-[--el-width] h-[--el-height] translate-x-[--el-x] translate-y-[--el-y] pointer-events-none origin-center rounded-sm",
              isLink ? "opacity-100" : "opacity-0"
            )}
            initial={{
              height: rect?.height,
              opacity: 0,
              scale: 0.9,
              width: rect?.width,
              x: rect?.x,
              y: rect?.y,
            }}
            animate={{
              height: rect?.height,
              opacity: 1,
              scale: 1,
              width: rect?.width,
              x: rect?.x,
              y: rect?.y,
            }}
            exit={{
              height: rect?.height,
              opacity: 0,
              scale: 0.95,
              transition: {
                opacity: {
                  delay: 0.2,
                  duration: 0.2,
                },
                scale: {
                  delay: 0.2,
                  duration: 0.2,
                },
              },
              width: rect?.width,
              x: rect?.x,
              y: rect?.y,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
    </Portal>
  );
};
