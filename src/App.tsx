import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { FakeCatalogStore } from './api/FakeCategoryStore'
import { FakeOrders } from './api/FakeOrders'
import { FakeProductStore } from './api/FakeProductStore'
import { useCart } from './api/LocalCart'
import './App.css'
import AppRoutes from './AppRoutes'
import CartNotifications from './Cart/CartNotifications'
import Header from './Navigation/Header'

const App: React.FC = () => {
  const catalogStore = new FakeCatalogStore()
  const productStore = new FakeProductStore()
  const orders = new FakeOrders()
  const { cart, cartActions, cartEvent } = useCart()

  return (
    <Providers>
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
const Providers: React.FC<{ children: React.ReactNode }> = ({children}) => (
  <Router>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </Router>
)

export default App
