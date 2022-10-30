import Badge from '@mui/material/Badge'
import React from 'react'
import { hasDiscount, Product } from './ProductStore'

const DiscountBadge: React.FC<{
  product: Pick<Product, 'discount'>
  children: React.ReactElement
  anchor?: 'left' | 'right'
}> = ({ product, children, anchor }) => {
  if (!hasDiscount(product)) return children

  return (
    <Badge
      badgeContent={`-${product.discount?.inPercent} %`}
      anchorOrigin={{ vertical: 'top', horizontal: anchor ?? 'right' }}
      color="success"
    >
      {children}
    </Badge>
  )
}

export default DiscountBadge
