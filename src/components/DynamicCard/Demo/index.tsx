import {
  CopyIcon,
  FacebookIcon,
  InstagramIcon,
  ListMusic,
  ShareIcon,
  TwitterIcon
} from 'lucide-react'
import { DynamicCard, DynamicCardLink } from '..'
import { AddToFavorite } from './AddToFavorite'
import { CopyToClipboardButton } from './CopyToClipboardButton'

const buttonClass =
  'bg-slate-100 text-black py-4 px-6 rounded-2xl text-base font-medium flex items-center justify-between w-full'

export const dynamicCardDemoProps = {
  firstPage: '',
  components: [
    {
      component: (
        <div className='flex flex-col gap-4 min-w-72'>
          <AddToFavorite className={buttonClass} />
          <DynamicCardLink className={buttonClass} link='share'>
            Share
            <ShareIcon className='size-5' />
          </DynamicCardLink>
          <DynamicCardLink className={buttonClass} link='credits'>
            View credits
            <ListMusic className='size-5' />
          </DynamicCardLink>
        </div>
      ),
      title: 'Home',
      link: ''
    },
    {
      component: (
        <div className='flex flex-col gap-4 min-w-72'>
          <CopyToClipboardButton
            textToCopy='https://www.google.com'
            className={buttonClass}
          >
            Copy link
            <CopyIcon className='size-5' />
          </CopyToClipboardButton>
          <button className={buttonClass}>
            Facebook
            <FacebookIcon className='size-5' />
          </button>
          <button className={buttonClass}>
            Twitter
            <TwitterIcon className='size-5' />
          </button>
          <button className={buttonClass}>
            Instagram
            <InstagramIcon className='size-5' />
          </button>
        </div>
      ),
      title: 'Share',
      link: 'share'
    },
    {
      component: (
        <div>
          <DynamicCardLink link='credits'>View credits</DynamicCardLink>
        </div>
      ),
      title: 'Credits',
      link: 'credits'
    }
  ]
}

export const DynamicCardDemo = () => {
  return <DynamicCard {...dynamicCardDemoProps} />
}
