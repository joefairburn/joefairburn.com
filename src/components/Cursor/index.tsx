import clsx from 'clsx'
import { MotionConfig } from 'framer-motion'
import { useRef } from 'react'
import { CursorIcon } from './CursorIcon'
import { CursorPopup } from './CursorPopup'

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)

  return (
    <MotionConfig transition={{ ease: 'linear', duration: 0.15 }}>
      <div
        ref={cursorRef}
        className={clsx(
          'size-6 fixed pointer-events-none z-50 transition-[opacity,transform] duration-200 ease-easy overflow-visible'
        )}
      >
        <CursorIcon cursorRef={cursorRef} />
        <div className='absolute bottom-0 right-0'>
          <CursorPopup />
        </div>
      </div>
    </MotionConfig>
  )
}
