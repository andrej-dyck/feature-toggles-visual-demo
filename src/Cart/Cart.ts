import { Currency, plus, ZERO } from '../Products/Currency'
import { Product } from '../Products/ProductStore'
import { Size } from '../Products/Size'

export type Cart = Readonly<{
  id: string
  items: ReadonlyArray<CartItem>
}>

export type CartItem = Product & Readonly<{
  size: Size
  quantity: number
}>

export const emptyCart = (id = crypto.randomUUID()): Cart => ({ id, items: [] })

export const cartWithItem = (cart: Cart, item: CartItem): Cart => ({
  ...cart, items: [...cart.items, item]
})

export const totalCount = (cart: Cart): number =>
  cart.items.reduce((total, item) => total + item.quantity, 0)

export const totalPrice = (cart: Cart): Currency =>
  cart.items.reduce((total, item) => plus(total, item.price), ZERO)

export const itemPrice = ({ quantity, price }: CartItem): Currency => ({
  value: quantity * price.value,
  code: price.code
})
