import { Suspense } from 'react'
import { GridItem } from '../components/GridItem'
import { PersonalCard } from '../components/PersonalCard'
import { SectionGrid } from '../components/SectionGrid'
import { CurrentlyPlaying } from './CurrentlyPlaying'

export default async function Home() {
  return (
    <main className='max-w-2xl mx-auto mt-[5vh]'>
      <section className='@container w-full'>
        <div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <h1 className='font-display font-medium text-5xl tracking-tight w-fit mb-0'>
                Joe Fairburn
              </h1>
              <p className='font-display font-light text-lg text-neutral-50'>
                Product Engineer
              </p>
            </div>

            {/* About */}
            <SectionGrid title='About'>
              <GridItem className='flex flex-col gap-4'>
                <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                  I'm currently working at Uppbeat, a startup democratising
                  content creation.
                </p>
                <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                  My focus is on creating thoughtful, user-centric
                  experiences, blending interaction design with robust
                  engineering to ship features that feel seamless and
                  purposeful.
                </p>
                <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                  I thrive on turning complex problems into intuitive
                  experiences.
                </p>
              </GridItem>
            </SectionGrid>

            {/* Experience */}
            <SectionGrid title='Experience'>
              <GridItem
                label='2023-Present'
                className='font-normal font-display text-sm text-neutral-300 w-fit'
              >
                <p className='font-normal font-body text-sm text-neutral-300 w-fit'>
                  Uppbeat
                </p>
                <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                  Crafting thoughtful UIs, scaling the product, and building a
                  deeper understanding of users.
                </p>
              </GridItem>

              {/* Moonsworth */}
              <GridItem
                label='2021-Present'
                className='font-normal font-display text-sm text-neutral-300 w-fit'
              >
                <p className='font-normal font-body text-sm text-neutral-300 w-fit'>
                  Moonsworth
                </p>
                <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                  Building Electron based launcher, API's, in-game UI's, and
                  sites such as{' '}
                  <a
                    href='https://wrapped.lunarclient.com'
                    target='_blank'
                    className='underline'
                    rel='noreferrer'
                  >
                    Wrapped
                  </a>{' '}
                  and{' '}
                  <a
                    href='https://www.lunarclient.com'
                    target='_blank'
                    className=' underline'
                    rel='noreferrer'
                  >
                    Lunar Client
                  </a>
                  .
                </p>
              </GridItem>

              {/* Evergreen Energy */}
              <GridItem
                label='2021-2023'
                className='font-normal font-display text-sm text-neutral-300 w-fit'
              >
                <p className='font-normal font-body text-sm text-neutral-300 w-fit'>
                  Evergreen Energy
                </p>
                <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                  Modernised a green energy platform, replacing a legacy PHP
                  system with Next.js.
                </p>
              </GridItem>

              {/* ilk agency */}
              <GridItem
                label='2020-2021'
                className='font-normal font-display text-sm text-neutral-300 w-fit'
              >
                <p className='font-normal font-body text-sm text-neutral-300 w-fit'>
                  ilk agency
                </p>
                <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                  Led the shift to JAMstack architecture using Next.js.
                </p>
              </GridItem>
            </SectionGrid>

            {/* Contact */}
            <SectionGrid title='Contact'>
              <div className='font-normal text-sm text-neutral-300 w-fit row-start-2'>
                <a
                  href='https://github.com/joefairburn'
                  target='_blank'
                  className='font-light underline'
                >
                  GitHub
                </a>

                <a
                  href='https://www.linkedin.com/in/joefairburn/'
                  target='_blank'
                  className='font-light underline'
                >
                  LinkedIn
                </a>
              </div>
            </SectionGrid>
          </div>
        </div>
        <div className='mt-16'>
          <Suspense
            fallback={<PersonalCard spotifyData={null} githubData={null} />}
          >
            <CurrentlyPlaying />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
