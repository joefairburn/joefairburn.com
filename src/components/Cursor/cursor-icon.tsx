import { motion, MotionConfig } from "motion/react";

import { useCursor } from "./providers/cursor-provider";

const getVariants = (height: number | undefined) => ({
  default: { opacity: 1, scale: 1 },
  grab: { opacity: 1, scale: 1 },
  grabActive: { opacity: 1, scale: 0.5 },
  hidden: { opacity: 0, scale: 0 },
  pointer: { opacity: 1, scale: 1.5 },
  text: { height: height, opacity: 1, scale: 1, width: 4 },
});

const getAnimateState = (
  isMouseDown: boolean,
  isVisible: boolean,
  cursorType: string
) => {
  if (isMouseDown) {
    return "grabActive";
  }
  return isVisible ? cursorType : "hidden";
};

export const CursorIcon = () => {
  const { isMouseDown, cursorType, isVisible, targetHeight } = useCursor();

  const variants = getVariants(targetHeight);
  const animateState = getAnimateState(isMouseDown, isVisible, cursorType);

  return (
    <MotionConfig
      transition={{
        damping: 15,
        mass: 0.2,
        stiffness: 200,
        type: "spring",
      }}
    >
      <motion.div
        key="cursor-icon"
        initial="hidden"
        variants={variants}
        animate={animateState}
        className="z-40 rounded-full size-full aspect-square backdrop-grayscale backdrop-invert flex items-center justify-center"
      />

      {/* <LinkHighlight targetRef={targetRef} isLink={isLink} /> */}
    </MotionConfig>
  );
};
