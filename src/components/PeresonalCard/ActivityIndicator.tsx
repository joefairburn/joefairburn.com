'use client'

import clsx from 'clsx'
import { Skeleton } from '../Skeleton'

const ActivityContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex items-center gap-2'>{children}</div>
}

export const ActivityIndicator = ({
  hasLoaded,
  played_at,
  activityText
}: {
  hasLoaded: boolean
  played_at: string | null
  activityText?: string
}) => {
  if (!hasLoaded) {
    return (
      <ActivityContainer>
        <Skeleton className='w-32 h-3' />
      </ActivityContainer>
    )
  }
  const isCurrentlyPlaying = played_at === null

  const dotColor = isCurrentlyPlaying ? 'bg-green-600' : 'bg-gray-600'

  // Fallback text in case activityText is not provided
  const displayText =
    activityText ||
    (isCurrentlyPlaying ? 'Currently playing' : 'Recently played')

  return (
    <ActivityContainer>
      <div className={clsx('size-2 rounded-full', dotColor)} />
      <span className='text-xs text-gray-600'>{displayText}</span>
    </ActivityContainer>
  )
}
