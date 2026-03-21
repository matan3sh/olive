'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useCart } from '@/lib/cart'
import {
  SummaryWrapper,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SummaryNote,
  Divider,
  TotalRow,
  TotalLabel,
  TotalValue,
  CheckoutBtn,
  ViewCartBtn,
  SecureNote,
} from './CartSummary.styles'

interface Props {
  showViewCartLink?: boolean
}

export default function CartSummary({ showViewCartLink = false }: Props) {
  const t = useTranslations('cart')
  const locale = useLocale()
  const { subtotal } = useCart()

  return (
    <SummaryWrapper>
      <SummaryRow>
        <SummaryLabel>{t('summary.subtotal')}</SummaryLabel>
        <SummaryValue>₪{subtotal.toFixed(0)}</SummaryValue>
      </SummaryRow>
      <SummaryRow>
        <SummaryLabel>{t('summary.shipping')}</SummaryLabel>
        <SummaryNote>{t('summary.shippingNote')}</SummaryNote>
      </SummaryRow>

      <Divider />

      <TotalRow>
        <TotalLabel>{t('summary.total')}</TotalLabel>
        <TotalValue>₪{subtotal.toFixed(0)}</TotalValue>
      </TotalRow>

      <CheckoutBtn type="button">{t('summary.checkout')}</CheckoutBtn>

      {showViewCartLink && (
        <ViewCartBtn href={`/${locale}/cart`}>{t('summary.viewCart')}</ViewCartBtn>
      )}

      <SecureNote>{t('summary.secure')}</SecureNote>
    </SummaryWrapper>
  )
}
