import React from 'react';
import './Item.css';
import { NavLink } from 'react-router-dom';

function Item({producto}) {
    return (
      	<li>
            <NavLink to={'/item/'+producto?.id}>
                <img src={'/images/'+producto.imagen} alt={producto.titulo} />
                <h4>{producto.titulo}</h4>
                <p>${producto.precio}</p>
                <button className="btn mb-3">{producto.stock == 1 ? '1 disponible' : producto.stock+' disponibles'}</button>
            </NavLink>
        </li>
    );
}

export default Item;