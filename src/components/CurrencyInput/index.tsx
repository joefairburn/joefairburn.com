'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Value } from './Value'
import { motion, MotionConfig } from 'motion/react'

export const CurrencyInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string | null>(null)

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    const updateCaretPosition = () => {
      // Move caret to end of input
      input.selectionStart = input.value.length
      input.selectionEnd = input.value.length
    }

    input.addEventListener('input', updateCaretPosition)
    input.addEventListener('click', updateCaretPosition)
    input.addEventListener('keyup', updateCaretPosition)

    return () => {
      input.removeEventListener('input', updateCaretPosition)
      input.removeEventListener('click', updateCaretPosition)
      input.removeEventListener('keyup', updateCaretPosition)
    }
  }, [])

  const valueWithoutDecimals = useMemo(() => {
    if (!value) return null
    const numberPart = value.toString().split('.')[0]
    return numberPart
  }, [value])

  const decimal = useMemo(() => {
    const valueAsString = value?.toString()
    if (!valueAsString || !valueAsString.includes('.')) return undefined
    return `.${valueAsString.split('.')[1] ?? ''}`
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get value before the decimals
    const valueAsString = e.target.value
    const startsWithMultipleZeros = valueAsString.startsWith('00')

    const isNumber = /^-?\d+(\.\d{0,2})?$/.test(valueAsString)
    if ((!isNumber && valueAsString !== '') || startsWithMultipleZeros) {
      return
    }

    setValue(e.target.value.trimEnd())
  }

  return (
    <MotionConfig
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1,
        velocity: 10
      }}
    >
      <div
        className='flex flex-col gap-2 w-full'
        role='textbox'
        aria-label='Currency input'
        tabIndex={0}
        onFocus={() => inputRef.current?.focus()}
      >
        <div className='flex'>
          <div
            className='flex items-end text-black dark:text-white text-8xl font-bold'
            style={{
              fontSize: `${
                (valueWithoutDecimals?.length ?? 0) > 6
                  ? Math.max(
                      16,
                      96 /
                        (1 +
                          Math.max(
                            0,
                            (valueWithoutDecimals?.length ?? 0) - 6
                          ) *
                            0.15)
                    )
                  : 96
              }px`
            }}
          >
            <motion.div layout className=''>
              $
            </motion.div>
            <Value value={valueWithoutDecimals} decimal={decimal} />
          </div>
        </div>
        <input
          ref={inputRef}
          className='text-black sr-only'
          value={value ?? ''}
          onChange={handleChange}
        />
      </div>
    </MotionConfig>
  )
}
