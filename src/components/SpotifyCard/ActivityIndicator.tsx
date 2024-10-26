import clsx from 'clsx'

export const ActivityIndicator = ({
  currentlyPlaying,
  children
}: {
  currentlyPlaying: boolean
  children: React.ReactNode
}) => {
  const dotColor = currentlyPlaying ? 'bg-green-600' : 'bg-gray-600'
  return (
    <div className='flex items-center gap-2'>
      <div className={clsx('size-2 rounded-full', dotColor)} />
      <span className='text-xs text-gray-600'>{children}</span>
    </div>
  )
}
