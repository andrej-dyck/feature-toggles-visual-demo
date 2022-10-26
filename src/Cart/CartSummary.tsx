import { Clear, CreditCard } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartActions } from '../api/LocalCart'
import { appRoutes } from '../AppRoutes'
import ContentTitle from '../Layouts/ContentTitle'
import { formatCurrency } from '../Products/Currency'
import { Product, productImgSrc } from '../Products/ProductStore'
import { Cart, CartItem, hasItems, isValidItemQuantity, itemPrice, totalCount, totalPrice } from './Cart'
import './CartSummary.css'

const CartSummary: React.FC<{
  cart: Cart,
  cartActions: CartActions
}> = ({ cart, cartActions }) => {
  const navigate = useNavigate()

  const count = useMemo(() => totalCount(cart), [cart])
  const cartPrice = useMemo(() => totalPrice(cart), [cart])
  const buyDisabled = !hasItems(cart)

  const handleQuantityChange = (item: CartItem, quantity: number) => {
    cartActions.changeItemQuantity(item, quantity)
  }

  const handleCheckout = () => {
    const orderId = cart.id
    navigate(appRoutes.orderConfirmation(orderId))
    cartActions.newCart()
  }

  return (
    <Stack spacing={4} alignItems="center" className="cart-container">
      <Stack spacing={0} alignItems="center">
        <ContentTitle text="Shopping Cart" />
        <Typography variant="body2" color="textSecondary">
          ({count} {count === 1 ? 'item' : 'items'})
        </Typography>
      </Stack>

      <div className="cart-items-container">
        {hasItems(cart) ? cart.items.map(item => (
          <ItemCard key={item.id} item={item} onQuantityChanged={handleQuantityChange} />)
        ) : <Typography variant="h5" color="textSecondary" className="centered-text">
          Your cart is empty 😥
        </Typography>}
      </div>

      <Typography variant="h6">
        Total: {formatCurrency(cartPrice)}
      </Typography>

      <div className="buy-buttons">
        <Button variant="contained"
                startIcon={<CreditCard />}
                onClick={handleCheckout}
                disabled={buyDisabled}
        >
          Buy now
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
          <LinkToProduct product={item}>
            <Typography variant="body1">{item.title}</Typography>
          </LinkToProduct>
          <Typography variant="body2" color="textSecondary">Size {item.size}</Typography>
        </Stack>
      </CardContent>
      <CardActions className="item-card-actions">
        <QuantityInput quantity={item.quantity} onChange={(q) => onQuantityChanged(item, q)} />
        <Typography variant="body1" color="textSecondary">
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
