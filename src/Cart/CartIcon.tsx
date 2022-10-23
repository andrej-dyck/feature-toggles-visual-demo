import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge, IconButton } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartIcon: React.FC = () => {
  const navigate = useNavigate()
  const cartSize = 0

  return (
    <IconButton edge="end" color="inherit" aria-label="shopping cart" onClick={() => navigate('/cart')}>
      <Badge badgeContent={cartSize} color="secondary">
        <ShoppingCartOutlined />
      </Badge>
    </IconButton>
  )
}

export default CartIcon
