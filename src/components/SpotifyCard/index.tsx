'use server'
import { type PlaybackState, type PlayHistory } from '@spotify/web-api-ts-sdk'
import clsx from 'clsx'
import { Skeleton } from '../Skeleton'
import { ActivityIndicator } from './ActivityIndicator'
import { getTrackDetails } from './utils'

const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center gap-4 bg-[#191919] border border-neutral-800 shadow-md p-4 rounded-md'>
      {children}
    </div>
  )
}

const CardImage = ({ image, alt }: { image: string; alt: string }) => {
  const className = 'size-16 rounded-sm'

  if (!image) {
    return <Skeleton className={className} />
  }

  return (
    <img className={clsx(className, 'opacity-80')} src={image} alt={alt} />
  )
}

const CardLink = ({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) => {
  const className = 'h-4'
  if (!href) {
    return <Skeleton className={clsx(className, 'w-16')} />
  }

  return (
    <a
      className={clsx(className, 'text-base font-bold')}
      href={href}
      target='_blank'
    >
      {children}
    </a>
  )
}
const ArtistName = ({ name }: { name: string }) => {
  const className = 'h-4'
  if (!name) {
    return <Skeleton className={clsx(className, 'w-24')} />
  }

  return (
    <div className={clsx(className, 'text-sm text-gray-500')}>{name}</div>
  )
}

export const SpotifyCard = async ({
  spotifyData
}: {
  spotifyData: PlaybackState | PlayHistory | null
}) => {
  // If the data is a show, return null.
  if (spotifyData && 'show' in spotifyData) {
    return null
  }

  let item: Record<string, any> | null = null

  if (spotifyData) {
    item = getTrackDetails(spotifyData)
  }

  return (
    <CardContainer>
      <CardImage image={item?.album?.images?.[0]?.url} alt={item?.name} />
      <div className='flex flex-col h-full gap-1'>
        <CardLink href={item?.external_urls?.spotify}>{item?.name}</CardLink>
        <ArtistName name={item?.artists?.[0]?.name} />
        <ActivityIndicator
          hasLoaded={item !== null}
          playedAt={item?.played_at}
        />
      </div>
    </CardContainer>
  )
}
