import { CreditCard } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ContentTitle from '../Layouts/ContentTitle'
import { Currency, formatCurrency } from '../Products/Currency'
import './CartSummary.css'

const CartSummary: React.FC = () => {
  // const { cart } = useContext(CartContext);
  // const cartSize = StoreData.getCartSize(cart);
  const navigate = useNavigate()

  const cartSize = ((): number => 0)()
  const total: Currency = { value: 0, code: 'EUR' }

  const handleCheckout = () => {
    const orderId = crypto.randomUUID()
    navigate(`/confirmation/${orderId}`)
  }

  return (
    <div className="Cart">
      <ContentTitle text="Shopping Cart" />
      <Typography variant="body2" color="textSecondary">
        ({cartSize} {cartSize === 1 ? 'item' : 'items'})
      </Typography>
      <div className="cart-items">
        {/*{cart.map((item, index) => (*/}
        {/*  <CartItem key={index} cartItem={item} />*/}
        {/*))}*/}
      </div>
      <div className="total">
        <span className="label">Total:</span>
        <span className="amount">
          {formatCurrency(total)}
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

export default CartSummary
