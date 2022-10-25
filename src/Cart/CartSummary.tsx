import { CreditCard } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CartActions } from '../api/LocalCart'
import ContentTitle from '../Layouts/ContentTitle'
import { formatCurrency } from '../Products/Currency'
import { Cart, CartItem, itemPrice, totalPrice, totalCount } from './Cart'
import './CartSummary.css'

const CartSummary: React.FC<{
  cart: Cart,
  cartActions: CartActions
}> = ({ cart, cartActions }) => {
  const navigate = useNavigate()

  const numberOfItems = totalCount(cart)
  const cartPrice = totalPrice(cart)

  const handleCheckout = () => {
    const orderId = cart.id
    navigate(`/confirmation/${orderId}`)
    cartActions.newCart()
  }

  return (
    <div className="Cart">
      <ContentTitle text="Shopping Cart" />
      <Typography variant="body2" color="textSecondary">
        ({numberOfItems} {numberOfItems === 1 ? 'item' : 'items'})
      </Typography>
      <div className="cart-items">
        {cart.items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
      <div className="total">
        <span className="label">Total:</span>
        <span className="amount">
          {formatCurrency(cartPrice)}
        </span>
      </div>
      <div className="buttons">
        <Button variant="contained"
                startIcon={<CreditCard />}
                onClick={handleCheckout}
        >
          Buy now
        </Button>
      </div>
    </div>
  )
}

const ItemCard: React.FC<{ item: CartItem }> = ({item}) =>
  <div>{item.title} - {item.size} - {item.quantity}x - {formatCurrency(itemPrice(item))}</div>

export default CartSummary
