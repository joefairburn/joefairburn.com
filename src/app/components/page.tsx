import { DynamicCardDemo } from '../../components/DynamicCard/Demo'
import { SteppedCard } from '../../components/SteppedCard'
import { Toolbar } from '../../components/Toolbar'
import { VoiceWave } from '../../components/VoiceWave'
import { ComponentWrapper } from './ComponentWrapper'

export default function Components() {
  return (
    <main className='flex flex-col xl:flex-row items-start justify-between min-h-screen max-w-2xl mx-auto'>
      <section className='@container w-full'>
        <div className='flex flex-col w-full gap-4 items-start justify-start flex-grow @4xl:flex-row'>
          <div className='flex flex-col gap-4'>
            <ComponentWrapper
              title='Voice Wave'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien. Sed ut purus eget sapien. Sed ut purus eget sapien.'
              technologies={['React', 'TypeScript', 'Tailwind CSS']}
            >
              <div className='w-full min-h-24 flex items-center justify-center'>
                <VoiceWave />
              </div>
            </ComponentWrapper>
          </div>
          <div className='flex flex-col gap-4'>
            <ComponentWrapper
              title='Toolbar'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien. Sed ut purus eget sapien. Sed ut purus eget sapien.'
              technologies={['React', 'TypeScript', 'Tailwind CSS']}
            >
              <div className='relative w-full min-h-96 flex items-center justify-center'>
                <Toolbar />
              </div>
            </ComponentWrapper>
          </div>
        </div>
      </section>
    </main>
  )
}
