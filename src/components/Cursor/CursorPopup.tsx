import { useStore } from '@nanostores/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'motion/react'
import { type RefObject } from 'react'
import { cursorContent, cursorPosition } from '../../store/cursorAtom'

export const CursorPopup = ({
  popupRef
}: {
  popupRef: RefObject<HTMLDivElement>
}) => {
  const $cursor = useStore(cursorContent)

  return (
    <div
      ref={popupRef}
      className={clsx(
        'absolute flex items-center justify-center origin-left text-nowrap',
        'bg-neutral-800 bg-opacity-75 backdrop-blur-sm rounded-md',
        'transition-[clip-path,opacity] duration-[300ms,400ms] ease-easy',
        $cursor.className,
        $cursor.content ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        clipPath: $cursor.content ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)'
      }}
    >
      <AnimatePresence>
        {$cursor.content && (
          <motion.div
            className='relative w-fit'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'linear', duration: 0.5 }}
          >
            {$cursor.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
