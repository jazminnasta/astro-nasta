import React, { useState, useEffect } from 'react';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList.jsx';

function ItemListContainer(props) {
	const [productos, setProductos] = useState([]);

	useEffect(() => {
		const fingirServicios = new Promise((resolve, reject) => {
			setTimeout(() => {
				const productosUpdated = [
					{id: 1, titulo: 'Póster Aries', precio: 1000, imagen: 'poster_aries.jpeg', stock: 1},
					{id: 2, titulo: 'Póster Tauro', precio: 1000, imagen: 'poster_tauro.jpeg', stock: 2},
					{id: 3, titulo: 'Póster Géminis', precio: 1000, imagen: 'poster_geminis.jpeg', stock: 3}
				];
				resolve(productosUpdated);
			}, 500);
		});
		function traerProducto() {
			return fingirServicios;
		}

		traerProducto()
		.then(r => {
			setProductos(r);
		}, error => {
			console.log('error: '+error);
		}).catch(err => {
			console.log('catch: '+err);
		})
	}, [])

	return (
		<div className="row">
			<div className="col-12">
				<div className="alert alert-primary text-center" role="alert">{props.greeting}</div>
				<ItemList productos={productos} />
			</div>
		</div>
	);
}

export default ItemListContainer;