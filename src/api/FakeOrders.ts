import { Cart } from '../Cart/Cart'
import { Order, Orders } from '../Orders/Orders'

export class FakeOrders implements Orders {

  constructor(
    private readonly fakeDelayInMs = 1000
  ) {}

  checkout(cart: Cart): Promise<Pick<Order, 'orderId'>> {
    return new Promise(
      resolve => setTimeout(() => resolve({ orderId: cart.cartId }), this.fakeDelayInMs)
    )
  }
}
