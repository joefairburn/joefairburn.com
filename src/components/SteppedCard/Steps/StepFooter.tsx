'use client'

import clsx from 'clsx'
import { useStep } from './StepsProvider'
import {
  ArrowDownIcon,
  ArrowDownLeft,
  ArrowRightIcon,
  CornerDownLeft,
  CornerDownLeftIcon,
  CornerDownRightIcon
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMeasure } from '@uidotdev/usehooks'

const StepPicker = () => {
  const { steps, currentStepIndex, setCurrentStep } = useStep()

  return (
    <div className='flex justify-between items-center gap-1.5'>
      {steps.map((step, index) => (
        <button
          key={step.id}
          type='button'
          onClick={() => setCurrentStep(index)}
          className={clsx(
            'rounded-full transition-[width,height,background-color] duration-300 hover:scale-110 hover:bg-slate-400  bg-slate-300 size-2 disabled:bg-slate-700 disabled:size-[0.625rem]'
          )}
          disabled={index === currentStepIndex}
          aria-label={`Step ${index + 1}`}
        />
      ))}
    </div>
  )
}

const NextButton = () => {
  const { incrementStep, currentStepIndex, steps, direction } = useStep()
  const isLastStep = currentStepIndex === steps.length - 1
  const buttonText = isLastStep ? 'Submit' : 'Next'

  const [ref, { width }] = useMeasure()

  const variants = {
    initial: (direction: 'forward' | 'backward') => ({
      filter: 'blur(10px)',
      opacity: 0,
      x: direction === 'forward' ? 100 : -100
    }),
    animate: { filter: 'blur(0px)', opacity: 1, x: 0 },
    exit: (direction: 'forward' | 'backward') => ({
      filter: 'blur(10px)',
      opacity: 0,
      x: direction === 'forward' ? -100 : 100
    })
  }

  return (
    <button
      className='overflow-hidden bg-black text-white rounded-md ease-easy transition-[width,height] duration-300'
      type='button'
      onClick={incrementStep}
      style={{ width: width ?? undefined }}
    >
      <p className='w-fit flex items-center gap-2 px-4 py-2' ref={ref}>
        <AnimatePresence mode='popLayout' initial={false} custom={direction}>
          <motion.span
            key={buttonText}
            className='relative flex items-center gap-2 origin-center'
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.3 }}
            custom={direction}
          >
            {buttonText}
            {!isLastStep ? (
              <ArrowRightIcon size={16} />
            ) : (
              <CornerDownLeft size={16} />
            )}
          </motion.span>
        </AnimatePresence>
      </p>
    </button>
  )
}

export const StepFooter = () => {
  return (
    <div className='flex justify-between'>
      <StepPicker />
      <NextButton />
    </div>
  )
}
