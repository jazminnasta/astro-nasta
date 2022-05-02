import React, { useState, useEffect } from 'react';
import './ItemDetailContainer.css';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import { useParams } from 'react-router-dom';
import { todosLosProductos } from '../../productos.js';

function ItemDetailContainer(props) {
	const [producto, setProducto] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		function getItem() {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					const item = todosLosProductos.find(i => i.id == id);
					resolve(item);
				}, 2000);
			});
		}

		getItem()
		.then(r => {
			setProducto(r);
		}, error => {
			console.log('error: '+error);
		}).catch(err => {
			console.log('catch: '+err);
		})
	}, [id])

	return (
		<div className="row">
			{!producto ? <div className="alert alert-primary text-center" role="alert">CARGANDO...</div> : ''}
			<div className="col-12">
				{producto ? <ItemDetail producto={producto} /> : ''}
			</div>
		</div>
	);
}

export default ItemDetailContainer;