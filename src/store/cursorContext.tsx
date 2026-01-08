'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface CursorContent {
  content: ReactNode
  className?: string
}

interface CursorContextType {
  content: CursorContent
  setContent: (content: CursorContent) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CursorContent>({
    content: null,
    className: ''
  })

  return (
    <CursorContext.Provider value={{ content, setContent }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
