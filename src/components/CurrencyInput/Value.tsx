import { useMeasure } from '@uidotdev/usehooks'
import clsx from 'clsx'
import { motion } from 'motion/react'
import { Fragment, useMemo } from 'react'
import { Caret } from './Caret'

interface ValueProps {
  value: string | null
  decimal?: string
}

const getUniqueKey = (
  char: string,
  index: number,
  charactersSplit: string[]
) => {
  const occurrences = charactersSplit
    .slice(0, index)
    .filter((c) => c === char).length
  return `char-${char}-${occurrences}`
}

export const Value = ({ value, decimal }: ValueProps) => {
  const defaultDecimal = Array(3).fill('0')

  const decimalArray = decimal?.split('') ?? []

  const decimalCaretPosition = decimalArray.length

  const [ref, { width }] = useMeasure()

  const characters = useMemo(() => {
    const charactersWithCommas =
      value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? ''

    const charactersSplit = charactersWithCommas.split('') ?? []

    return charactersSplit.map((char, index) => {
      return {
        key: getUniqueKey(char, index, charactersSplit),
        char,
        isComma: char === ','
      }
    })
  }, [value])

  return (
    <motion.div animate={{ width: width ?? 0 }} className='h-full'>
      <div className='w-fit flex h-full' ref={ref}>
        {characters.map(({ key, char, isComma }) => (
          <Fragment key={key}>
            <motion.span
              layoutId={key}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.2, opacity: 0 }}
            >
              {char}
            </motion.span>
          </Fragment>
        ))}
        {decimal &&
          defaultDecimal.map((_, index) => {
            const char = decimalArray[index] ?? null
            return (
              <Fragment key={index}>
                <motion.div
                  layoutId={`decimal-${index}`}
                  layout='position'
                  className={clsx(!char && 'text-gray-600')}
                  initial={{
                    opacity: 0,
                    scale: 0.2,
                    originX: 0,
                    originY: 0.5
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                >
                  {char ?? 0}
                </motion.div>
                {index === decimalCaretPosition - 1 && <Caret />}
              </Fragment>
            )
          })}
        {!decimal && <Caret key={value} />}
      </div>
    </motion.div>
  )
}
