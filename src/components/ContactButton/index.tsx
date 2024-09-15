import { useMeasure } from '@uidotdev/usehooks'
import { delay, motion, type Variants } from 'framer-motion'
import { Send } from 'lucide-react'
import { cursorContent } from '../../store/cursorAtom'

const iconVariants = {
  hover: { rotate: 45, x: '-20%' }
}

const textVariants = {
  hover: { opacity: 1, transition: { delay: 0.15 } }
}

const buttonVariants = {
  initial: {
    '--text-width': '0px'
  },
  hover: (custom: { width: number }) => ({
    '--text-width': custom.width ? `${custom.width}px` : '0px',
    paddingLeft: custom.width ? `${12}px` : '0px',
    paddingRight: custom.width ? `${12}px` : '0px',
    transition: { delay: 0.15 }
  })
} as Variants

export const ContactButton = () => {
  const [ref, { width }] = useMeasure()
  return (
    <motion.button
      className='relative text-neutral-400 bg-neutral-800 p-2 rounded-md grid justify-items-end items-center grid-rows-1 none grid-cols-[var(--text-width)_auto] overflow-hidden min-w-10 min-h-10 origin-bottom'
      whileHover='hover'
      whileFocus='hover'
      custom={{ width }}
      initial='initial'
      variants={buttonVariants}
      whileTap={{ scale: 0.95 }}
      onMouseOver={() => cursorContent.set('Contact me')}
      onMouseLeave={() => cursorContent.set(null)}
    >
      <motion.span
        className='block text-nowrap pr-2'
        initial={{ opacity: 0 }}
        variants={textVariants}
        ref={ref}
      >
        Contact me
      </motion.span>
      <motion.div
        className='origin-center self-center justify-self-center'
        variants={iconVariants}
      >
        <Send className='w-4 h-4' />
      </motion.div>
    </motion.button>
  )
}
