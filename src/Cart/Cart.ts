import { Currency, plus, ZERO } from '../Products/Currency'
import { Product, productPrice } from '../Products/ProductStore'
import { Size } from '../Products/Size'

export type Cart = Readonly<{
  cartId: string
  items: ReadonlyArray<CartItem>
}>

export type CartItem = Product & Readonly<{
  itemId: string
  size: Size
  quantity: number
}>

export const emptyCart = (id = crypto.randomUUID()): Cart => ({ cartId: id, items: [] })

export const hasItems = (cart: Pick<Cart, 'items'>) => cart.items.length > 0

export const withItem = (cart: Cart, item: Omit<CartItem, 'itemId'>): Cart => {
  const existingItem = findExistingItem(cart, item)
  return existingItem
    ? withChangedItemQuantity(cart, existingItem, existingItem.quantity + item.quantity)
    : { ...cart, items: [...cart.items, { ...item, itemId: crypto.randomUUID() }] }
}

const findExistingItem = (cart: Pick<Cart, 'items'>, item: Pick<CartItem, 'sku' | 'size'>) =>
  cart.items.find(i => i.sku === item.sku && i.size === item.size)

export const withChangedItemQuantity = (cart: Cart, item: Pick<CartItem, 'itemId'>, quantity: number) => ({
  ...cart,
  items: quantity > 0
    ? cart.items.map(i => i.itemId === item.itemId ? { ...i, quantity: quantity } : i)
    : cart.items.filter(i => i.itemId !== item.itemId)
})

export const totalPrice = (cart: Pick<Cart, 'items'>): Currency =>
  cart.items.reduce((total, item) => plus(total, itemPrice(item)), ZERO)

export const itemPrice = ({ quantity, price, discount }: CartItem): Currency => ({
  value: quantity * productPrice({ price, discount }).value,
  code: price.code
})

export const isValidItemQuantity = (quantity: number) => Number.isInteger(quantity) && quantity > 0
