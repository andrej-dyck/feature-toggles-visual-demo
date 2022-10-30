import Clear from '@mui/icons-material/Clear'
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import ContentTitle from '../Layouts/ContentTitle'
import { formatCurrency } from '../Products/Currency'
import DiscountBadge from '../Products/DiscountBadge'
import { Product, productImgSrc } from '../Products/ProductStore'
import { Cart, CartItem, hasItems, isValidItemQuantity, itemPrice } from './Cart'
import { CartActions } from './CartActions'
import './CartSummary.css'
import CartTotal from './CartTotal'

const CartSummary: React.FC<{
  cart: Cart
  cartActions: CartActions
  showTitle?: boolean
}> = ({ cart, cartActions, showTitle }) => {
  const navigate = useNavigate()

  const noOfItems = cart.items.length
  const checkoutDisabled = !hasItems(cart)

  const handleQuantityChange = (item: CartItem, quantity: number) => {
    cartActions.changeItemQuantity(item, quantity)
  }

  return (
    <Stack spacing={4} alignItems="center" className="cart-container">
      <Stack spacing={0} alignItems="center">
        {(showTitle ?? true) && <ContentTitle text="Shopping Cart" />}
        <Typography variant="body2" color="text.secondary">
          ({noOfItems} {noOfItems === 1 ? 'item' : 'items'})
        </Typography>
      </Stack>

      <div className="cart-items-container">
        {hasItems(cart) ? cart.items.map(item => (
          <ItemCard key={item.itemId} item={item} onQuantityChanged={handleQuantityChange} />)
        ) : <Typography variant="h5" color="text.secondary" className="centered-text">
          Your cart is empty 😥
        </Typography>}
      </div>

      <CartTotal cart={cart} prefix="Total:" />

      <div className="action-buttons">
        <Button variant="contained"
                startIcon={<ShoppingCartCheckout />}
                onClick={() => navigate(appRoutes.checkout())}
                disabled={checkoutDisabled}
        >
          Checkout
        </Button>
      </div>
    </Stack>
  )
}

const ItemCard: React.FC<{
  item: CartItem,
  onQuantityChanged: (item: CartItem, q: number) => void
}> = ({ item, onQuantityChanged }) => {
  return (
    <Card sx={{ display: 'flex' }} elevation={1} className="item-card">
      <LinkToProduct product={item}>
        <CardMedia
          component="img"
          sx={{ height: 75, width: 75 }}
          image={productImgSrc(item).medium()}
          alt={item.title}
          className="item-card-image"
        />
      </LinkToProduct>
      <CardContent>
        <Stack justifyContent="center" alignItems="flex-start">
          <DiscountBadge product={item} anchor="left">
            <LinkToProduct product={item}>
              <Typography variant="body1">{item.title}</Typography>
            </LinkToProduct>
          </DiscountBadge>
          <Typography variant="body2" color="text.secondary">Size {item.size}</Typography>
        </Stack>
      </CardContent>
      <CardActions className="item-card-actions">
        <QuantityInput quantity={item.quantity} onChange={(q) => onQuantityChanged(item, q)} />
        <Typography variant="body1" color="text.secondary">
          {formatCurrency(itemPrice(item))}
        </Typography>
        <IconButton onClick={() => onQuantityChanged(item, 0)}>
          <Clear />
        </IconButton>
      </CardActions>
    </Card>
  )
}

const LinkToProduct: React.FC<{
  product: Pick<Product, 'sku'>,
  children?: React.ReactNode
}> = ({ product, children }) =>
  <Link to={appRoutes.product(product.sku)}>
    {children}
  </Link>

const QuantityInput: React.FC<{
  quantity: number,
  onChange: (q: number) => void
}> = ({ quantity, onChange }) => {
  const [value, setValue] = useState(quantity)

  return <TextField
    label="Quantity"
    inputProps={{ inputMode: 'numeric', pattern: '[1-9][0-9]*' }}
    value={value}
    onChange={(event) => {
      const q = Number(event.target.value)
      setValue(q)
      if (isValidItemQuantity(q) && q !== quantity) onChange(q)
    }}
    error={!isValidItemQuantity(value)}
    size="small"
    className="quantity-input"
  />
}

export default CartSummary
