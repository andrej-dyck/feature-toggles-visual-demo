import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import { CartActions } from '../Cart/CartActions'
import { useFeatureToggle } from '../FeatureToggles/FeatureToggles'
import { releaseFlag } from '../FeatureToggles/Flags'
import GridLayout from '../Layouts/GridLayout'
import GridSkeleton from '../Layouts/GridSkeleton'
import { formatCurrency } from './Currency'
import './ListCategory.css'
import { Product, productImgSrc, ProductStore, useProductsInCategory } from './ProductStore'

const ListCategory: React.FC<{
  store: ProductStore
  cartActions: CartActions
}> = ({ store, cartActions }) => {
  const { categoryId } = useParams()
  const { data: products, status } = useProductsInCategory(store, categoryId ?? '')
  const { isActive: addToCartBtnEnabled } = useFeatureToggle(releaseFlag('quick-add-to-cart-button'))

  if (status === 'success' && (products?.length ?? 0) > 0) return (
    <GridLayout>
      {products?.map(p => (
        <ProductCard
          key={p.sku}
          product={p}
          addToCartBtnEnabled={addToCartBtnEnabled}
          cartActions={cartActions}
        />))
      }
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

const ProductCard: React.FC<{
  product: Product,
  addToCartBtnEnabled?: boolean
  cartActions: CartActions
}> = ({ product, addToCartBtnEnabled, cartActions }) => {
  const navigate = useNavigate()

  return (
    <Card elevation={1} className="product-card">
      <CardActionArea onClick={() => navigate(appRoutes.product(product.sku))}>
        <CardMedia
          component="img"
          alt={product.title}
          image={productImgSrc(product).medium()}
          className="card-image"
        />
        <CardContent className="card-content">
          <Typography variant="body2" color="textSecondary">{product.sku}</Typography>
          <Typography variant="body1">{product.title}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-actions">
        <IconButton aria-label="add to favorites" disabled={true}>
          <FavoriteBorderOutlined />
        </IconButton>
        {addToCartBtnEnabled ? (
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => cartActions.addItem({ ...product, size: 'M', quantity: 1 })}
          >
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

export default ListCategory
