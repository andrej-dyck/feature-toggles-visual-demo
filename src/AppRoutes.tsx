import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart } from './Cart/Cart'
import { CartActions } from './Cart/CartActions'
import { CatalogStore } from './Catalog/CatalogStore'
import { useFeatureToggle } from './FeatureToggles/FeatureToggles'
import { releaseFlag } from './FeatureToggles/Flags'
import { Orders } from './Orders/Orders'
import { ProductStore } from './Products/ProductStore'

const Catalog = React.lazy(() => import('./Catalog/Catalog'))
const CategoryTitle = React.lazy(() => import('./Catalog/CategoryTitle'))
const ListCategory = React.lazy(() => import('./Products/ListCategory'))
const ProductDetails = React.lazy(() => import('./Products/ProductDetails'))
const CartSummary = React.lazy(() => import('./Cart/CartSummary'))
const Checkout = React.lazy(() => import('./Cart/Checkout'))
const Confirmation = React.lazy(() => import('./Orders/Confirmation'))
const OrderProcessSteps = React.lazy(() => import('./Orders/OrderProcessSteps'))

const AppRoutes: React.FC<{
  catalogStore: CatalogStore
  productStore: ProductStore
  cart: Cart
  cartActions: CartActions
  orders: Orders
}> = ({ catalogStore, productStore, cart, cartActions, orders }) => {
  const { isActive: orderProcessStepsEnabled } = useFeatureToggle(releaseFlag('show-order-process-steps'))

  return (
    <Routes>
      <Route path={appRoutes.root} element={
        <React.Suspense fallback={<Loading />}>
          <Catalog store={catalogStore} />
        </React.Suspense>
      } />
      <Route path={appRoutes.category()} element={
        <React.Suspense fallback={<Loading />}>
          <CategoryTitle store={catalogStore} />
          <ListCategory store={productStore} cartActions={cartActions} />
        </React.Suspense>
      } />
      <Route path={appRoutes.product()} element={
        <React.Suspense fallback={<Loading />}>
          <ProductDetails store={productStore} cartActions={cartActions} />
        </React.Suspense>
      } />
      <Route path={appRoutes.cart()} element={
        <React.Suspense fallback={<Loading />}>
          {orderProcessStepsEnabled && <OrderProcessSteps activeStep={0} />}
          <CartSummary cart={cart} cartActions={cartActions} orders={orders}
                       showTitle={!orderProcessStepsEnabled}
          />
        </React.Suspense>
      } />
      <Route path={appRoutes.checkout()} element={
        <React.Suspense fallback={<Loading />}>
          {orderProcessStepsEnabled && <OrderProcessSteps activeStep={1} />}
          <Checkout cart={cart} cartActions={cartActions} orders={orders}
                    showTitle={!orderProcessStepsEnabled}
          />
        </React.Suspense>
      } />
      <Route path={appRoutes.orderConfirmation()} element={
        <React.Suspense fallback={<Loading />}>
          {orderProcessStepsEnabled && <OrderProcessSteps activeStep={2} />}
          <Confirmation />
        </React.Suspense>
      } />
    </Routes>
  )
}

const basepath = '/feature-toggles-visual-demo'

export const appRoutes = {
  root: `${basepath}/`,
  category: (categoryId = ':categoryId') => `${basepath}/categories/${categoryId}`,
  product: (sku = ':sku') => `${basepath}/products/${sku}`,
  cart: () => `${basepath}/cart`,
  checkout: () => `${basepath}/checkout`,
  orderConfirmation: (orderId = ':orderId') => `${basepath}/confirm/${orderId}`
} as const

export const images = (path: string) => `${basepath}/images/${path}`

const Loading: React.FC = () =>
  <CircularProgress color="primary" className="centered" />

export default AppRoutes
