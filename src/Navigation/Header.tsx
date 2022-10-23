import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../Cart/CartIcon'
import './Header.css'

const Header: React.FC = () => (
  <AppBar position="sticky" className="Header">
    <Toolbar>
      <Menu />
      <Title />
      <div className="spacing"></div>
      <CartIcon />
    </Toolbar>
  </AppBar>
)

const Title: React.FC = () => (
  <Typography variant="h6">
    <Link to="/" className="title-link">
      <Avatar alt="shop" src="/images/shop-icon-192.png" />
      Shop
    </Link>
  </Typography>
)

const Menu: React.FC = () => (
  <IconButton edge="start" color="inherit" aria-label="menu" disabled={true}>
    <MenuIcon />
  </IconButton>
)

export default Header
