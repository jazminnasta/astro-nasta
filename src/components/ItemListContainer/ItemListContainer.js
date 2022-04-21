import React from 'react';
import './ItemListContainer.css';
import ItemCount from '../ItemCount/ItemCount.jsx';

function ItemListContainer(props) {
	function addToCart(cantidad) {
		console.log('agregar '+cantidad+' al carrito')
	}
	return (
		<div className="row">
			<div className="col-12">
				<div className="alert alert-primary text-center" role="alert">{props.greeting}</div>
				<ItemCount onAdd={addToCart} stock={5} initial={1} />
			</div>
		</div>
	);
}

export default ItemListContainer;