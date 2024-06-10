'use client'

import { clsx } from 'clsx'

import Image from 'next/image'

import { useIsServer } from '@/hooks/useIsServer'
import avatarImg from '@/images/avatar.webp'

export const AvatarImage = () => {
  const isServer = useIsServer()

  return (
    <Image
      className={clsx(
        'absolute inset-x-0 bottom-0 z-10 origin-bottom transition-transform',
        !isServer && 'scale-110',
      )}
      priority
      loading='eager'
      src={avatarImg}
      alt='avatar'
      placeholder='empty'
      width={280}
      height={280}
    />
  )
}
