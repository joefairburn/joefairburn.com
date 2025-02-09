import clsx from 'clsx'
import { cursorContent } from '../../store/cursorAtom'

const LinkCard = ({
  image,
  children
}: {
  image?: string
  children: React.ReactNode
}) => {
  return (
    <div className='min-w-96 flex flex-col justify-center'>
      {image ? <img loading='lazy' src={image} /> : null}
      <span className='text-xs text-neutral-400 text-wrap leading-normal p-4'>
        {children}
      </span>
    </div>
  )
}
export const Link = ({
  href,
  children,
  className = '',
  target = '_blank',
  image,
  description,
  ...props
}: React.ComponentProps<'a'> & { image?: string; description?: string }) => {
  const $cursor = cursorContent
  return (
    <a
      href={href}
      target={target}
      className={clsx(className)}
      {...props}
      onMouseEnter={() =>
        $cursor.set({
          content: image ? (
            <LinkCard image={image}>{description}</LinkCard>
          ) : null,
          className: 'shadow-lg'
        })
      }
      onMouseLeave={() => $cursor.set({ content: null })}
    >
      {children}
    </a>
  )
}
