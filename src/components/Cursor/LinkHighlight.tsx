'use client'

import clsx from 'clsx'
import { Portal } from '@radix-ui/react-portal'
import { AnimatePresence, motion, type Transition } from 'motion/react'

interface LinkHighlightProps {
  rect: DOMRect | null
  isLink?: boolean
}

const baseTransition: Transition = {
  type: 'spring',
  mass: 1,
  damping: 10,
  bounce: 10
}

const xTransition: Transition = {
  ...baseTransition,
  type: 'spring',
  mass: 0.2,
  damping: 10,
  stiffness: 75
}
const yTransition: Transition = {
  ...baseTransition,
  type: 'spring',
  mass: 1,
  damping: 10
}

const transition: Transition = {
  ...baseTransition,
  opacity: { ...baseTransition, ease: 'easeOut', delay: 0.2 },
  scale: { ...baseTransition, ease: 'easeOut', delay: 0, duration: 0.1 },
  x: xTransition,
  width: xTransition,
  y: yTransition,
  height: yTransition
}

export const LinkHighlight = ({ rect, isLink }: LinkHighlightProps) => {

  if (!rect) return null
  return (
    <Portal container={document.body} asChild>
      <AnimatePresence>
        {isLink && (
          <motion.div
            key='cursor-text'
            className={clsx(
              'absolute -z-10 bg-amber-200/10 backdrop-blur-md top-0 left-0 w-[--el-width] h-[--el-height] translate-x-[--el-x] translate-y-[--el-y] pointer-events-none origin-center rounded-sm',
              isLink ? 'opacity-100' : 'opacity-0'
            )}
            initial={{
              opacity: 0,
              scale: 0.9,
              x: rect?.x,
              y: rect?.y,
              width: rect?.width,
              height: rect?.height
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: rect?.x,
              y: rect?.y,
              width: rect?.width,
              height: rect?.height
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              x: rect?.x,
              y: rect?.y,
              width: rect?.width,
              height: rect?.height,
              transition: {
                opacity: {
                  delay: 0.2,
                  duration: 0.2
                },
                scale: {
                  delay: 0.2,
                  duration: 0.2
                }
              }
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
    </Portal>
  )
}
