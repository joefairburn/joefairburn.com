'use client'
import clsx from 'clsx'
import { motion } from 'motion/react'
import Image from 'next/image'
import { Skeleton } from '../Skeleton'
import { ActivityIndicator } from './ActivityIndicator'

const CardImage = ({
  image,
  alt,
  unoptimized = false
}: {
  image: string
  alt: string
  unoptimized?: boolean
}) => {
  const className = 'size-16 rounded-sm'

  if (!image) {
    return <Skeleton className={className} />
  }

  return (
    <Image
      className={clsx('opacity-80 pointer-events-none', className)}
      unoptimized={unoptimized}
      src={image}
      alt={alt}
      width={128}
      height={128}
    />
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
      className={clsx(className, 'text-base font-bold text-nowrap')}
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Open ${children} in new tab`}
      draggable={false}
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

const ErrorDisplay = () => (
  <div className='flex items-center justify-center text-xs text-neutral-500 px-4 h-full w-full'>
    Failed to load Spotify data.
  </div>
)

const SpotifySection = ({
  item
}: {
  item: (Record<string, any> & { error?: false }) | { error: true } | null
}) => {
  if (item && item.error) {
    return <ErrorDisplay />
  }

  return (
    <div className='flex items-center gap-4 px-5 w-full'>
      <div className='flex items-center gap-4 py-2 w-full'>
        <CardImage
          image={item?.album?.images?.[0]?.url}
          alt={item?.name}
          unoptimized={true}
        />
        <div className='flex flex-col h-full gap-1 justify-center'>
          <CardLink href={item?.external_urls?.spotify}>
            {item?.name}
          </CardLink>
          <ArtistName name={item?.artists?.[0]?.name} />
          <ActivityIndicator
            hasLoaded={item !== null && !item.error}
            played_at={item?.played_at}
            activityText={item?.activityText}
          />
        </div>
      </div>
    </div>
  )
}

export const PersonalCard = ({
  spotifyData
}: {
  spotifyData:
    | (Record<string, any> & { error?: false })
    | { error: true }
    | null
}) => {
  if (spotifyData && 'show' in spotifyData) {
    return null
  }

  return (
    <div
      className='bg-black border-neutral-800 shadow-md rounded-xl overflow-hidden h-[96px]'
      role='region'
      aria-label='Spotify Activity'
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='flex items-center h-[96px]'
      >
        <SpotifySection item={spotifyData} />
      </motion.div>
    </div>
  )
}
