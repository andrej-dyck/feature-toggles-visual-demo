import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartActions } from '../Cart/CartActions'
import { formatCurrency } from './Currency'
import './ProductDetails.css'
import { DetailedProduct, Product, productImgSrc, ProductStore, useProduct } from './ProductStore'
import { availableSizes, Size } from './Size'

const ProductDetails: React.FC<{
  store: ProductStore
  cartActions: CartActions
}> = ({ store, cartActions }) => {
  const { sku } = useParams()
  const { data: product, status } = useProduct(store, sku ?? '')

  const addToCart = (p: Product, size: Size, quantity: number) => {
    cartActions.addItem({ ...p, size, quantity })
  }

  if (status === 'success' && !!product) return (
    <ProductLayout
      image={<img src={productImgSrc(product).large()} alt={product.title} />}
      product={<ProductCard product={product} addToCart={addToCart} />}
    />
  )

  if (status === 'loading') return (
    <ProductLayout
      image={<Skeleton variant="rounded" width={400} height={400} />}
      product={<ProductCardSkeleton />}
    />
  )

  return (
    <Typography variant="h6" color="textSecondary">
      Product {sku} not found.
    </Typography>
  )
}

const ProductLayout: React.FC<{ image: React.ReactNode, product: React.ReactNode }> = ({ image, product }) =>
  <Grid container spacing={2} className="product-layout-container">
    <Grid item xs={11} sm={5}>
      <div className="image-container">{image}</div>
    </Grid>
    <Grid item xs={11} sm={6} className="product-info-container">
      <Stack spacing={1}>
        {product}
      </Stack>
    </Grid>
  </Grid>

const ProductCard: React.FC<{
  product: DetailedProduct,
  addToCart: (p: Product, s: Size, q: number) => void
}> = ({ product, addToCart }) => {
  const availableQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

  const [size, chooseSize] = useState<Size>('M')
  const [quantity, chooseQuantity] = useState<number>(1)

  const handleAddToCart = () => {
    addToCart(product, size, quantity)
  }

  return <>
    <div>
      <Typography variant="h5" color="textSecondary" marginBottom={0}>{product.title}</Typography>
      <Typography variant="body2" color="textSecondary">{product.sku}</Typography>
    </div>
    <div className="description">
      <Typography variant="h6">Description</Typography>
      <Typography variant="body2" component="div" color="textSecondary">
        <div dangerouslySetInnerHTML={{ __html: unescapeHtml(product.description) }} />
      </Typography>
    </div>
    <div className="options">
      <OptionsPicker
        label="Size"
        initialValue={size}
        values={availableSizes}
        onChange={s => chooseSize(s as Size)}
      />
      <OptionsPicker
        label="Quantity"
        initialValue={quantity.toString()}
        values={availableQuantities.map(n => n.toString())}
        onChange={n => chooseQuantity(Number(n))}
      />
      <Typography variant="h6" className="price-tag">
        {formatCurrency(product.price)}
      </Typography>
    </div>
    <div className="actions">
      <Button variant="contained" startIcon={<ShoppingCart />} onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  </>
}

const unescapeHtml = (html: string) => {
  const elem = document.createElement('textarea')
  elem.innerHTML = html
  return elem.textContent || ''
}

const OptionsPicker: React.FC<{
  label: string,
  initialValue: string,
  values: ReadonlyArray<string>,
  onChange: (value: string) => void,
}> = ({ label, initialValue, values, onChange }) =>
  <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }} className="form">
    <InputLabel id={`${label}-label`}>{label}</InputLabel>
    <Select
      labelId={`${label}-label`}
      value={initialValue}
      onChange={event => onChange(event.target.value)}
    >
      {values.map((v, i) => (<MenuItem key={i} value={v}>{v}</MenuItem>))}
    </Select>
  </FormControl>

const ProductCardSkeleton: React.FC = () => <>
  <Skeleton variant="rounded" height={30} width="60%" />
  <Skeleton variant="rounded" height={15} width="25%" />
  <Skeleton variant="rounded" height={200} />
  <Skeleton variant="rounded" height={40} width="50%" />
  <Skeleton variant="rounded" height={30} width="25%" />
  <Skeleton variant="rounded" height={40} />
</>

export default ProductDetails
