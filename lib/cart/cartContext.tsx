'use client'

import { createContext, useReducer, useEffect, useMemo } from 'react'
import type { CartState, CartAction, CartItem, CartContextValue } from './types'

const STORAGE_KEY = 'olivum_cart'

const initialState: CartState = { items: [], isDrawerOpen: false }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.size === action.payload.size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.productId && i.size === action.payload.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.productId === action.payload.productId && i.size === action.payload.size)
        ),
      }
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.productId === action.payload.productId && i.size === action.payload.size)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId && i.size === action.payload.size
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true }
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false }
    default:
      return state
  }
}

export const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    if (typeof window === 'undefined') return init
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...init, items: JSON.parse(stored) } : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items])

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      totalItems: state.items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0),
      subtotal: state.items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0),
      isDrawerOpen: state.isDrawerOpen,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
      removeItem: (productId, size) => dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } }),
      updateQuantity: (productId, size, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      openCart: () => dispatch({ type: 'OPEN_DRAWER' }),
      closeCart: () => dispatch({ type: 'CLOSE_DRAWER' }),
    }),
    [state.items, state.isDrawerOpen]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
