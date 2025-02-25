'use client'
import clsx from 'clsx'
import { Skeleton } from '../Skeleton'
import { ActivityIndicator } from './ActivityIndicator'
import { motion } from 'motion/react'
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

const SpotifySection = ({ item }: { item: Record<string, any> | null }) => {
  console.log(item)
  return (
    <div className='flex items-center gap-4 '>
      <CardImage image={item?.album?.images?.[0]?.url} alt={item?.name} />
      <div className='flex flex-col h-full gap-1'>
        <CardLink href={item?.external_urls?.spotify}>{item?.name}</CardLink>
        <ArtistName name={item?.artists?.[0]?.name} />
        <ActivityIndicator
          hasLoaded={item !== null}
          played_at={item?.played_at}
          activityText={item?.activityText}
        />
      </div>
    </div>
  )
}

const GithubSection = ({
  githubData
}: {
  githubData: { commits: number; pullRequests: number } | null
}) => {
  if (!githubData) return null

  return (
    <div className='flex items-center gap-4 '>
      <CardImage image='/images/joe.jpg' alt='Joe Fairburn' />
      <div className='text-sm text-gray-500'>
        Commits: {githubData.commits}, Pull Requests:{' '}
        {githubData.pullRequests}
      </div>
    </div>
  )
}

export const PersonalCard = ({
  spotifyData,
  githubData
}: {
  spotifyData: Record<string, any> | null
  githubData: { commits: number; pullRequests: number } | null
}) => {
  // If the data is a show, return null.
  if (spotifyData && 'show' in spotifyData) {
    return null
  }

  return (
    <div className='bg-[#191919] border border-neutral-800 shadow-md p-4 rounded-md overflow-hidden'>
      <motion.div
        drag='y'
        dragConstraints={{
          top: 0,
          bottom: 0
        }}
        transition={{
          duration: 0.1
        }}
      >
        <SpotifySection item={spotifyData} />
        <GithubSection githubData={githubData} />
      </motion.div>
    </div>
  )
}
