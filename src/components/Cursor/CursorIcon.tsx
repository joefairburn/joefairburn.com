import { motion } from 'motion/react'
import { useEffect, useId, useState, type RefObject } from 'react'
import { useCursor } from './providers/CursorProvider'

const getVariants = (height: number | undefined) => ({
  hidden: { opacity: 0, scale: 0 },
  default: { opacity: 1, scale: 1 },
  pointer: { opacity: 1, scale: 1.5 },
  text: { opacity: 1, scale: 1, height: height, width: 4 },
  grab: { opacity: 1, scale: 1 }
})

export const CursorIcon = ({
  cursorRef
}: {
  cursorRef: RefObject<HTMLDivElement>
}) => {
  const { isMouseDown, cursorType, isVisible, targetRef } = useCursor()
  const targetHeight = targetRef.current?.getBoundingClientRect().height

  return (
    <motion.div
      key='default'
      initial='hidden'
      variants={getVariants(targetHeight)}
      animate={cursorType}
      transition={{ type: 'spring', mass: 0.2, stiffness: 200, damping: 15 }}
      className='z-50 rounded-full size-6 backdrop-invert'
    />
  )
}
