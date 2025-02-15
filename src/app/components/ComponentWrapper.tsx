'use client'

interface Props {
  title: string
  description: string
  technologies: string[]
  children: React.ReactNode
}

export function ComponentWrapper({
  title,
  description,
  technologies,
  children
}: Props) {
  return (
    <div className='bg-neutral-900 rounded-2xl overflow-hidden w-full'>
      <div className='flex flex-col gap-2 p-4'>
        <div className='flex flex-row justify-between flex-wrap gap-2'>
          <h2 className='font-medium text-base'>{title}</h2>
          <ul className='flex flex-row gap-2'>
            {technologies.map((tech) => (
              <li
                key={tech}
                className='font-light text-xs bg-neutral-800 text-neutral-400 rounded-full px-2 py-1'
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <p className='font-light text-sm text-neutral-400'>{description}</p>
      </div>

      <div className='relative overflow-hidden flex flex-row justify-center items-center bg-neutral-900 rounded-none mt-4 p-4'>
        {children}
      </div>
    </div>
  )
}
