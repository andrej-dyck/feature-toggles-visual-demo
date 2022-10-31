import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
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
import DiscountBadge from './DiscountBadge'
import { FavoriteProductIcon } from './Favorites'
import './ListCategory.css'
import { hasDiscount, Product, productImgSrc, productPrice, ProductStore, useProductsInCategory } from './ProductStore'

const ListCategory: React.FC<{
  store: ProductStore
  cartActions: CartActions
}> = ({ store, cartActions }) => {
  const { categoryId } = useParams()
  const { data: products, status } = useProductsInCategory(store, categoryId ?? '')

  if (status === 'success' && (products?.length ?? 0) > 0) return (
    <GridLayout>
      {products?.map(p => (
        <ProductCard
          key={p.sku}
          product={p}
          cartActions={cartActions}
        />))
      }
    </GridLayout>
  )

  if (status === 'loading') return (
    <GridSkeleton n={6} width={250} height={400} />
  )

  return (
    <Typography variant="h6" color="text.secondary">
      No products found.
    </Typography>
  )
}

const ProductCard: React.FC<{
  product: Product,
  addToCartBtnEnabled?: boolean
  cartActions: CartActions
}> = ({ product, cartActions }) => {
  const { isActive: addToCartBtnEnabled } = useFeatureToggle(releaseFlag('quick-add-to-cart-button'))

  const navigate = useNavigate()
  const price = productPrice(product)

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
          <Typography variant="body2" color="text.secondary">{product.sku}</Typography>
          <Typography variant="body1">{product.title}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-actions">
        <FavoriteProductIcon />
        <DiscountBadge product={product} anchor="left">
          {addToCartBtnEnabled ? (
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={() => cartActions.addItem({ ...product, size: 'M', quantity: 1 })}
              color={hasDiscount(product) ? 'warning' : 'primary'}
            >
              {formatCurrency(price)}
            </Button>
          ) : (
            <Typography
              variant="h6"
              color={hasDiscount(product) ? 'text.primary' : 'text.secondary'}
              className="price-tag"
            >
              {formatCurrency(price)}
            </Typography>
          )}
        </DiscountBadge>
      </CardActions>
    </Card>
  )
}

export default ListCategory
