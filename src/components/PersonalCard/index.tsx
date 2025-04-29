'use client'
import clsx from 'clsx'
import { motion, useAnimationControls, useMotionValue } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Skeleton } from '../Skeleton'
import { ActivityIndicator } from './ActivityIndicator'

const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
  mass: 0.5
} as const

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

const CarouselSection = ({
  isActive,
  children
}: {
  isActive: boolean
  children: React.ReactNode
}) => {
  return (
    <div
      className={clsx(
        'transition-all duration-300 flex items-center h-[96px]',
        isActive ? 'opacity-100 blur-0' : 'opacity-50 blur-[1px]'
      )}
    >
      {children}
    </div>
  )
}

// Define a simple error display component
const ErrorDisplay = ({ serviceName }: { serviceName: string }) => (
  <div className='flex items-center justify-center text-xs text-neutral-500 px-4 h-full w-full'>
    Failed to load {serviceName} data.
  </div>
)

const SpotifySection = ({
  item
}: {
  item: (Record<string, any> & { error?: false }) | { error: true } | null
}) => {
  // Handle error state
  if (item && item.error) {
    return <ErrorDisplay serviceName='Spotify' />
  }

  // Existing rendering logic (handles null item for loading/skeleton state)
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
            // Pass null if item is null (loading) or error state
            hasLoaded={item !== null && !item.error}
            played_at={item?.played_at}
            activityText={item?.activityText}
          />
        </div>
      </div>
    </div>
  )
}

const GithubSection = ({
  githubData
}: {
  githubData: {
    commits: number
    pullRequests: number
    error?: boolean
  } | null
}) => {
  // Handle error state first
  if (githubData?.error) {
    return <ErrorDisplay serviceName='GitHub' />
  }

  // Handle loading/null state (although parent likely prevents this)
  if (!githubData) {
    // Or return a Skeleton component if preferred
    return null
  }

  // Now we know githubData is not null and not an error
  return (
    <div className='flex items-center gap-4 px-4 w-full'>
      <div className='flex items-center gap-4 py-2 w-full'>
        <CardImage image='/images/joe.jpg' alt='Joe Fairburn' />
        <div className='text-sm text-gray-500'>
          <h3 className='text-white text-base font-bold'>This week:</h3>
          <p>{githubData.commits} commits</p>
          <p>{githubData.pullRequests} pull requests</p>
        </div>
      </div>
    </div>
  )
}

export const PersonalCard = ({
  spotifyData,
  githubData
}: {
  spotifyData:
    | (Record<string, any> & { error?: false })
    | { error: true }
    | null
  githubData: {
    commits: number
    pullRequests: number
    error?: boolean
  } | null
}) => {
  // If the data is a show, return null.
  if (spotifyData && 'show' in spotifyData) {
    return null
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const y = useMotionValue(0)
  const controls = useAnimationControls()

  // Ref for card element to manage focus
  const cardRef = useRef<HTMLDivElement>(null)

  // Change sectionHeight to 96
  const sectionHeight = 96 // Changed from 80

  // Transform y motion value to determine which section is active
  useEffect(() => {
    const unsubscribe = y.onChange((latest) => {
      // Adjust threshold based on new height
      if (latest < -sectionHeight / 2) {
        setActiveIndex(1)
      } else {
        setActiveIndex(0)
      }
    })

    return () => unsubscribe()
  }, [y, sectionHeight]) // Added sectionHeight dependency

  // Handle drag end to snap to the closest section
  const handleDragEnd = () => {
    const targetY = activeIndex === 0 ? 0 : -sectionHeight
    controls.start({
      y: targetY,
      transition: springTransition
    })
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!githubData) return

    if (e.key === 'ArrowUp' && activeIndex > 0) {
      e.preventDefault()
      setActiveIndex(0)
      setHasInteracted(true)
      controls.start({
        y: 0,
        transition: springTransition
      })
    } else if (e.key === 'ArrowDown' && activeIndex < 1) {
      e.preventDefault()
      setActiveIndex(1)
      setHasInteracted(true)
      controls.start({
        y: -sectionHeight,
        transition: springTransition
      })
    }
  }

  // Announce section changes to screen readers
  useEffect(() => {
    if (cardRef.current) {
      // Update ARIA live region for screen readers
      const liveRegion = document.getElementById('section-announce')
      if (liveRegion) {
        liveRegion.textContent = `Now showing ${
          activeIndex === 0 ? 'Spotify' : 'GitHub'
        } information`
      }
    }
  }, [activeIndex])

  return (
    <>
      {/* Hidden announcement for screen readers */}
      <div
        id='section-announce'
        className='sr-only'
        aria-live='polite'
        aria-atomic='true'
      ></div>

      <div
        ref={cardRef}
        className='bg-black border-neutral-800 shadow-md rounded-xl overflow-hidden outline-none focus-visible:ring-1 focus-visible:ring-neutral-400/30 transition-[ring] h-[96px] relative'
        role='region'
        aria-label='Personal Activity Card'
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          drag={githubData ? 'y' : undefined}
          dragConstraints={{ top: -sectionHeight, bottom: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 15 }}
          onDragEnd={handleDragEnd}
          onDragStart={() => setHasInteracted(true)}
          whileDrag={{ cursor: 'grabbing' }}
          style={{ y }}
          animate={controls}
          className={clsx(
            'cursor-grab',
            githubData && 'h-[192px]', // Height needs to be 2 * sectionHeight
            'absolute top-0 left-0 right-0'
          )}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CarouselSection isActive={activeIndex === 0}>
              <SpotifySection item={spotifyData} />
            </CarouselSection>

            {/* Only render GitHub section if data exists (incl. error state) */}
            {githubData !== null && (
              <CarouselSection isActive={activeIndex === 1}>
                <GithubSection githubData={githubData} />
              </CarouselSection>
            )}
          </motion.div>
        </motion.div>

        {/* Instructions positioning */}
        {githubData && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{
              opacity: hasInteracted ? 0 : 1,
              filter: hasInteracted ? 'blur(5px)' : 'blur(0px)'
            }}
            className='text-[10px] text-neutral-600 text-center absolute bottom-1 left-0 right-0 pointer-events-none'
          >
            <span>Swipe down or use arrow keys to interact</span>
          </motion.div>
        )}
      </div>
    </>
  )
}
