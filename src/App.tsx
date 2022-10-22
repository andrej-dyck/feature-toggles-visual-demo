import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Cart from './Cart/Cart'
import Catalog from './Catalog/Catalog'
import Header from './Header/Header'

function App() {
  return (
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={ <Catalog /> } />
            <Route path="/cart" element={ <Cart /> } />
          </Routes>
        </div>
      </div>
  )
}

export default App
