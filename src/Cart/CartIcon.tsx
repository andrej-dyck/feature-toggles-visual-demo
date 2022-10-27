import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
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
    <IconButton
      edge="end"
      color="inherit"
      aria-label="shopping cart"
      onClick={() => navigate(appRoutes.cart())}
    >
      <CartIcon cart={cart} />
    </IconButton>
  )
}

export default CartIcon
