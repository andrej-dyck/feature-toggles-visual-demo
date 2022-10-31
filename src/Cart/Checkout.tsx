import CreditCard from '@mui/icons-material/CreditCard'
import Google from '@mui/icons-material/Google'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import { useFeatureToggle } from '../FeatureToggles/FeatureToggles'
import { opsFlag } from '../FeatureToggles/Flags'
import ContentTitle from '../Layouts/ContentTitle'
import { Orders, useCheckout } from '../Orders/Orders'
import { Cart, hasItems } from './Cart'
import { CartActions } from './CartActions'
import './CartSummary'
import CartTotal from './CartTotal'

const Checkout: React.FC<{
  cart: Cart
  cartActions: CartActions
  orders: Orders
  showTitle?: boolean
}> = ({ cart, cartActions, orders, showTitle }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasItems(cart)) navigate(appRoutes.cart())
  }, [cart])

  return (
    <Stack spacing={4} alignItems="center" className="cart-container">
      {(showTitle ?? true) && <ContentTitle text="Checkout" />}

      <CartTotal cart={cart} prefix="Pay" />

      <Stack className="action-buttons" spacing={1}>
        <GooglePayButton cart={cart} cartActions={cartActions} orders={orders} />
        <BuyNowButton cart={cart} cartActions={cartActions} orders={orders} />
      </Stack>
    </Stack>
  )
}

export const GooglePayButton: React.FC<{ cart: Cart, cartActions: CartActions, orders: Orders }> = (props) => {
  const { isActive } = useFeatureToggle(opsFlag('google-pay-button'))
  return isActive ? <BuyButton{...props} text="Pay" icon={<Google />} color="secondary" /> : <></>
}

const BuyNowButton: React.FC<{ cart: Cart, cartActions: CartActions, orders: Orders }> = (props) =>
  <BuyButton{...props} text="Buy now" icon={<CreditCard />} />

const BuyButton: React.FC<{
  cart: Cart
  cartActions: CartActions
  orders: Orders
  text: string
  icon: React.ReactElement,
  color?: 'primary' | 'secondary'
}> = ({ cart, cartActions, orders, text, icon, color }) => {
  const { checkout, status, data: order } = useCheckout(orders)
  const navigate = useNavigate()

  useEffect(() => {
    if (order && status === 'success') {
      cartActions.newCart()
      navigate(appRoutes.orderConfirmation(order.orderId))
    }
  }, [order])

  return (
    <LoadingButton
      variant="contained"
      startIcon={icon}
      onClick={() => checkout(cart)}
      loading={status !== 'idle'}
      color={color ?? 'primary'}
    >
      {text}
    </LoadingButton>
  )
}

export default Checkout
