import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { FakeCatalogStore } from './api/FakeCategoryStore'
import { FakeProductStore } from './api/FakeProductStore'
import { useCart } from './api/LocalCart'
import './App.css'
import AppRoutes from './AppRoutes'
import Header from './Navigation/Header'

const queryClient = new QueryClient()

function App() {
  const catalogStore = new FakeCatalogStore()
  const productStore = new FakeProductStore()
  const { cart, cartActions } = useCart()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header cart={cart} />
        <div className="app-content">
          <AppRoutes
            catalogStore={catalogStore}
            productStore={productStore}
            cart={cart}
            cartActions={cartActions}
          />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
