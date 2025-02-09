import clsx from 'clsx'
import { cursorContent } from '../../store/cursorAtom'

const LinkCard = ({ image }: { image?: string }) => {
  return (
    <div className='min-w-56 flex items-center justify-center'>
      {image ? <img src={image} /> : null}
    </div>
  )
}
export const Link = ({
  href,
  children,
  className = '',
  target = '_blank',
  image,
  ...props
}: React.ComponentProps<'a'> & { image?: string }) => {
  const $cursor = cursorContent
  return (
    <a
      href={href}
      target={target}
      className={clsx(className)}
      {...props}
      onMouseEnter={() =>
        $cursor.set({
          content: image ? <LinkCard image={image} /> : null
        })
      }
      onMouseLeave={() => $cursor.set({ content: null })}
    >
      {children}
    </a>
  )
}
