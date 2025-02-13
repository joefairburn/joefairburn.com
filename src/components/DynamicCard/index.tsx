'use client'

import { useMeasure } from '@uidotdev/usehooks'
import clsx from 'clsx'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { ChevronLeft, X } from 'lucide-react'
import { useState, type CSSProperties, type ReactNode } from 'react'
import { DynamicCardProvider, useDynamicCard } from './DynamicCardProvider'

const Header = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  const { history, currentPage, goBack } = useDynamicCard()
  return (
    <div className={clsx('relative w-full text-gray-500 h-10', className)}>
      <motion.button
        key='back-button'
        className='absolute left-6 top-1/2 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full'
        // Override the transform: none set by Framer Motion
        style={{ translateY: '-50%' }}
        type='button'
        onClick={goBack}
        initial={{ opacity: 0, x: -2 }}
        animate={
          history.length > 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -2 }
        }
        transition={{ duration: 0.2 }}
        disabled={history.length <= 1}
      >
        <ChevronLeft />
      </motion.button>
      <AnimatePresence initial={false} mode='popLayout'>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={currentPage.key}
          transition={{ duration: 0.1 }}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-black text-center'
        >
          {children}
        </motion.h3>
      </AnimatePresence>
      <button
        className='absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full'
        type='button'
      >
        <X size={24} />
      </button>
    </div>
  )
}

const DynamicCardChild = () => {
  const { history } = useDynamicCard()
  const [ref, { height, width }] = useMeasure()

  const [animatedCount, setAnimatedCount] = useState<number>(0)

  const [isInitial, setIsInitial] = useState(true)

  const currentComponent = history[history.length - 1]

  const scaleUp = animatedCount % 2 === 0

  return (
    <MotionConfig transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.2 }}>
      <motion.div
        style={
          {
            '--width': `${width}px`,
            // 48 = height of header
            '--height': `${height}px`
          } as CSSProperties
        }
        animate={{
          '--height': `${height}px`
        }}
        transition={{
          duration: isInitial ? 0 : 0.2,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className={clsx(
          'h-[var(--height)] w-[var(--width)] bg-white text-black rounded-2xl overflow-hidden shadow-lg transition-[opacity] relative',
          height === null && width === null ? 'opacity-0' : 'opacity-100',
          isInitial ? 'duration-[1ms]' : 'duration-200'
        )}
        onTransitionEnd={() => setIsInitial(false)}
      >
        <Header
          className={clsx(
            'relative w-[var(--width)] z-50 h-6 px-6 ease-easy duration-200 mt-6',
            !isInitial && 'transition-[width]'
          )}
        >
          {currentComponent?.title}
        </Header>
        <div className='z-10 absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none'>
          <div className='w-full h-full min-w-[100px] min-h-[100px] pointer-events-auto'>
            <div ref={ref} className='w-fit h-fit p-6 pt-20'>
              <AnimatePresence
                mode='popLayout'
                initial={false}
                onExitComplete={() => setAnimatedCount(animatedCount + 1)}
              >
                <motion.div
                  className='relative top-0 left-0'
                  initial={{
                    opacity: 0,
                    scale: scaleUp ? 0.95 : 1.05
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: scaleUp ? 1.05 : 0.95 }}
                  transition={{
                    opacity: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] },
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  key={currentComponent?.link + currentComponent?.key}
                >
                  {currentComponent?.component}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  )
}

export const DynamicCardLink = ({
  children,
  className,
  link
}: {
  children: ReactNode
  className?: string
  link: string
}) => {
  const { goToLink } = useDynamicCard()

  return (
    <button
      type='button'
      onClick={() => goToLink(link)}
      className={className}
    >
      {children}
    </button>
  )
}

export const DynamicCard = ({
  components,
  firstPage
}: {
  components: {
    component: ReactNode
    link: string
    title: string
  }[]
  firstPage: string
}) => {
  return (
    <DynamicCardProvider components={components} firstPage={firstPage}>
      <DynamicCardChild />
    </DynamicCardProvider>
  )
}
