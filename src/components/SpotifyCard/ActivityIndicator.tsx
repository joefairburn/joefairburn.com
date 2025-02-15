import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { Skeleton } from '../Skeleton'

const ActivityContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex items-center gap-2'>{children}</div>
}

export const ActivityIndicator = ({
  hasLoaded,
  playedAt
}: {
  hasLoaded: boolean
  playedAt: string | null
}) => {
  if (!hasLoaded) {
    return (
      <ActivityContainer>
        <Skeleton className='w-32 h-3' />
      </ActivityContainer>
    )
  }
  const isCurrentlyPlaying = playedAt === null

  const dotColor = isCurrentlyPlaying ? 'bg-green-600' : 'bg-gray-600'

  const activityText = isCurrentlyPlaying
    ? 'Currently playing'
    : `played ${formatDistanceToNow(new Date(playedAt), {
        addSuffix: true
      })}`

  return (
    <ActivityContainer>
      <div className={clsx('size-2 rounded-full', dotColor)} />
      <span className='text-xs text-gray-600'>{activityText}</span>
    </ActivityContainer>
  )
}
