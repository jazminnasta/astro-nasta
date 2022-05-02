import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.scss';
import NavBar from './components/NavBar/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.js';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.js';

function App() {
  const [detalle, setDetalle] = useState(0);
  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    setDetalle(url.get('detalle'));
  }, []);

  return (
    <div className="App">
      <header>
        <NavBar />
        {detalle ? <ItemDetailContainer /> : <ItemListContainer greeting="Hello, World!" />}
      </header>
    </div>
  );
}

export default App;
