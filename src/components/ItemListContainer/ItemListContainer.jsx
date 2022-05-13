import React, { useState, useEffect } from 'react';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList.jsx';
import { useParams } from 'react-router-dom';
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore';

function ItemListContainer(props) {
	const [productos, setProductos] = useState([]);
	const { id } = useParams();
	const [cargando, setCargando] = useState(true);

	useEffect(() => {
		const db = getFirestore();
		const productosDB = collection(db, 'products');
		const q = id ? query(
			productosDB,
			where('categoria', '==', id)	
		) : false;

		getDocs(id ? q : productosDB).then((snapshot) => {
			setProductos(snapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } }));
			setCargando(false);
		});

		// getDocs(productosDB).then((snapshot) => {
		// 	const todosLosProductos = snapshot.docs.map(doc => { return { ...doc.data(), id: doc.id } });
		// 	const productosUpdated = id ? todosLosProductos.filter(i => i.categoria === id) : todosLosProductos;

		// 	setProductos(productosUpdated);
		// 	setCargando(false);
		// });
	}, [id]);

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