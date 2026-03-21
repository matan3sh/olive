'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCart } from '@/lib/cart'
import CartSummary from './CartSummary'
import {
  PageWrapper,
  PageInner,
  PageHeading,
  PageEyebrow,
  PageTitle,
  PageItemCount,
  TwoColumn,
  ColumnHeaders,
  ColHeader,
  PageItemRow,
  PageItemInfo,
  PageItemImageBox,
  PageItemName,
  PageItemSize,
  PageRemoveBtn,
  PageQtyControl,
  PageQtyBtn,
  PageQtyValue,
  PageUnitPrice,
  PageLineTotal,
  ContinueLink,
  SummaryPanel,
  EmptyPage,
  EmptyPageTitle,
  EmptyPageSubtitle,
  GoShopBtn,
} from './CartPage.styles'

export default function CartPage() {
  const t = useTranslations('cart')
  const { items, totalItems, removeItem, updateQuantity } = useCart()

  return (
    <PageWrapper>
      <PageInner>
        <PageHeading>
          <PageEyebrow>The Valley Olive Oil</PageEyebrow>
          <PageTitle>{t('title')}</PageTitle>
          {totalItems > 0 && (
            <PageItemCount>
              {t('itemCount', { count: totalItems })}
            </PageItemCount>
          )}
        </PageHeading>

        {items.length === 0 ? (
          <EmptyPage>
            <EmptyPageTitle>{t('empty.title')}</EmptyPageTitle>
            <EmptyPageSubtitle>{t('empty.subtitle')}</EmptyPageSubtitle>
            <GoShopBtn href="/shop">{t('empty.cta')}</GoShopBtn>
          </EmptyPage>
        ) : (
          <TwoColumn>
            <div>
              <ColumnHeaders>
                <ColHeader>{t('columns.product')}</ColHeader>
                <ColHeader $align="center">{t('columns.quantity')}</ColHeader>
                <ColHeader $align="right">{t('columns.price')}</ColHeader>
                <ColHeader $align="right">{t('columns.total')}</ColHeader>
              </ColumnHeaders>

              {items.map((item) => (
                <PageItemRow key={`${item.productId}-${item.size}`}>
                  <PageItemInfo>
                    <PageItemImageBox>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                          style={{ objectFit: 'contain', padding: '8px' }}
                        />
                      )}
                    </PageItemImageBox>
                    <div>
                      <PageItemName>{item.title}</PageItemName>
                      <PageItemSize>{item.size}</PageItemSize>
                      <PageRemoveBtn
                        onClick={() => removeItem(item.productId, item.size)}
                        aria-label={`${t('item.remove')} ${item.title}`}
                      >
                        {t('item.remove')}
                      </PageRemoveBtn>
                    </div>
                  </PageItemInfo>

                  <PageQtyControl role="group" aria-label={`${t('columns.quantity')} - ${item.title}`}>
                    <PageQtyBtn
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      aria-label={t('qty.decrease')}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </PageQtyBtn>
                    <PageQtyValue aria-live="polite" aria-atomic="true">{item.quantity}</PageQtyValue>
                    <PageQtyBtn
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      aria-label={t('qty.increase')}
                    >
                      +
                    </PageQtyBtn>
                  </PageQtyControl>

                  <PageUnitPrice>₪{item.price.toFixed(0)}</PageUnitPrice>
                  <PageLineTotal>₪{(item.price * item.quantity).toFixed(0)}</PageLineTotal>
                </PageItemRow>
              ))}

              <ContinueLink href="/shop">
                {t('continueShopping')}
              </ContinueLink>
            </div>

            <SummaryPanel>
              <CartSummary showViewCartLink={false} />
            </SummaryPanel>
          </TwoColumn>
        )}
      </PageInner>
    </PageWrapper>
  )
}
