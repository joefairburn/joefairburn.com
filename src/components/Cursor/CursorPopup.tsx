import { useStore } from '@nanostores/react'
import { useMeasure } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cursorContent } from '../../store/cursorAtom'

export const CursorPopup = () => {
  const [ref, { width, height }] = useMeasure()

  const popupRef = useRef<HTMLDivElement>(null)

  const [heightOfCurrentAnimation, setHeightOfCurrentAnimation] = useState<
    number | null
  >(null)

  const $content = useStore(cursorContent)

  cursorContent.listen((content) => {
    if (!content) {
      setHeightOfCurrentAnimation(height)
    }
  })

  const currentHeight = heightOfCurrentAnimation ?? height

  return (
    <div
      ref={popupRef}
      className='absolute flex items-center justify-center origin-left text-nowrap w-[var(--width)] h-[var(--height)] transition-[width] duration-500 bg-neutral-800 overflow-hidden rounded-md'
      style={
        {
          '--width': `${$content && width ? width : 0}px`,
          '--height': `${currentHeight ? currentHeight : 0}px`
        } as React.CSSProperties
      }
    >
      <div ref={ref} className='absolute top-0 left-0 w-fit h-fit z-20'>
        <AnimatePresence>
          {$content && (
            <motion.div
              className='relative w-fit px-3 py-2'
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'linear', duration: 0.5 }}
            >
              {$content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
