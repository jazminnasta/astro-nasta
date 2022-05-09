import React, { useState, useEffect } from 'react';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList.jsx';
import { useParams } from 'react-router-dom';
import { todosLosProductos } from '../../productos.js';

function ItemListContainer(props) {
	const [productos, setProductos] = useState([]);
	const { id } = useParams();
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		const fingirServicios = new Promise((resolve, reject) => {
			setCargando(true);
			setTimeout(() => {
				const productosUpdated = id ? todosLosProductos.filter(i => i.categoria === id) : todosLosProductos;
				resolve(productosUpdated);
			}, 1000);
		});
		function traerProducto() {
			return fingirServicios;
		}

		traerProducto()
		.then(r => {
			setProductos(r);
			setCargando(false);
		}, error => {
			console.log('error: '+error);
		}).catch(err => {
			console.log('catch: '+err);
		})
	}, [id])

	return (
		<div className="row">
			<div className="col-12">
				<div className="alert alert-primary text-center" role="alert">{cargando ? 'CARGANDO...' : id ? 'CATEGORÍA '+id : 'SHOP'}</div>
				{!productos.length && !cargando ? <p>No hay resultados</p> : <ItemList productos={productos} />}
			</div>
		</div>
	);
}

export default ItemListContainer;