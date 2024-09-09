'use client'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { HeartIcon } from './HeartIcon'

export const AddToFavorite = ({ className }: { className: string }) => {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleToggle = () => {
    setIsFavorited(!isFavorited)
  }

  return (
    <button
      type='button'
      className={clsx(
        className,
        'group relative overflow-hidden transition-colors flex items-center gap-2 text-nowrap'
      )}
      onClick={handleToggle}
    >
      <AnimatePresence initial={false} mode='popLayout'>
        <motion.span
          className='origin-bottom'
          key={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        </motion.span>
      </AnimatePresence>
      <HeartIcon className='size-5' active={isFavorited} />
    </button>
  )
}
