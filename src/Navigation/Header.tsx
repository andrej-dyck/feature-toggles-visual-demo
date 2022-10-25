import { AppBar, Avatar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import { Cart } from '../Cart/Cart'
import { LinkedCartIcon } from '../Cart/CartIcon'
import BurgerMenu from './BurgerMenu'
import './Header.css'

const Header: React.FC<{ cart: Cart }> = ({cart}) => (
  <AppBar position="sticky" className="Header">
    <Toolbar>
      <BurgerMenu cart={cart} />
      <Title />
      <div className="spacing"></div>
      <LinkedCartIcon cart={cart} />
    </Toolbar>
  </AppBar>
)

const Title: React.FC = () => (
  <Typography variant="h6">
    <Link to={appRoutes.root} className="title-link">
      <Avatar alt="shop" src="/images/shop-icon-192.png" />
      Shop
    </Link>
  </Typography>
)

export default Header
