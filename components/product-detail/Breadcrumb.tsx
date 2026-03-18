'use client'

import { BreadcrumbBar, BreadcrumbCurrent, BreadcrumbLink, BreadcrumbNav } from './Breadcrumb.styles'

interface Props {
  home: string
  shop: string
  current: string
}

export default function Breadcrumb({ home, shop, current }: Props) {
  return (
    <BreadcrumbBar>
      <BreadcrumbNav>
        <BreadcrumbLink href="/">{home}</BreadcrumbLink>
        <span>/</span>
        <BreadcrumbLink href="/shop">{shop}</BreadcrumbLink>
        <span>/</span>
        <BreadcrumbCurrent>{current}</BreadcrumbCurrent>
      </BreadcrumbNav>
    </BreadcrumbBar>
  )
}
