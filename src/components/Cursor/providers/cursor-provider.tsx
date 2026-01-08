import {
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface CursorContextType {
  cursorRef: RefObject<HTMLDivElement | null>;
  cursorType: string;
  isMouseDown: boolean;
  isVisible: boolean;
  popupRef: RefObject<HTMLDivElement | null>;
  targetHeight: number | undefined;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
  cursorRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;
}

const getCursorType = (target: HTMLElement): string => {
  if (
    target.matches('button, a, [role="button"]') ||
    target.closest('button, a, [role="button"]')
  ) {
    return "pointer";
  }
  if (target.matches("input, textarea, p, h1, h2, h3, h4, h5, h6")) {
    return "text";
  }
  return "default";
};

const getTargetHeight = (target: HTMLElement, cursor: string): number => {
  if (cursor === "text") {
    const lineHeight = Number.parseInt(
      window.getComputedStyle(target).lineHeight,
      10
    );
    return Number.isNaN(lineHeight)
      ? target.getBoundingClientRect().height
      : lineHeight;
  }
  return target.getBoundingClientRect().height;
};

const calculatePopupOffset = (
  e: MouseEvent,
  popupRect: DOMRect,
  cursorRect: DOMRect
): { x: number; y: number } => {
  const borderMargin = 10;
  let x = 0;
  let y = 0;

  if (
    e.clientX + popupRect.width + cursorRect.width + borderMargin >
    window.innerWidth
  ) {
    x = -(cursorRect.width + popupRect.width + borderMargin);
  }

  if (
    e.clientY + popupRect.height + cursorRect.height + borderMargin >
    window.innerHeight
  ) {
    y = -(cursorRect.height + popupRect.height + borderMargin);
  }

  return { x, y };
};

interface MouseEventHandlers {
  handleMouseDown: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseOver: (e: MouseEvent) => void;
  handleMouseUp: () => void;
}

const addEventListeners = (
  handlers: MouseEventHandlers,
  updatePosition: (e: MouseEvent) => void
) => {
  window.addEventListener("mousemove", updatePosition);
  window.addEventListener("mousedown", handlers.handleMouseDown);
  window.addEventListener("mouseup", handlers.handleMouseUp);
  window.addEventListener("mouseover", handlers.handleMouseOver);
  document.body.addEventListener("mouseleave", handlers.handleMouseLeave);
  document.body.addEventListener("mouseenter", handlers.handleMouseEnter);
};

const removeEventListeners = (
  handlers: MouseEventHandlers,
  updatePosition: (e: MouseEvent) => void
) => {
  window.removeEventListener("mousemove", updatePosition);
  window.removeEventListener("mousedown", handlers.handleMouseDown);
  window.removeEventListener("mouseup", handlers.handleMouseUp);
  window.removeEventListener("mouseover", handlers.handleMouseOver);
  document.body.removeEventListener("mouseleave", handlers.handleMouseLeave);
  document.body.removeEventListener("mouseenter", handlers.handleMouseEnter);
};

export const CursorProvider = ({
  children,
  cursorRef,
  popupRef,
}: CursorProviderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteractedInitially, setHasInteractedInitially] = useState(false);
  const [cursorType, setCursorType] = useState<string>("default");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [targetHeight, setTargetHeight] = useState<number | undefined>();
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleFirstMouseMove = () => {
      setHasInteractedInitially(true);
      document.body.style.cursor = "none";
      window.removeEventListener("mousemove", handleFirstMouseMove);
    };

    if (!hasInteractedInitially) {
      window.addEventListener("mousemove", handleFirstMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleFirstMouseMove);
    };
  }, [hasInteractedInitially]);

  const updatePosition = useCallback(
    (e: MouseEvent) => {
      const newPos = {
        x: `calc(${e.clientX}px - 50%)`,
        y: `calc(${e.clientY}px - 50%)`,
      };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${newPos.x}, ${newPos.y})`;
      }

      if (popupRef.current && cursorRef.current) {
        const popupRect = popupRef.current.getBoundingClientRect();
        const cursorRect = cursorRef.current.getBoundingClientRect();
        const { x, y } = calculatePopupOffset(e, popupRect, cursorRect);
        popupRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    },
    [cursorRef, popupRef]
  );

  useEffect(() => {
    const handlers: MouseEventHandlers = {
      handleMouseDown: () => setIsMouseDown(true),
      handleMouseEnter: () => setIsVisible(true),
      handleMouseLeave: () => setIsVisible(false),
      handleMouseOver: (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const cursor = getCursorType(target);
        targetRef.current = target;
        setTargetHeight(getTargetHeight(target, cursor));
        setCursorType(cursor);
      },
      handleMouseUp: () => setIsMouseDown(false),
    };

    addEventListeners(handlers, updatePosition);
    return () => removeEventListeners(handlers, updatePosition);
  }, [updatePosition]);
  return (
    <CursorContext.Provider
      value={{
        cursorRef,
        cursorType: hasInteractedInitially ? cursorType : "hidden",
        isMouseDown,
        isVisible,
        popupRef,
        targetHeight,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
