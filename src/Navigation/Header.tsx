import { AppBar, Avatar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../Cart/CartIcon'
import BurgerMenu from './BurgerMenu'
import './Header.css'

const Header: React.FC = () => (
  <AppBar position="sticky" className="Header">
    <Toolbar>
      <BurgerMenu />
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

export default Header
