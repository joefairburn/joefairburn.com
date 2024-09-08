'use client'
import { MotionConfig } from 'framer-motion'
import { StepContent, StepFooter, StepHeader, Steps } from './Steps'
import { stepContent } from './fixtures'

const baseDuration = 0.3
const baseConfig = {
  ease: [0.25, 0.1, 0.25, 1],
  duration: baseDuration
}

export const SteppedCard = () => {
  return (
    <MotionConfig
      transition={{
        ...baseConfig,
        filter: {
          ...baseConfig,
          duration: baseDuration / 1.25
        },
        opacity: { duration: baseDuration / 2 }
      }}
      reducedMotion='user'
    >
      <div className='relative w-96 bg-white text-black rounded-lg overflow-hidden shadow-lg'>
        <div className='p-4'>
          <div className='flex flex-col gap-2'>
            <Steps steps={stepContent}>
              <StepHeader />
              <StepContent />
              <StepFooter />
            </Steps>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
