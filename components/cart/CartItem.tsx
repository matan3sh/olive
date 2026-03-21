'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useCart } from '@/lib/cart'
import type { CartItem as CartItemType } from '@/lib/cart'
import {
  ItemRow,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemFooter,
  QtyControl,
  QtyBtn,
  QtyValue,
  ItemPrice,
  RemoveBtn,
} from './CartItem.styles'

interface Props {
  item: CartItemType
}

export default function CartItem({ item }: Props) {
  const t = useTranslations('cart')
  const { removeItem, updateQuantity } = useCart()

  const formattedPrice = `₪${(item.price * item.quantity).toFixed(0)}`

  return (
    <ItemRow>
      <ItemImage>
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="72px"
            style={{ objectFit: 'contain', padding: '8px' }}
          />
        )}
      </ItemImage>

      <ItemDetails>
        <ItemName>{item.title}</ItemName>
        <ItemSize>{item.size}</ItemSize>

        <ItemFooter>
          <QtyControl>
            <QtyBtn
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              aria-label={t('qty.decrease')}
              disabled={item.quantity <= 1}
            >
              −
            </QtyBtn>
            <QtyValue>{item.quantity}</QtyValue>
            <QtyBtn
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              aria-label={t('qty.increase')}
            >
              +
            </QtyBtn>
          </QtyControl>
          <ItemPrice>{formattedPrice}</ItemPrice>
        </ItemFooter>

        <RemoveBtn
          onClick={() => removeItem(item.productId, item.size)}
          aria-label={`${t('item.remove')} ${item.title}`}
        >
          {t('item.remove')}
        </RemoveBtn>
      </ItemDetails>
    </ItemRow>
  )
}
