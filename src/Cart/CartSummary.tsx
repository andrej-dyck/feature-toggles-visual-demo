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
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartActions } from '../api/LocalCart'
import { appRoutes } from '../AppRoutes'
import ContentTitle from '../Layouts/ContentTitle'
import { formatCurrency } from '../Products/Currency'
import { Product, productImgSrc } from '../Products/ProductStore'
import { Cart, CartItem, itemPrice, totalCount, totalPrice } from './Cart'
import './CartSummary.css'

const CartSummary: React.FC<{
  cart: Cart,
  cartActions: CartActions
}> = ({ cart, cartActions }) => {
  const navigate = useNavigate()

  const count = useMemo(() => totalCount(cart), [cart])
  const cartPrice = useMemo(() => totalPrice(cart), [cart])
  const buyDisabled = count === 0

  const handleCheckout = () => {
    const orderId = cart.id
    navigate(appRoutes.orderConfirmation(orderId))
    cartActions.newCart()
  }

  return (
    <Stack spacing={4} alignItems="center" className="cart-container" >
      <Stack spacing={0} alignItems="center">
        <ContentTitle text="Shopping Cart" />
        <Typography variant="body2" color="textSecondary">
          ({count} {count === 1 ? 'item' : 'items'})
        </Typography>
      </Stack>

      <div className="cart-items-container">
        {cart.items.map((item, i) => (<ItemCard key={i} item={item} />))}
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

const ItemCard: React.FC<{ item: CartItem }> = ({ item }) => {
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
        <QuantityInput quantity={item.quantity} onChange={(q) => console.log(q)} />
        <Typography variant="body1" color="textSecondary">
          {formatCurrency(itemPrice(item))}
        </Typography>
        <IconButton disabled={true}>
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

const QuantityInput: React.FC<{ quantity: number, onChange: (q: number) => void }> = ({quantity, onChange}) =>
  <TextField
    label="Quantity"
    inputProps={{ inputMode: 'numeric', pattern: '[1-9][0-9]*' }}
    defaultValue={quantity}
    onChange={(event) => onChange(Number(event.target.value))}
    size="small"
    disabled={true}
    className="quantity-input"
  />

export default CartSummary
