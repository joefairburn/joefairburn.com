'use client'

import { useRef } from 'react'
import { useCursor } from '../../store/cursorContext'
import { LinkHighlight } from '../Cursor/LinkHighlight'

interface Props {
  href: string
  children: React.ReactNode
  target?: string
  className?: string
  image?: string
  description?: string
}

export const Link = ({
  href,
  children,
  target,
  className,
  image,
  description
}: Props) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const { setContent } = useCursor()

  return (
    <>
      <a
        ref={ref}
        href={href}
        target={target}
        className={className}
        onMouseEnter={() => {
          if (image) {
            setContent({
              content: (
                <div className='flex flex-row gap-4 p-4'>
                  <img
                    src={image}
                    alt={description}
                    className='w-24 h-24 rounded-lg'
                  />
                  <p className='text-sm text-neutral-400 max-w-48'>
                    {description}
                  </p>
                </div>
              ),
              className: 'ml-4'
            })
          }
        }}
        onMouseLeave={() => {
          setContent({ content: null })
        }}
      >
        {children}
      </a>
      <LinkHighlight targetRef={ref} isLink={true} />
    </>
  )
}
