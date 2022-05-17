import React, { useState, useEffect } from 'react';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList.jsx';
import { useParams } from 'react-router-dom';
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore';

function ItemListContainer(props) {
	const [productos, setProductos] = useState([]);
	const { id } = useParams();
	const [cargando, setCargando] = useState(true);

	function compare( a, b ) {
	  if ( a.id < b.id ){
	    return -1;
	  }
	  if ( a.id > b.id ){
	    return 1;
	  }
	  return 0;
	}

	useEffect(() => {
		const db = getFirestore();
		const productosDB = collection(db, 'products');
		const q = id ? query(
			productosDB,
			where('categoria', '==', id)
		) : false;

		getDocs(id ? q : productosDB).then((snapshot) => {
			setProductos(snapshot.docs.map(doc => { return { ...doc.data(), id: parseInt(doc.id) } }).sort(compare));
			setCargando(false);
		});
	}, [id]);

	return (
		<div className="row">
			<div className="col-12">
				<div className="alert alert-primary text-center" role="alert">{cargando ? 'CARGANDO...' : id ? id : 'BIENVENIDO A ASTROSHOP'}</div>
				{!productos.length && !cargando ? <p>No hay resultados</p> : <ItemList productos={productos} />}
			</div>
		</div>
	);
}

export default ItemListContainer;