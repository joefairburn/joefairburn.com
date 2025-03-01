'use client'
import clsx from 'clsx'
import { motion, useAnimationControls, useMotionValue } from 'motion/react'
import { useEffect, useState } from 'react'
import { Skeleton } from '../Skeleton'
import { ActivityIndicator } from './ActivityIndicator'

const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
  mass: 0.5
} as const

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
      className={clsx(className, 'text-base font-bold text-nowrap')}
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

const CarouselSection = ({
  isActive,
  children
}: {
  isActive: boolean
  children: React.ReactNode
}) => {
  return (
    <div
      className={`transition-all duration-300 h-[80px] flex items-center origin-left ${
        isActive ? 'opacity-100 blur-0' : 'opacity-50 blur-[1px]'
      }`}
    >
      {children}
    </div>
  )
}

const SpotifySection = ({ item }: { item: Record<string, any> | null }) => {
  console.log(item)
  return (
    <div className='flex items-center gap-4'>
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
    <div className='flex items-center gap-4'>
      <CardImage image='/images/joe.jpg' alt='Joe Fairburn' />
      <div className='text-sm text-gray-500'>
        <h3 className='text-white text-base font-bold'>This week:</h3>
        <p>{githubData.commits} commits</p>
        <p>{githubData.pullRequests} pull requests</p>
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

  const [activeIndex, setActiveIndex] = useState(0)
  const y = useMotionValue(0)
  const controls = useAnimationControls()

  // Calculate the height of each section (assuming both sections have the same height)
  const sectionHeight = 80 // Minimum height of each section

  // Transform y motion value to determine which section is active
  useEffect(() => {
    const unsubscribe = y.onChange((latest) => {
      if (latest < -sectionHeight / 2) {
        setActiveIndex(1)
      } else {
        setActiveIndex(0)
      }
    })

    return () => unsubscribe()
  }, [y])

  // Handle drag end to snap to the closest section
  const handleDragEnd = () => {
    const targetY = activeIndex === 0 ? 0 : -sectionHeight
    controls.start({
      y: targetY,
      transition: springTransition
    })
  }

  // Handle keyboard navigation only when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!githubData) return

    if (e.key === 'ArrowUp' && activeIndex > 0) {
      setActiveIndex(0)
      controls.start({
        y: 0,
        transition: springTransition
      })
    } else if (e.key === 'ArrowDown' && activeIndex < 1) {
      setActiveIndex(1)
      controls.start({
        y: -sectionHeight,
        transition: springTransition
      })
    }
  }

  return (
    <div
      className='bg-[#191919] border border-neutral-800 shadow-md p-4 rounded-md overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-neutral-400/30 transition-[ring]'
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className='relative h-[80px] overflow-hidden'>
        <motion.div
          drag='y'
          dragConstraints={{
            top: githubData ? -sectionHeight : 0,
            bottom: 0
          }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ y }}
          className='cursor-grab active:cursor-grabbing'
        >
          <CarouselSection isActive={activeIndex === 0}>
            <SpotifySection item={spotifyData} />
          </CarouselSection>

          {githubData && (
            <CarouselSection isActive={activeIndex === 1}>
              <GithubSection githubData={githubData} />
            </CarouselSection>
          )}
        </motion.div>

        {/* Indicator dots */}
        {githubData && (
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1'>
            <div
              className={`h-1 w-1 rounded-full transition-all duration-300 ${
                activeIndex === 0 ? 'bg-white w-2' : 'bg-gray-500'
              }`}
            />
            <div
              className={`h-1 w-1 rounded-full transition-all duration-300 ${
                activeIndex === 1 ? 'bg-white w-2' : 'bg-gray-500'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  )
}
