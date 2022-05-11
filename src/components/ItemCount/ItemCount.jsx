import React, { useState, useEffect, useContext } from 'react';
import CartContext from '../../context/CartContext';

function ItemCount({stock, initial, onAdd, producto}) {
	const [cantidad, setCantidad] = useState(initial);
	const cartCtx = useContext(CartContext);

	useEffect(() => {
		setCantidad(cantidad < 1 ? 1 : (cantidad > stock ? stock : cantidad));
	}, [cantidad, stock])

    return (
      	<div className="counter">
	      	<div className="number d-flex align-items-center">
		      	<button className="btn nmb" disabled={cantidad < 2} onClick={() => setCantidad(cantidad-1)}>-</button>
		      	<input id="q" className="" type="number" onChange={(e) => setCantidad(e.target.value <= stock ? e.target.value : stock )} value={cantidad} />
		      	<button className="btn nmb" disabled={cantidad === stock} onClick={() => setCantidad(cantidad+1)}>+</button>
	      	</div>
	      	<button className="btn mt-3" disabled={cantidad > stock || cantidad < 1} onClick={() => { onAdd(cantidad, producto) }}>
	      		{cartCtx.isInCart(producto.id) ? 'Agregar más' : 'Agregar al carrito'}
	      	</button>
      	</div>
    );
}

export default ItemCount;