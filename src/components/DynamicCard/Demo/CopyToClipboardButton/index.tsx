'use client'

import { AnimatePresence, motion } from 'motion/react'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export const CopyToClipboardButton = ({
  children,
  textToCopy,
  ...props
}: {
  children: ReactNode
  textToCopy: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <button
      {...props}
      onClick={copyToClipboard}
      className={twMerge(
        props.className,
        'transition-colors duration-100 ease-easy',
        hasCopied && 'bg-green-500 text-white'
      )}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.span
          className='w-full flex justify-between items-center gap-2'
          key={hasCopied ? 'copied-text' : 'copy-text'}
          initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {hasCopied ? 'Copied!' : 'Copy to clipboard'}
          {hasCopied ? (
            <CheckIcon className='size-5 text-white' />
          ) : (
            <CopyIcon className='size-5' />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
