import React from 'react';
import ItemCount from '../ItemCount/ItemCount.jsx';
import './Item.css';
import { NavLink } from 'react-router-dom';

function Item({producto}) {
    function addToCart(cantidad) {
        console.log('agregar '+cantidad+' al carrito')
    }

    return (
      	<li>
            <NavLink to={'/item/'+producto?.id}>
                <img src={'/images/'+producto.imagen} alt={producto.titulo} />
                <h4>{producto.titulo}</h4>
                <p>${producto.precio}</p>
                <button>{producto.stock == 1 ? '1 disponible' : producto.stock+' disponibles'}</button>
                {false ? <ItemCount onAdd={addToCart} stock={producto.stock} initial={1} /> : ''}
            </NavLink>
        </li>
    );
}

export default Item;