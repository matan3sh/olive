'use client'

import { useContext } from 'react'
import { CartContext } from './cartContext'
import type { CartContextValue } from './types'

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
