import { useMemo, useState } from 'react'
import { Cart, emptyCart, withChangedItemQuantity, withItem } from '../Cart/Cart'
import { CartActions } from '../Cart/CartActions'
import { CartEvent } from '../Cart/CartNotifications'
import { LocalStorage } from './LocalStorage'

export const useCart = (
  localStorage: LocalStorage = new LocalStorage()
): {
  cart: Cart,
  cartActions: CartActions,
  cartEvent: CartEvent | undefined
} => {
  const [cart, setCart] = useState(
    localStorage.retrieveRecord<Cart>('cart') ?? emptyCart()
  )
  const [cartEvent, setCartEvent] = useState<CartEvent | undefined>(undefined)

  const saveCart = (cart: Cart, event: CartEvent | undefined = undefined) => {
    localStorage.saveRecord('cart', cart)
    setCart(cart)
    setCartEvent(event)
  }

  const cartActions: CartActions = {
    addItem: (item) => saveCart(withItem(cart, item), { type: 'item-added', item }),
    changeItemQuantity: (item, quantity) => saveCart(withChangedItemQuantity(cart, item, quantity)),
    newCart: () => saveCart(emptyCart())
  }

  return useMemo(() => ({ cart, cartActions, cartEvent }), [cart])
}

