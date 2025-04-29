import { Suspense } from 'react'
import { GridItem } from '../components/GridItem'
import { PersonalCard } from '../components/PersonalCard'
import { SectionGrid } from '../components/SectionGrid'
import { CurrentlyPlaying } from './CurrentlyPlaying'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { ExperienceItem } from '../components/ExperienceItem'

/**
 * Home page component
 */
export default async function Home() {
  return (
    <section className='max-w-2xl mx-auto mt-[5vh]'>
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
                My focus is on creating thoughtful, user-centric experiences,
                blending interaction design with robust engineering to ship
                features that feel seamless and purposeful.
              </p>
              <p className='font-normal font-body text-sm text-neutral-400 w-fit'>
                I thrive on turning complex problems into intuitive
                experiences.
              </p>
            </GridItem>
          </SectionGrid>

          {/* Experience */}
          <SectionGrid title='Experience'>
            <ExperienceItem
              dateRange='2023-Present'
              companyName='Uppbeat'
              description={
                <>
                  Crafting <strong>thoughtful</strong> and{' '}
                  <strong>intuitive</strong> UIs that elevate the experience
                  for content creators. Helped scale our frontend architecture
                  to support millions of monthly active users, ensuring{' '}
                  <strong>performance</strong> and{' '}
                  <strong>reliability</strong>.
                </>
              }
            />

            {/* Moonsworth */}
            <ExperienceItem
              dateRange='2021-Present'
              companyName='Moonsworth'
              description={
                <>
                  Building Electron based launcher, API's, in-game UI's, and
                  sites such as{' '}
                  <a
                    href='https://wrapped.lunarclient.com'
                    target='_blank'
                    className='underline'
                    rel='noreferrer'
                    aria-label='Visit Lunar Client Wrapped'
                  >
                    Wrapped
                  </a>{' '}
                  and{' '}
                  <a
                    href='https://www.lunarclient.com'
                    target='_blank'
                    className=' underline'
                    rel='noreferrer'
                    aria-label='Visit Lunar Client'
                  >
                    Lunar Client
                  </a>
                </>
              }
            />

            {/* Evergreen Energy */}
            <ExperienceItem
              dateRange='2021-2023'
              companyName='Evergreen Energy'
              description='Modernised a green energy platform, replacing a legacy PHP
                system with Next.js.'
            />

            {/* ilk agency */}
            <ExperienceItem
              dateRange='2020-2021'
              companyName='ilk agency'
              description='Developed and maintained a large range of sites using
                Next.js and WordPress as a headless CMS.'
            />
          </SectionGrid>

          {/* Contact */}
          <SectionGrid title='Contact'>
            <div className='font-normal text-sm text-neutral-300 w-fit row-start-2 flex gap-2'>
              <a
                href='https://github.com/joefairburn'
                target='_blank'
                className='font-light underline'
                aria-label='View GitHub profile'
              >
                GitHub
              </a>
              <span className='text-neutral-400' aria-hidden='true'>
                /
              </span>
              <a
                href='https://www.linkedin.com/in/joefairburn/'
                target='_blank'
                className='font-light underline'
                aria-label='View LinkedIn profile'
              >
                LinkedIn
              </a>
            </div>
          </SectionGrid>
        </div>
      </div>
      <div className='mt-16'>
        <ErrorBoundary silent={true}>
          <Suspense
            fallback={<PersonalCard spotifyData={null} githubData={null} />}
          >
            <CurrentlyPlaying />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  )
}
