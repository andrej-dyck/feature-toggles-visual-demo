import { useMemo, useState } from 'react'
import { Cart, CartItem, emptyCart, withChangedItemQuantity, withItem } from '../Cart/Cart'
import { LocalStorage } from './LocalStorage'

export const useCart = (
  localStorage: LocalStorage = new LocalStorage()
): {
  cart: Cart,
  cartActions: CartActions
} => {
  const [cart, setCart] = useState(
    localStorage.retrieveRecord<Cart>('cart') ?? emptyCart()
  )

  const saveCart = (cart: Cart) => {
    localStorage.saveRecord('cart', cart)
    setCart(cart)
  }

  const cartActions: CartActions = {
    addItem: (item) => saveCart(withItem(cart, item)),
    changeItemQuantity: (item, quantity) => saveCart(withChangedItemQuantity(cart, item, quantity)),
    newCart: () => saveCart(emptyCart())
  }

  return useMemo(() => ({ cart, cartActions }), [cart])
}

export type CartActions = Readonly<{
  addItem: (item: Omit<CartItem, 'id'>) => void
  changeItemQuantity: (item: Pick<CartItem, 'id'>, quantity: number) => void
  newCart: () => void
}>
