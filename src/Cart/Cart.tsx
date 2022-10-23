import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'
import ContentTitle from '../Layouts/ContentTitle'

const Cart: React.FC = () => {
  // const { cart } = useContext(CartContext);
  // const cartSize = StoreData.getCartSize(cart);
  const cartSize = ((): number => 0)()
  const navigate = useNavigate();

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
          0.00 €
          {/*${cart.reduce((total, cartItem) => total + cartItem.quantity * cartItem.item.price, 0).toFixed(2)}*/}
        </span>
      </div>
      <div className="buttons">
        <Button variant="contained" onClick={() => navigate('/checkout')}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
