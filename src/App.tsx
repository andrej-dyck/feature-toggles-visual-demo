import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { FakeCatalogStore } from './api/FakeCategoryStore'
import { FakeProductStore } from './api/FakeProductStore'
import { useCart } from './api/LocalCart'
import './App.css'
import Header from './Navigation/Header'
import AppRoutes from './AppRoutes'

function App() {
  const catalogStore = new FakeCatalogStore()
  const productStore = new FakeProductStore()
  const { cart, cartActions } = useCart()

  return (
    <div className="App">
      <Router>
        <Header cart={cart} />
        <div className="content">
          <AppRoutes
            catalogStore={catalogStore}
            productStore={productStore}
            cart={cart}
            cartActions={cartActions}
          />
        </div>
      </Router>
    </div>
  )
}

export default App
