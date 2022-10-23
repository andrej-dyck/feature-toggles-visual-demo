import { CircularProgress } from '@mui/material'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { FakeCatalogStore } from './Catalog/CatalogStore'
import Header from './Navigation/Header'

const Catalog = React.lazy(() => import('./Catalog/Catalog'))
const Cart = React.lazy(() => import('./Cart/Cart'))

function App() {
  const catalogStore = new FakeCatalogStore()

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
  <CircularProgress color="secondary" />
)

export default App
