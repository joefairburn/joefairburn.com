import React from 'react'

interface SectionGridProps {
  title: string
  children: React.ReactNode
}

export const SectionGrid: React.FC<SectionGridProps> = ({
  title,
  children
}) => {
  return (
    <div className='border-t border-neutral-500 pt-4 grid grid-cols-3 gap-4 mt-4'>
      <h2 className='font-display font-light text-lg w-fit mb-0 col-start-1'>
        {title}
      </h2>
      {children}
    </div>
  )
}
