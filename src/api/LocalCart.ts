import { useEffect, useMemo, useState } from 'react'
import { Cart, CartItem, cartWithItem, emptyCart } from '../Cart/Cart'
import { LocalStorage } from './LocalStorage'

export const useCart = (
  localStorage: LocalStorage = new LocalStorage()
): {
  cart: Cart,
  cartActions: CartActions
} => {
  const [cart, saveCart] = useState(
    localStorage.retrieveRecord<Cart>('cart') ?? emptyCart()
  )

  useEffect(() => () => localStorage.saveRecord('cart', cart), [cart])

  return useMemo(() => ({
    cart,
    cartActions: {
      addItem: (item: CartItem) => saveCart(cartWithItem(cart, item)),
      newCart: () => saveCart(emptyCart())
    }
  }), [cart])
}

export type CartActions = Readonly<{
  addItem: (item: CartItem) => void
  newCart: () => void
}>
