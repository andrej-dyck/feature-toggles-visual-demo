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
const Cart = React.lazy(() => import('./Cart/Cart'))

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
            <Route path="/cart" element={
              <React.Suspense fallback={<Loading />}>
                <Cart />
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
