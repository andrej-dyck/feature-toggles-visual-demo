import { FavoriteBorderOutlined, ShoppingCart } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import GridLayout from '../Layouts/GridLayout'
import GridSkeleton from '../Layouts/GridSkeleton'
import { formatPrice } from './formatPrice'
import './ListCategory.css'
import { Product, ProductStore } from './ProductStore'
import { useProductsInCategory } from './useProducts'

const ListCategory: React.FC<{ store: ProductStore }> = ({ store }) => {
  const { categoryId } = useParams()
  const { status, data: products } = useProductsInCategory(store, categoryId ?? '')

  if (status === 'loading') return (
    <GridSkeleton n={6} width={250} height={400} />
  )

  if (status === 'success' && (products?.length ?? 0) > 0) return (
    <GridLayout>
      {products?.map(p => (<ProductCard key={p.sku} product={p} />))}
    </GridLayout>
  )

  return (
    <Typography variant="h6" color="textSecondary">
      No products found.
    </Typography>
  )
}

const ProductCard: React.FC<{ product: Product, addToCartBtn?: boolean }> = ({ product, addToCartBtn }) =>
  <Card elevation={5} className="product-card">
    <CardMedia
      component="img"
      alt={product.title}
      image={productImgSrc(product)}
      className="card-image"
    />
    <CardContent className="card-content">
      <Typography variant="body2" color="textSecondary">{product.sku}</Typography>
      {product.title}
    </CardContent>
    <CardActions className="card-actions">
      <IconButton aria-label="add to favorites" disabled={true}>
        <FavoriteBorderOutlined />
      </IconButton>
      {addToCartBtn ? (
        <Button variant="contained" startIcon={<ShoppingCart />}>
          {formatPrice(product.price)}
        </Button>
      ) : (
        <Typography variant="h6" color="textSecondary">
          {formatPrice(product.price)}
        </Typography>
      )}
    </CardActions>
  </Card>

const productImgSrc = (product: Product) => `/images/products/${product.sku}B.jpg`

export default ListCategory
