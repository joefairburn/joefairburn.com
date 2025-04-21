import { motion, MotionConfig } from 'motion/react'
import { type RefObject } from 'react'
import { useCursor } from './providers/CursorProvider'

const getVariants = (height: number | undefined) => ({
  hidden: { opacity: 0, scale: 0 },
  default: { opacity: 1, scale: 1 },
  pointer: { opacity: 1, scale: 1.5 },
  text: { opacity: 1, scale: 1, height: height, width: 4 },
  grab: { opacity: 1, scale: 1 },
  grabActive: { opacity: 1, scale: 0.5 }
})

export const CursorIcon = ({
  cursorRef
}: {
  cursorRef: RefObject<HTMLDivElement>
}) => {
  const { isMouseDown, cursorType, isVisible, targetRef } = useCursor()

  const targetHeight =
    cursorType === 'text'
      ? parseInt(window.getComputedStyle(targetRef.current!).lineHeight)
      : targetRef.current?.getBoundingClientRect().height

  const variants = getVariants(targetHeight)

  return (
    <MotionConfig
      transition={{
        type: 'spring',
        mass: 0.2,
        stiffness: 200,
        damping: 15
      }}
    >
      <motion.div
        key='cursor-icon'
        initial='hidden'
        variants={variants}
        animate={
          isMouseDown ? 'grabActive' : isVisible ? cursorType : 'hidden'
        }
        className='z-40 rounded-full size-full aspect-square backdrop-grayscale backdrop-invert flex items-center justify-center'
      />

      {/* <LinkHighlight targetRef={targetRef} isLink={isLink} /> */}
    </MotionConfig>
  )
}
