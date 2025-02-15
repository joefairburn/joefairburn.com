import { twMerge } from 'tailwind-merge'

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        'animate-pulse rounded-sm bg-neutral-800 max-w-full',
        className
      )}
      {...props}
    />
  )
}
