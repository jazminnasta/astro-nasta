import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.scss';
import NavBar from './components/NavBar/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/Cart/Cart.jsx';
import Gracias from './components/Gracias/Gracias.jsx';
import Checkout from './components/Checkout/Checkout.jsx';
import {CartContextProvider} from './context/CartContext';
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCGapRBPR_4Con0m4XPoX1J_jJup0w_CQE",
    authDomain: "coderhouse-cdc68.firebaseapp.com",
    projectId: "coderhouse-cdc68",
    storageBucket: "coderhouse-cdc68.appspot.com",
    messagingSenderId: "823825424632",
    appId: "1:823825424632:web:ada9833c6a5abe62b55b0d"
  };
  initializeApp(firebaseConfig);

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
          </Routes>
        </div>  
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
