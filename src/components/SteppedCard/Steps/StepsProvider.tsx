import { createContext, useContext, useState, type ReactNode } from 'react'

type Step = {
  header: ReactNode
  content: ReactNode
  footer: ReactNode
  id: number
}

type StepContextType = {
  steps: Step[]
  currentStepIndex: number
  setCurrentStep: (step: number) => void
  incrementStep: () => void
  decrementStep: () => void
  direction: 'forward' | 'backward'
}

export const StepContext = createContext<StepContextType | undefined>(
  undefined
)

export const useStep = () => {
  const context = useContext(StepContext)
  if (!context) {
    throw new Error('useStep must be used within a StepProvider')
  }
  return context
}

export const StepsProvider = ({
  children,
  steps
}: {
  children: ReactNode
  steps: Step[]
}) => {
  const [step, setStep] = useState<{
    current: number
    direction: 'forward' | 'backward'
  }>({
    current: 0,
    direction: 'forward'
  })

  const incrementStep = () => {
    if (step.current < steps.length - 1) {
      setStep((prev) => ({
        ...prev,
        current: prev.current + 1,
        direction: 'forward'
      }))
    }
  }

  const decrementStep = () => {
    if (step.current > 0) {
      setStep((prev) => ({
        ...prev,
        current: prev.current - 1,
        direction: 'backward'
      }))
    }
  }

  const handleStepChange = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setStep((prev) => ({
        ...prev,
        current: step,
        direction: step > prev.current ? 'forward' : 'backward'
      }))
    }
  }

  return (
    <StepContext.Provider
      value={{
        steps,
        currentStepIndex: step.current,
        direction: step.direction,
        setCurrentStep: handleStepChange,
        incrementStep,
        decrementStep
      }}
    >
      {children}
    </StepContext.Provider>
  )
}
