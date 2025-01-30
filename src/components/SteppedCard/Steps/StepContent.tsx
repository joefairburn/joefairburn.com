import { useMeasure } from '@uidotdev/usehooks'
import { useStep } from './StepsProvider'
import { AnimatePresence, motion } from 'motion/react'

export const StepContent = () => {
  const [ref, { height }] = useMeasure()
  const { currentStepIndex, direction, steps } = useStep()

  const currentStep = steps[currentStepIndex]

  const variants = {
    enter: (dir: typeof direction) => ({
      x: dir === 'forward' ? 100 : -100,
      filter: 'blur(10px)',
      opacity: 0
    }),
    center: {
      x: 0,
      filter: 'blur(0px)',
      opacity: 1
    },
    exit: (dir: typeof direction) => ({
      x: dir === 'forward' ? -100 : 100,
      filter: 'blur(10px)',
      opacity: 0
    })
  }

  return (
    <motion.div
      className='overflow-hidden'
      animate={{ height: height ?? undefined }}
    >
      <div ref={ref}>
        <AnimatePresence mode='popLayout' custom={direction} initial={false}>
          <motion.div
            key={currentStep.id}
            className='pb-4'
            variants={variants}
            custom={direction}
            initial='enter'
            animate='center'
            exit='exit'
          >
            {currentStep.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
