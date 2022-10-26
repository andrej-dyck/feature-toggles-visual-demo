import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge, IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import { Cart } from './Cart'

const CartIcon: React.FC<{ cart: Cart }> = ({ cart }) =>
  <Badge badgeContent={cart.items.length} max={99} color="primary">
    <ShoppingCartOutlined />
  </Badge>

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
