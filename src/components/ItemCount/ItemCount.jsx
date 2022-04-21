import React, { useState, useEffect } from 'react';

function ItemCount({stock, initial, onAdd}) {
	const [cantidad, setCantidad] = useState(initial);

	useEffect(() => {
		setCantidad(cantidad < 1 ? 1 : (cantidad > stock ? stock : cantidad));
	}, [cantidad])

    return (
      	<div className="counter">
	      	<div className="number">
		      	<button disabled={cantidad < 2} onClick={() => setCantidad(cantidad-1)}>-</button>
		      	<input type="number" onChange={(e) => setCantidad(e.target.value <= stock ? e.target.value : stock )} value={cantidad} />
		      	<button disabled={cantidad === stock} onClick={() => setCantidad(cantidad+1)}>+</button>
	      	</div>
	      	<button disabled={cantidad > stock || cantidad < 1} onClick={() => { onAdd(cantidad) }}>Agregar</button>
      	</div>
    );
}

export default ItemCount;