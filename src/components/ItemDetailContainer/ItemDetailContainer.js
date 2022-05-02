import React, { useState, useEffect } from 'react';
import './ItemDetailContainer.css';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';

function ItemDetailContainer(props) {
	const [producto, setProducto] = useState(null);

	useEffect(() => {
		function getItem() {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({id: 1, titulo: 'Póster Aries', precio: 1000, imagen: 'poster_aries.jpeg', stock: 1, descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet mauris at vehicula convallis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec a semper mauris. Sed tincidunt ultricies aliquam. Cras eu dui at nunc molestie eleifend. Sed vitae sagittis libero. Ut non nisl ac nulla tincidunt feugiat mollis nec nisi. Fusce nisl quam, iaculis ac rhoncus ut, maximus sit amet diam.'});
				}, 2000);
			});
		}

		getItem()
		.then(r => {
			console.log(r);
			setProducto(r);
		}, error => {
			console.log('error: '+error);
		}).catch(err => {
			console.log('catch: '+err);
		})
	}, [])

	return (
		<div className="row">
			<div className="col-12">
				{producto ? <ItemDetail producto={producto} /> : <p>CARGANDO...</p>}
			</div>
		</div>
	);
}

export default ItemDetailContainer;