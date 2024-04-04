'use client'

import Image from 'next/image'

import { clsx } from 'clsx'

import avatarImg from '@/images/avatar.png'

import { useIsServer } from '@/hooks/useIsServer'

export const AvatarImage = () => {
  const isServer = useIsServer()

  return (
    <Image
      className={clsx(
        'absolute inset-x-0 bottom-0 z-10 origin-bottom transition-transform',
        !isServer && 'scale-110',
      )}
      src={avatarImg}
      alt='avatar'
      placeholder='blur'
      width={280}
      height={280}
    />
  )
}
