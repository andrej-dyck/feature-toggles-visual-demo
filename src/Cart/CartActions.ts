import { CartItem } from './Cart'

export type CartActions = Readonly<{
  addItem: (item: Omit<CartItem, 'id'>) => void
  changeItemQuantity: (item: Pick<CartItem, 'id'>, quantity: number) => void
  newCart: () => void
}>
