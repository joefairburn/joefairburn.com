import {
  createContext,
  type ReactNode,
  type RefObject,
  useContext,
  useEffect,
  useState
} from 'react'

interface CursorContextType {
  cursorRef: RefObject<HTMLDivElement>
  popupRef: RefObject<HTMLDivElement>
  isVisible: boolean
  cursorType: string
  isMouseDown: boolean
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

interface CursorProviderProps {
  children: ReactNode
  cursorRef: RefObject<HTMLDivElement>
  popupRef: RefObject<HTMLDivElement>
}

export const CursorProvider = ({
  children,
  cursorRef,
  popupRef
}: CursorProviderProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [cursorType, setCursorType] = useState<string>('default')
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }

      // Prevent the popup from being clipped by the viewport
      if (popupRef.current && cursorRef.current) {
        const popup = popupRef.current
        const rect = popup.getBoundingClientRect()
        const cursorRect = cursorRef.current.getBoundingClientRect()

        let x = 0
        let y = 0
        const borderMargin = 10

        if (
          e.clientX + rect.width + cursorRect.width + borderMargin >
          window.innerWidth
        ) {
          x = -(cursorRect.width + rect.width + borderMargin)
        }

        if (
          e.clientY + rect.height + cursorRect.height + borderMargin >
          window.innerHeight
        ) {
          y = -(cursorRect.height + rect.height + borderMargin)
        }

        popup.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseDown = () => {
      setIsMouseDown(true)
    }

    const handleMouseUp = () => {
      setIsMouseDown(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      let cursor = 'default'
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        cursor = 'pointer'
      }
      setCursorType(cursor)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('click', handleMouseDown)
      window.removeEventListener('click', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])
  return (
    <CursorContext.Provider
      value={{ cursorRef, popupRef, isVisible, cursorType, isMouseDown }}
    >
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
