import CreditCard from '@mui/icons-material/CreditCard'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import ContentTitle from '../Layouts/ContentTitle'
import { Orders, useCheckout } from '../Orders/Orders'
import { Cart, hasItems } from './Cart'
import { CartActions } from './CartActions'
import './CartSummary'
import CartTotal from './CartTotal'

const Checkout: React.FC<{
  cart: Cart,
  cartActions: CartActions
  orders: Orders
  showTitle?: boolean
}> = ({ cart, cartActions, orders, showTitle }) => {
  const { checkout, status, data: order } = useCheckout(orders)
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasItems(cart)) navigate(appRoutes.cart())
  }, [cart])

  useEffect(() => {
    if (order && status === 'success') {
      cartActions.newCart()
      navigate(appRoutes.orderConfirmation(order.orderId))
    }
  }, [order])

  return (
    <Stack spacing={4} alignItems="center" className="cart-container">
      {(showTitle ?? true) && <ContentTitle text="Checkout" />}

      <CartTotal cart={cart} prefix="Pay" />

      <div className="action-buttons">
        <LoadingButton
          variant="contained"
          startIcon={<CreditCard />}
          onClick={() => checkout(cart)}
          loading={status !== 'idle'}
        >
          Buy now
        </LoadingButton>
      </div>
    </Stack>
  )
}

export default Checkout
