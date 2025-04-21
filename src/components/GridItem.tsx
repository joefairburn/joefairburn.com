import clsx from 'clsx'
import React from 'react'

interface GridItemProps {
  label?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const GridItem: React.FC<GridItemProps> = ({
  label,
  children,
  className
}) => {
  return (
    <>
      {label && <div className='col-start-1'>{label}</div>}
      <div className={clsx('col-span-2', !label && 'col-start-2', className)}>
        {children}
      </div>
    </>
  )
}
