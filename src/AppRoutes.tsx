import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartActions } from './api/LocalCart'
import { Cart } from './Cart/Cart'
import { CatalogStore } from './Catalog/CatalogStore'
import { ProductStore } from './Products/ProductStore'
const Catalog = React.lazy(() => import('./Catalog/Catalog'))
const CategoryTitle = React.lazy(() => import('./Catalog/CategoryTitle'))
const ListCategory = React.lazy(() => import('./Products/ListCategory'))
const ProductDetails = React.lazy(() => import('./Products/ProductDetails'))
const CartSummary = React.lazy(() => import('./Cart/CartSummary'))
const Confirmation = React.lazy(() => import('./Cart/Confirmation'))

const AppRoutes: React.FC<{
  catalogStore: CatalogStore,
  productStore: ProductStore,
  cart: Cart,
  cartActions: CartActions
}> = ({catalogStore, productStore, cart, cartActions}) =>
  <Routes>
    <Route path={appRoutes.root} element={
      <React.Suspense fallback={<Loading />}>
        <Catalog store={catalogStore} />
      </React.Suspense>
    } />
    <Route path={appRoutes.category()} element={
      <React.Suspense fallback={<Loading />}>
        <CategoryTitle store={catalogStore} />
        <ListCategory store={productStore} />
      </React.Suspense>
    } />
    <Route path={appRoutes.product()} element={
      <React.Suspense fallback={<Loading />}>
        <ProductDetails store={productStore} cartActions={cartActions} />
      </React.Suspense>
    } />
    <Route path={appRoutes.cart()} element={
      <React.Suspense fallback={<Loading />}>
        <CartSummary cart={cart} cartActions={cartActions} />
      </React.Suspense>
    } />
    <Route path={appRoutes.orderConfirmation()} element={
      <React.Suspense fallback={<Loading />}>
        <Confirmation />
      </React.Suspense>
    } />
  </Routes>

export const appRoutes = {
  root: '/',
  category: (categoryId = ':categoryId') => `/categories/${categoryId}`,
  product: (sku = ':sku') => `/products/${sku}`,
  cart: () => `/cart`,
  orderConfirmation: (orderId = ':orderId') => `/confirm/${orderId}`
} as const

const Loading: React.FC = () =>
  <CircularProgress color="primary" className="centered" />

export default AppRoutes
