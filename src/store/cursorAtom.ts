import { atom } from 'nanostores';

export const cursorContent = atom<string | null>('content');

export const cursorPosition = atom<{ x: 'left' | 'right', y: 'top' | 'bottom' }>({ x: 'right', y: 'bottom' })