import React from 'react';
import ItemCount from '../ItemCount/ItemCount.jsx';
import './Item.css';

function Item({producto}) {
    function addToCart(cantidad) {
        console.log('agregar '+cantidad+' al carrito')
    }

    return (
      	<li>
            <img src={'images/'+producto.imagen} alt={producto.titulo} />
            <h4>{producto.titulo}</h4>
            <p>${producto.precio}</p>
            <ItemCount onAdd={addToCart} stock={producto.stock} initial={1} /> 
        </li>
    );
}

export default Item;