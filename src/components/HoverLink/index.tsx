'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useCursor } from '../../store/cursorContext'

interface Props {
  href: string
  children: React.ReactNode
  target?: string
  className?: string
  image?: string
  description?: string
}

export const HoverLink = ({
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
                <div className='flex flex-col min-w-80'>
                  <Image
                    src={image}
                    alt={description ?? ''}
                    className='w-full h-full object-cover'
                    width={893}
                    height={476}
                  />
                  <p className='text-xs text-neutral-400 w-full text-wrap p-4'>
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
    </>
  )
}
