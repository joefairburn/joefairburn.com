import {
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface CursorContextType {
  cursorType: string;
  isMouseDown: boolean;
  isVisible: boolean;
  targetHeight: number | undefined;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
  cursorRef: RefObject<HTMLDivElement | null>;
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

interface MouseEventHandlers {
  handleMouseDown: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseOver: (e: MouseEvent) => void;
  handleMouseUp: () => void;
}

const listenerOptions: AddEventListenerOptions = { passive: true };

const addEventListeners = (
  handlers: MouseEventHandlers,
  updatePosition: (e: MouseEvent) => void
) => {
  window.addEventListener("mousemove", updatePosition, listenerOptions);
  window.addEventListener(
    "mousedown",
    handlers.handleMouseDown,
    listenerOptions
  );
  window.addEventListener("mouseup", handlers.handleMouseUp, listenerOptions);
  window.addEventListener(
    "mouseover",
    handlers.handleMouseOver,
    listenerOptions
  );
  document.body.addEventListener(
    "mouseleave",
    handlers.handleMouseLeave,
    listenerOptions
  );
  document.body.addEventListener(
    "mouseenter",
    handlers.handleMouseEnter,
    listenerOptions
  );
};

const removeEventListeners = (
  handlers: MouseEventHandlers,
  updatePosition: (e: MouseEvent) => void
) => {
  window.removeEventListener("mousemove", updatePosition, listenerOptions);
  window.removeEventListener(
    "mousedown",
    handlers.handleMouseDown,
    listenerOptions
  );
  window.removeEventListener(
    "mouseup",
    handlers.handleMouseUp,
    listenerOptions
  );
  window.removeEventListener(
    "mouseover",
    handlers.handleMouseOver,
    listenerOptions
  );
  document.body.removeEventListener(
    "mouseleave",
    handlers.handleMouseLeave,
    listenerOptions
  );
  document.body.removeEventListener(
    "mouseenter",
    handlers.handleMouseEnter,
    listenerOptions
  );
};

export const CursorProvider = ({
  children,
  cursorRef,
}: CursorProviderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteractedInitially, setHasInteractedInitially] = useState(false);
  const [cursorType, setCursorType] = useState<string>("default");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [targetHeight, setTargetHeight] = useState<number | undefined>();

  useEffect(() => {
    const handleFirstMouseMove = () => {
      setHasInteractedInitially(true);
      document.body.classList.add("custom-cursor-active");
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
      if (cursorRef.current) {
        const x = `calc(${e.clientX}px - 50%)`;
        const y = `calc(${e.clientY}px - 50%)`;
        cursorRef.current.style.transform = `translate(${x}, ${y})`;
      }
    },
    [cursorRef]
  );

  useEffect(() => {
    const handlers: MouseEventHandlers = {
      handleMouseDown: () => setIsMouseDown(true),
      handleMouseEnter: () => setIsVisible(true),
      handleMouseLeave: () => setIsVisible(false),
      handleMouseOver: (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const cursor = getCursorType(target);
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
        cursorType: hasInteractedInitially ? cursorType : "hidden",
        isMouseDown,
        isVisible,
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
