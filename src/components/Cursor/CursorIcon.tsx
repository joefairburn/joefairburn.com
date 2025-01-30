import { motion } from 'motion/react'
import { useEffect, useId, useState, type RefObject } from 'react'
import { useCursor } from './providers/CursorProvider'

export const CursorIcon = ({
  cursorRef
}: {
  cursorRef: RefObject<HTMLDivElement>
}) => {
  const id = useId()
  const { isMouseDown, cursorType, isVisible } = useCursor()

  return (
    <motion.svg
      key='default'
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: isMouseDown ? 0.8 : 1 }}
      exit={{ opacity: 0, scale: 0 }}
      viewBox='-2 -2 28 28'
      fill='black'
      stroke='currentColor'
      strokeWidth='2'
      className='absolute inset-0 transform fill-black z-50 '
      overflow='visible'
    >
      <defs>
        <filter id={id} x='-20%' y='-20%' width='140%' height='140%'>
          <feDropShadow
            dx='1'
            dy='1'
            stdDeviation='2'
            floodColor='black'
            floodOpacity='0.5'
          />
        </filter>
      </defs>
      {cursorType !== 'pointer' && isVisible && (
        <path
          d='M 0.058 0.975 C -0.155 0.483 0.244 -0.057 0.778 0.005 C 0.846 0.012 0.912 0.031 0.976 0.058 L 23.534 9.222 C 24.037 9.426 24.129 10.099 23.7 10.432 C 23.624 10.491 23.538 10.533 23.445 10.557 L 14.811 12.785 C 13.817 13.04 13.042 13.815 12.784 14.808 L 10.557 23.445 C 10.421 23.971 9.768 24.151 9.38 23.77 C 9.312 23.703 9.259 23.622 9.222 23.534 L 0.058 0.975 Z'
          filter={`url(#${id})`}
        />
      )}

      {cursorType === 'pointer' && isVisible && (
        <>
          <path d='M 23.995 14.387 C 23.995 19.69 19.794 24 14.502 24' />
          <path d='M 19.293 10.8 L 19.293 9.6 C 19.293 8.275 18.22 7.2 16.898 7.2 C 15.574 7.2 14.502 8.275 14.502 9.6' />
          <path d='M 14.502 9.6 L 14.502 8.4 C 14.502 7.075 13.429 6 12.107 6 C 10.783 6 9.711 7.075 9.711 8.4 L 9.711 9.6' />
          <path
            filter={`url(#${id})`}
            d='M 9.677 9 L 9.677 2.4 C 9.677 1.075 8.607 0 7.29 0 C 5.971 0 4.902 1.075 4.902 2.4 L 4.675 14.137 L 3.995 13.488 C 3.426 12.968 2.641 12.755 1.889 12.917 C 0.092 13.303 -0.614 15.502 0.617 16.872 L 4.914 21.192 C 6.693 22.968 8.722 24 12.064 24 L 14.451 24 C 19.725 24 24 19.703 24 14.4 L 24 10.8 C 24 9.943 23.544 9.151 22.807 8.722 C 21.214 7.798 19.226 8.953 19.226 10.8'
          />
        </>
      )}
    </motion.svg>
  )
}
