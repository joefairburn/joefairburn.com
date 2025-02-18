import { Suspense } from 'react'
import { HoverLink } from '../components/HoverLink'
import { SpotifyCard } from '../components/SpotifyCard'
import { CurrentlyPlaying } from './CurrentlyPlaying'

export default async function Home() {
  return (
    <main className='max-w-2xl mx-auto'>
      <section className='@container w-full'>
        <div>
          <div className='flex flex-col gap-4'>
            <h1 className='font-serif font-light text-4xl tracking-tight w-fit'>
              Joe Fairburn
            </h1>
            <p className='font-light text-base text-neutral-400 w-fit'>
              I'm a frontend engineer at{' '}
              <HoverLink
                href='https://uppbeat.io'
                target='_blank'
                className='text-uppbeat font-medium underline'
                image='/images/uppbeat.webp'
                description='Uppbeat makes content creation more accessible, and aims to provide high-quality content for creators, in a way which works for artists.'
              >
                Uppbeat
              </HoverLink>
              .
            </p>
            <p className='font-light text-base text-neutral-400 text-wrap max-w-prose'>
              {/* I like creating experiences that users love. */}
            </p>
          </div>
        </div>
        <Suspense fallback={<SpotifyCard spotifyData={null} />}>
          <CurrentlyPlaying />
        </Suspense>
      </section>
    </main>
  )
}
