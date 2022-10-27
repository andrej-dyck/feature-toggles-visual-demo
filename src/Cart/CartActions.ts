import { CartItem } from './Cart'

export type CartActions = Readonly<{
  addItem: (item: Omit<CartItem, 'itemId'>) => void
  changeItemQuantity: (item: Pick<CartItem, 'itemId'>, quantity: number) => void
  newCart: () => void
}>
