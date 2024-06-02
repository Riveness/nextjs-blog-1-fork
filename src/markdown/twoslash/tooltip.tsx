'use client'
import { OverlayArrow } from 'react-aria-components'

import { Tooltip } from '@/components/ui'

export const TwoslashTooltip = props => {
  const { noArrow, children } = props
  return (
    <Tooltip
      placement='bottom left'
      offset={4}
      arrowBoundaryOffset={8}
      className='shiki-twoslash max-w-[80vw] origin-top-left rounded border bg-surface shadow-lg md:max-w-[90ch]'
    >
      {!noArrow && (
        <OverlayArrow>
          <span className='relative block border-[6px] border-transparent border-b-surface before:absolute before:-top-[1.5px] before:left-0 before:-z-10 before:-translate-x-1/2 before:-translate-y-1/2 before:border-[7px] before:border-transparent before:border-b-border before:content-[""]' />
        </OverlayArrow>
      )}
      {children}
    </Tooltip>
  )
}
