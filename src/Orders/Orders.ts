import { useMutation } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { Cart } from '../Cart/Cart'

export interface Orders {
  checkout(cart: Cart): Promise<Pick<Order, 'orderId'>>
}

export type Order = Readonly<{ orderId: string }>

export const useCheckout = (orders: Orders): { checkout: (cart: Cart) => void } & Query<Pick<Order, 'orderId'>> => {
  const { data, status, mutate } = useMutation(
    (cart: Cart) => orders.checkout(cart)
  )

  return {
    checkout: (c) => mutate(c),
    status,
    data,
  }
}
