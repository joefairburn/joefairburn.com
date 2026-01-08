"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface CursorContent {
  content: ReactNode;
  className?: string;
}

interface CursorContextType {
  content: CursorContent;
  setContent: (content: CursorContent) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<CursorContent>({
    className: "",
    content: null,
  });

  return (
    <CursorContext.Provider value={{ content, setContent }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};
