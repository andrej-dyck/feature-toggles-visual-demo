import Typography from '@mui/material/Typography'
import React, { useMemo } from 'react'
import { formatCurrency } from '../Products/Currency'
import { Cart, totalPrice } from './Cart'

const CartTotal: React.FC<{ cart: Cart, prefix?: string }> = ({ cart, prefix }) => {
  const cartPrice = useMemo(() => totalPrice(cart), [cart])

  return (
    <Typography variant="h6">
      {prefix} {formatCurrency(cartPrice)}
    </Typography>
  )
}

export default CartTotal
