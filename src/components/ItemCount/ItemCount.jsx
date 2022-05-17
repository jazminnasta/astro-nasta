import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../../context/CartContext';
import { Link } from 'react-router-dom';

function ItemCount({stock, initial, onAdd, producto}) {
	const [cantidad, setCantidad] = useState(initial);
	const cartCtx = useContext(CartContext);

	useEffect(() => {
		setCantidad(cantidad < 1 ? 1 : (cantidad > stock ? stock : cantidad));
	}, [cantidad, stock]);

	useEffect(() => {
		cartCtx.getQItem(producto.id) !== 0 ? setCantidad(cartCtx.getQItem(producto.id)) : setCantidad(initial);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      	<div className="counter">
	      	<div className="number d-flex align-items-center">
		      	<button className="btn nmb" disabled={cantidad < 2} onClick={() => setCantidad(cantidad-1)}>-</button>
		      	<input id="q" className="" type="number" onChange={(e) => setCantidad(e.target.value <= stock ? e.target.value : stock )} value={cantidad} />
		      	<button className="btn nmb" disabled={cantidad === stock} onClick={() => setCantidad(cantidad+1)}>+</button>
	      	</div>
	      	{ cartCtx.getQItem(producto.id) !== 0 && 
		      	<button className="btn mt-3" disabled={cantidad > stock || cantidad < 1} onClick={() => { onAdd(cantidad, producto, 1)}}>
		      		Modificar cantidad
		      	</button>
		    }
		    { cartCtx.getQItem(producto.id) === 0 && 
		      	<button className="btn mt-3" disabled={cantidad > stock || cantidad < 1} onClick={() => { onAdd(cantidad, producto)}}>
		      		Agregar al carrito
		      	</button>
		    }
		    {cartCtx.isInCart(producto.id) ? <Link to={`/cart`} className="btn mt-3 ms-4 alt">Ver carrito</Link> : '' }
      	</div>
    );
}

export default ItemCount;