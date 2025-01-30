import clsx from 'clsx'
import { MotionConfig } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { CursorIcon } from './CursorIcon'
import { CursorPopup } from './CursorPopup'
import { CursorProvider } from './providers/CursorProvider'

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  return (
    <CursorProvider cursorRef={cursorRef} popupRef={popupRef}>
      <MotionConfig transition={{ ease: 'linear', duration: 0.15 }}>
        <div
          ref={cursorRef}
          className={clsx(
            'size-6 fixed pointer-events-none z-50 transition-[opacity,transform] duration-200 ease-easy overflow-visible'
          )}
        >
          <CursorIcon cursorRef={cursorRef} />
          <div className='absolute bottom-0 right-0 w-fit h-fit'>
            <CursorPopup popupRef={popupRef} />
          </div>
        </div>
      </MotionConfig>
    </CursorProvider>
  )
}
