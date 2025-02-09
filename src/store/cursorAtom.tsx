import { atom, map } from 'nanostores'

export const cursorContent = map<{ content: JSX.Element | null }>({
  content: null
})

export const cursorPosition = atom<{
  x: 'left' | 'right'
  y: 'top' | 'bottom'
}>({ x: 'right', y: 'bottom' })
