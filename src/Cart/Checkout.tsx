import CreditCard from '@mui/icons-material/CreditCard'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
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
}> = ({ cart, cartActions, orders }) => {
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

  if (status === 'loading') return (
    <Backdrop open={status === 'loading'}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  return (
    <Stack spacing={4} alignItems="center" className="cart-container">
      <ContentTitle text="Checkout" />

      <CartTotal cart={cart} prefix="Pay" />

      <div className="action-buttons">
        <Button
          variant="contained"
          startIcon={<CreditCard />}
          onClick={() => checkout(cart)}
          disabled={status !== 'idle'}
        >
          Buy now
        </Button>
      </div>
    </Stack>
  )
}

export default Checkout
