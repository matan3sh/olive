export interface CartItem {
  productId: string
  title: string
  image: string
  size: string      // selected size label, e.g. "250ml"
  price: number     // numeric unit price (stripped from product.price string)
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }

export interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  isDrawerOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}
