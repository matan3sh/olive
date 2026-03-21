'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useCart } from '@/lib/cart'
import { Drawer } from '@/components/ui/drawer'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import {
  DrawerInner,
  AddedBanner,
  BannerDot,
  ItemsList,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptySubtitle,
  ShopNowBtn,
} from './CartDrawer.styles'

export default function CartDrawer() {
  const t = useTranslations('cart')
  const locale = useLocale()
  const { items, isDrawerOpen, closeCart, totalItems } = useCart()
  const [showBanner, setShowBanner] = useState(false)
  const prevTotalRef = useRef(totalItems)
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Show banner when item count increases.
  // Do NOT guard on isDrawerOpen — addItem and openCart are batched in the same
  // event handler, so isDrawerOpen may still be false when this effect runs.
  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setShowBanner(true)
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
      bannerTimerRef.current = setTimeout(() => setShowBanner(false), 3000)
    }
    prevTotalRef.current = totalItems
  }, [totalItems])

  // Clear banner when drawer closes
  useEffect(() => {
    if (!isDrawerOpen) {
      setShowBanner(false)
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current)
    }
  }, [isDrawerOpen])

  // RTL: Hebrew slides in from left
  const placement = locale === 'he' ? 'left' : 'right'

  const title = `${t('title')}${totalItems > 0 ? ` (${totalItems})` : ''}`

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={closeCart}
      title={title}
      placement={placement}
      width={420}
    >
      <DrawerInner>
        <AddedBanner $visible={showBanner}>
          <BannerDot />
          {t('added')}
        </AddedBanner>

        {items.length === 0 ? (
          <EmptyState>
            <EmptyIcon>◻</EmptyIcon>
            <EmptyTitle>{t('empty.title')}</EmptyTitle>
            <EmptySubtitle>{t('empty.subtitle')}</EmptySubtitle>
            <ShopNowBtn href={`/${locale}/shop`} onClick={closeCart}>
              {t('empty.cta')}
            </ShopNowBtn>
          </EmptyState>
        ) : (
          <>
            <ItemsList>
              {items.map((item) => (
                <CartItem key={`${item.productId}-${item.size}`} item={item} />
              ))}
            </ItemsList>
            <CartSummary showViewCartLink />
          </>
        )}
      </DrawerInner>
    </Drawer>
  )
}
