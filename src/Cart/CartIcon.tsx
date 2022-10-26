import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge, IconButton } from '@mui/material'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import { Cart, totalCount } from './Cart'

const CartIcon: React.FC<{ cart: Cart }> = ({ cart }) => {
  const count = useMemo(() => totalCount(cart), [cart])

  return <Badge badgeContent={count} max={100} color="primary">
    <ShoppingCartOutlined />
  </Badge>
}

export const LinkedCartIcon: React.FC<{ cart: Cart }> = ({ cart }) => {
  const navigate = useNavigate()

  return (
    <IconButton edge="end"
                color="inherit"
                aria-label="shopping cart"
                onClick={() => navigate(appRoutes.cart())}>
      <CartIcon cart={cart} />
    </IconButton>
  )
}

export default CartIcon
