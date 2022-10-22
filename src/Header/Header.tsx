import { Menu as MenuIcon, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Avatar, Badge, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const cartSize = 0

  return (
    <AppBar position="sticky" className="Header">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" disabled={true}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">
          <Link to="/" className="title-link">
            <Avatar alt="shop" src="/images/shop-icon-192.png" />
            Shop
          </Link>
        </Typography>

        <div className="spacing"></div>

        <IconButton edge="end" color="inherit" aria-label="shopping cart" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartSize} color="secondary">
            <ShoppingCartOutlined />
          </Badge>
        </IconButton>

      </Toolbar>
    </AppBar>
  )
}
