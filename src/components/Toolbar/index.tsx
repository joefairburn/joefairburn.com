import { useMeasure } from '@uidotdev/usehooks'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Settings, ToggleLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { ToggleSetting } from './ToggleSetting'

export const Toolbar = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentRef, { width }] = useMeasure()

  const [isExpanded, setIsExpanded] = useState(true)
  return (
    <div
      ref={containerRef}
      className='relative w-full h-screen flex items-center justify-center pointer-events-none flex-grow'
    >
      <motion.div
        drag
        whileDrag={{ scale: 0.9, cursor: 'grab' }}
        dragMomentum={false}
        dragConstraints={containerRef}
        className='flex flex-row gap-2 bg-black p-2 rounded-full pointer-events-auto'
      >
        <div className='flex flex-row gap-2 transition-[width] duration-300 ease-in-out'>
          {' '}
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <ChevronLeft
              className={clsx(
                'transition-transform duration-300 ease-in-out',
                isExpanded ? 'rotate-180' : ''
              )}
            />
          </button>
          <div
            className={clsx(
              'transition-[width] duration-300 ease-in-out w-[var(--width)] overflow-hidden'
            )}
            style={
              {
                '--width': isExpanded ? `${width}px` : '0px'
              } as React.CSSProperties
            }
          >
            <div className='flex flex-row gap-2 w-fit pr-2' ref={contentRef}>
              {isExpanded && (
                <>
                  <button>a</button>
                  <button>b</button>
                  <button>c</button>
                </>
              )}
            </div>
          </div>
          <ToggleSetting />
        </div>
      </motion.div>
    </div>
  )
}
