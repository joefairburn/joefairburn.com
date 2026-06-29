import { type CSSProperties } from "react";

import { useCursor } from "./providers/cursor-provider";

const getCursorState = (
  isMouseDown: boolean,
  isVisible: boolean,
  cursorType: string
): string => {
  if (isMouseDown) {
    return "grab-active";
  }
  return isVisible ? cursorType : "hidden";
};

export const CursorIcon = () => {
  const { isMouseDown, cursorType, isVisible, targetHeight } = useCursor();

  const cursorState = getCursorState(isMouseDown, isVisible, cursorType);

  return (
    <div
      className="cursor-icon z-40 rounded-full backdrop-grayscale backdrop-invert"
      data-cursor={cursorState}
      style={
        targetHeight
          ? ({ "--cursor-h": `${targetHeight}px` } as CSSProperties)
          : undefined
      }
    />
  );
};
