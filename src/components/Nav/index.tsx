'use client'
import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const baseTransition = {
  type: 'spring',
  mass: 1,
  damping: 10,
  bounce: 10
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' }
]

export const Nav = () => {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const selectedLink = hoveredLink ?? pathname

  return (
    <LayoutGroup>
      <nav className='max-w-2xl mx-auto mb-16 flex gap-4 text-base text-neutral-400 font-light relative'>
        {links.map((link) => (
          <Link
            key={link.href}
            className={clsx(
              'px-2 py-1 relative transition-colors duration-300',
              pathname === link.href && 'text-white'
            )}
            href={link.href}
            onMouseEnter={() => setHoveredLink(link.href)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.label}
            {selectedLink === link.href && (
              <motion.div
                layoutId='hoverBackground'
                className='-z-10 absolute inset-0 bg-amber-200/10 pointer-events-none rounded-md overflow-visible inline-block'
                transition={{
                  type: 'spring',
                  mass: 0.2,
                  damping: 10,
                  stiffness: 75,
                  delay: hoveredLink ? 0.2 : 0
                }}
              />
            )}
          </Link>
        ))}
      </nav>
    </LayoutGroup>
  )
}
