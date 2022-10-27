import { HomeOutlined, Menu as MenuIcon } from '@mui/icons-material'
import { Drawer, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import { Cart } from '../Cart/Cart'
import CartIcon from '../Cart/CartIcon'
import ContentTitle from '../Layouts/ContentTitle'
import './BurgerMenu.css'

const BurgerMenu: React.FC<{ cart: Cart }> = ({ cart }) => {
  const [drawerState, toggleDrawer] = useState<'open' | 'closed'>('closed')

  const location = useLocation()
  useEffect(() => { toggleDrawer('closed') }, [location])

  return (<>
    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => toggleDrawer('open')}>
      <MenuIcon />
    </IconButton>
    <Drawer
      anchor="left"
      open={drawerState === 'open'}
      onClose={() => toggleDrawer('closed')}
    >
      <NavigationMenu items={[
        { title: 'Home', link: appRoutes.root, icon: (<HomeOutlined />) },
        { title: 'Cart', link: appRoutes.cart(), icon: (<CartIcon cart={cart} />) }
      ]} />
    </Drawer>
  </>)
}

const NavigationMenu: React.FC<{
  items: { title: string, link: string, icon?: React.ReactNode }[]
}> = ({ items }) => {
  const navigate = useNavigate()

  return (<>
    <span className="menu-title">
      <ContentTitle text="Navigation" />
    </span>
    <MenuList sx={{ width: 320, maxWidth: '100%' }}>
      {items.map((item, i) => (
        <MenuItem key={i} onClick={() => navigate(item.link)}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText className="menu-text">{item.title}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  </>)
}

export default BurgerMenu
