import * as Popover from '@radix-ui/react-popover'
import { ToggleLeft } from 'lucide-react'

export const ToggleSetting = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <ToggleLeft />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={5} side='top'>
          test
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
