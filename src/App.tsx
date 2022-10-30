import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { FakeCatalogStore } from './api/FakeCategoryStore'
import { FakeFeatureTogglesApi } from './api/FakeFeatureTogglesApi'
import { FakeOrders } from './api/FakeOrders'
import { FakeProductStore } from './api/FakeProductStore'
import { useLocalCart } from './api/LocalCart'
import './App.css'
import AppRoutes from './AppRoutes'
import CartNotifications from './Cart/CartNotifications'
import FeatureToggles from './FeatureToggles/FeatureToggles'
import { FeatureTogglesApi } from './FeatureToggles/FeatureTogglesApi'
import Header from './Navigation/Header'

const App: React.FC = () => {
  const featureTogglesApi = new FakeFeatureTogglesApi()
  const catalogStore = new FakeCatalogStore()
  const productStore = new FakeProductStore()
  const orders = new FakeOrders()
  const { cart, cartActions, cartEvent } = useLocalCart()

  return (
    <Providers featureTogglesApi={featureTogglesApi}>
      <Header cart={cart} />
      <div className="app-content">
        <AppRoutes
          catalogStore={catalogStore}
          productStore={productStore}
          cart={cart}
          cartActions={cartActions}
          orders={orders}
        />
      </div>
      <CartNotifications event={cartEvent} />
    </Providers>
  )
}

const queryClient = new QueryClient()

const Providers: React.FC<{
  featureTogglesApi: FeatureTogglesApi
  children: React.ReactNode
}> = ({ featureTogglesApi, children }) => (
  <QueryClientProvider client={queryClient}>
    <FeatureToggles api={featureTogglesApi}>
      <Router>
        {children}
      </Router>
    </FeatureToggles>
  </QueryClientProvider>
)

export default App
