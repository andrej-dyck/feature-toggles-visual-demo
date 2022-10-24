import { CircularProgress } from '@mui/material'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { FakeCatalogStore } from './api/FakeCategoryStore'
import { FakeProductStore } from './api/FakeProductStore'
import './App.css'
import Header from './Navigation/Header'

const Catalog = React.lazy(() => import('./Catalog/Catalog'))
const CategoryTitle = React.lazy(() => import('./Catalog/CategoryTitle'))
const ListCategory = React.lazy(() => import('./Products/ListCategory'))
const ProductDetails = React.lazy(() => import('./Products/ProductDetails'))
const CartSummary = React.lazy(() => import('./Cart/CartSummary'))
const Confirmation = React.lazy(() => import('./Cart/Confirmation'))

function App() {
  const catalogStore = new FakeCatalogStore()
  const productStore = new FakeProductStore()

  return (
    <div className="App">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={
              <React.Suspense fallback={<Loading />}>
                <Catalog store={catalogStore} />
              </React.Suspense>
            } />
            <Route path="/list/:categoryId" element={
              <React.Suspense fallback={<Loading />}>
                <CategoryTitle store={catalogStore} />
                <ListCategory store={productStore} />
              </React.Suspense>
            } />
            <Route path="/product/:sku" element={
              <React.Suspense fallback={<Loading />}>
                <ProductDetails store={productStore} />
              </React.Suspense>
            } />
            <Route path="/cart" element={
              <React.Suspense fallback={<Loading />}>
                <CartSummary />
              </React.Suspense>
            } />
            <Route path="/confirmation/:orderId" element={
              <React.Suspense fallback={<Loading />}>
                <Confirmation />
              </React.Suspense>
            } />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

const Loading: React.FC = () => (
  <CircularProgress color="secondary" className="centered" />
)

export default App
