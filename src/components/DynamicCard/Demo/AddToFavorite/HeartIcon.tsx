'use client'

import clsx from 'clsx'
import { motion } from 'motion/react'

export const HeartIcon = ({
  className,
  active
}: {
  className: string
  active: boolean
}) => {
  return (
    <div className='relative'>
      <motion.svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-label='Add to favorites'
        className={clsx(
          className,
          'z-10 fill-none group-hover:fill-red-500 text-red-500 transition-[fill] overflow-visible relative'
        )}
        animate={{
          fill: active ? 'rgb(239, 68, 68)' : 'rgba(239, 68, 68, 0)'
        }}
        transition={{ ease: 'easeOut', duration: 0.1 }}
      >
        <motion.path
          animate={{
            scale: active ? [1, 1.2, 1] : 1
          }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
          d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'
        />
      </motion.svg>
    </div>
  )
}
