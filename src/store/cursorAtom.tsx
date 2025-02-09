import { atom, map } from 'nanostores'

export const cursorContent = map<{
  content: JSX.Element | null
  className?: string
}>({
  content: null,
  className: ''
})

export const cursorPosition = atom<{
  x: 'left' | 'right'
  y: 'top' | 'bottom'
}>({ x: 'right', y: 'bottom' })
