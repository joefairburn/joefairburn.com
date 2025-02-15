'use client'

import { motion } from 'motion/react'

export const Caret = () => {
  return (
    <div className='relative w-0'>
      <motion.div
        className='absolute text-2xl font-bold w-0.5 h-full bg-blue-500 animate-blink'
        layoutId={'caret'}
        layout='position'
      />
    </div>
  )
}
