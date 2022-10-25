import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge, IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Cart, totalCount } from './Cart'

const CartIcon: React.FC<{ cart: Cart }> = ({ cart }) =>
  <Badge badgeContent={totalCount(cart)} max={100} color="primary">
    <ShoppingCartOutlined />
  </Badge>

export const LinkedCartIcon: React.FC<{ cart: Cart }> = ({ cart }) => {
  const navigate = useNavigate()

  return (
    <IconButton edge="end" color="inherit" aria-label="shopping cart" onClick={() => navigate('/cart')}>
      <CartIcon cart={cart} />
    </IconButton>
  )
}

export default CartIcon
