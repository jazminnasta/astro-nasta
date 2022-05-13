import React, { useState, useEffect } from 'react';
import './ItemDetailContainer.css';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import { useParams } from 'react-router-dom';
import {doc, getDoc, getFirestore} from 'firebase/firestore';

function ItemDetailContainer(props) {
	const [producto, setProducto] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const db = getFirestore();
		const productoDB = doc(db, 'products', id);

		getDoc(productoDB).then((snapshot) => {
			if(snapshot.exists())
				setProducto({ id: snapshot.id, ...snapshot.data() });
		});
	}, [id]);

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