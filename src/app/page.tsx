import { Suspense } from 'react'
import { HoverLink } from '../components/HoverLink'
import { PersonalCard } from '../components/PersonalCard'
import { CurrentlyPlaying } from './CurrentlyPlaying'
import { SectionGrid } from '../components/SectionGrid'
import { GridItem } from '../components/GridItem'

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

            <SectionGrid title='About'>
              <GridItem className='flex flex-col gap-4'>
                <p className='font-normal font-body text-base text-neutral-300 w-fit'>
                  I'm currently working at Uppbeat, a startup democratising
                  content creation.
                </p>
                <p className='font-normal font-body text-base text-neutral-300 w-fit'>
                  My focus is on creating thoughtful, user-centric
                  experiences, blending interaction design with robust
                  engineering to ship features that feel seamless and
                  purposeful.
                </p>
                <p className='font-normal font-body text-base text-neutral-300 w-fit'>
                  I thrive on turning complex problems into intuitive
                  experiences.
                </p>
              </GridItem>
              {/* <GridItem>
                <p className='font-light text-base text-neutral-400 text-wrap max-w-prose'>
                  I like creating experiences that users love.
                </p>
              </GridItem> */}
            </SectionGrid>

            <SectionGrid title='Experience'>
              <GridItem
                label={
                  <p className='font-normal font-display text-sm text-neutral-300 w-fit'>
                    2023-Present
                  </p>
                }
              >
                <p className='font-normal font-body text-base text-neutral-300 w-fit'>
                  Uppbeat
                </p>
                <p className='font-normal font-body text-base text-neutral-400 w-fit'>
                  Uppbeat is a platform that allows creators to find and use
                  high-quality content.
                </p>
              </GridItem>

              <GridItem
                label={
                  <p className='font-normal font-display text-sm text-neutral-300 w-fit'>
                    2021-Present
                  </p>
                }
              >
                <p className='font-normal font-body text-base text-neutral-300 w-fit'>
                  Moonsworth
                </p>
                <p className='font-normal font-body text-base text-neutral-400 w-fit'>
                  Building out Electron based launcher, API's, in-game UI's,
                  and various sites.
                </p>
              </GridItem>

              <GridItem
                label={
                  <p className='font-normal font-display text-sm text-neutral-300 w-fit'>
                    2021-2023
                  </p>
                }
              >
                <p className='font-normal font-body text-base text-neutral-300 w-fit'>
                  Evergreen Energy
                </p>
                <p className='font-normal font-body text-base text-neutral-400 w-fit'>
                  Blah blah blah
                </p>
              </GridItem>

              <GridItem
                label={
                  <p className='font-normal font-display text-sm text-neutral-300 w-fit'>
                    2010-2021
                  </p>
                }
              >
                <p className='font-normal font-body text-base text-neutral-300 w-fit'>
                  ilk agency
                </p>
                <p className='font-normal font-body text-base text-neutral-400 w-fit'>
                  Blah blah blah
                </p>
              </GridItem>
            </SectionGrid>

            <SectionGrid title='Contact'>
              <GridItem
                label={
                  <p className='font-normal text-base text-neutral-300 w-fit font-display'>
                    GitHub
                  </p>
                }
              >
                <a
                  href='https://github.com/joefairburn'
                  target='_blank'
                  className='font-light underline'
                >
                  GitHub
                </a>
              </GridItem>

              <GridItem
                label={
                  <p className='font-normal text-base text-neutral-300 w-fit font-display'>
                    LinkedIn
                  </p>
                }
              >
                <a
                  href='https://www.linkedin.com/in/joefairburn/'
                  target='_blank'
                  className='font-light underline'
                >
                  LinkedIn
                </a>
              </GridItem>
            </SectionGrid>
          </div>
        </div>
        <div className='fixed bottom-0 right-0 w-1/4 m-4'>
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
