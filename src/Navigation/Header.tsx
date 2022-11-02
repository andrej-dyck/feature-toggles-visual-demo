import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'
import { appRoutes, images } from '../AppRoutes'
import { Cart } from '../Cart/Cart'
import { LinkedCartIcon } from '../Cart/CartIcon'
import { FavoritesMenuIcon } from '../Products/Favorites'
import BurgerMenu from './BurgerMenu'
import './Header.css'

const Header: React.FC<{ cart: Cart }> = ({ cart }) => (
  <AppBar position="sticky" className="Header" color="default">
    <Toolbar>
      <BurgerMenu cart={cart} />
      <Title />
      <div className="spacing"></div>
      <Stack direction="row" spacing={2}>
        <FavoritesMenuIcon />
        <LinkedCartIcon cart={cart} />
      </Stack>
    </Toolbar>
  </AppBar>
)

const Title: React.FC = () => (
  <Typography variant="h6">
    <Link to={appRoutes.root} className="title-link">
      <Avatar alt="shop" src={images('shop-icon-192.png')} />
      Shop
    </Link>
  </Typography>
)

export default Header
