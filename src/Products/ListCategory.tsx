import { FavoriteBorderOutlined, ShoppingCart } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GridLayout from '../Layouts/GridLayout'
import GridSkeleton from '../Layouts/GridSkeleton'
import './ListCategory.css'
import { formatCurrency } from './Currency'
import { Product, ProductStore, useProductsInCategory } from './ProductStore'

const ListCategory: React.FC<{ store: ProductStore }> = ({ store }) => {
  const { categoryId } = useParams()
  const { data: products, status } = useProductsInCategory(store, categoryId ?? '')

  if (status === 'success' && (products?.length ?? 0) > 0) return (
    <GridLayout>
      {products?.map(p => (<ProductCard key={p.sku} product={p} />))}
    </GridLayout>
  )

  if (status === 'loading') return (
    <GridSkeleton n={6} width={250} height={400} />
  )

  return (
    <Typography variant="h6" color="textSecondary">
      No products found.
    </Typography>
  )
}

const ProductCard: React.FC<{ product: Product, addToCartBtn?: boolean }> = ({ product, addToCartBtn }) => {
  const navigate = useNavigate()

  return (
    <Card elevation={1} className="product-card">
      <CardActionArea onClick={() => navigate(`/product/${product.sku}`)}>
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
      </CardActionArea>
      <CardActions className="card-actions">
        <IconButton aria-label="add to favorites" disabled={true}>
          <FavoriteBorderOutlined />
        </IconButton>
        {addToCartBtn ? (
          <Button variant="contained" startIcon={<ShoppingCart />}>
            {formatCurrency(product.price)}
          </Button>
        ) : (
          <Typography variant="h6" color="textSecondary" className="price-tag">
            {formatCurrency(product.price)}
          </Typography>
        )}
      </CardActions>
    </Card>
  )
}

const productImgSrc = (product: Product) => `/images/products/${product.sku}B.jpg`

export default ListCategory
