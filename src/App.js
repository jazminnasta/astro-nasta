import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Gracias from './components/Gracias/Gracias';
import Checkout from './components/Checkout/Checkout';
import Historial from './components/Historial/Historial';

import {CartContextProvider} from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <div className="App">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<ItemListContainer />} />
            <Route exact path="/category/:id" element={<ItemListContainer />} />
            <Route exact path="/item/:id" element={<ItemDetailContainer />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/gracias" element={<Gracias />} />
            <Route exact path="/ordenes" element={<Historial />} />
            <Route exact path="/ordenes/:id" element={<Historial />} />
          </Routes>
        </div>  
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
