import React, { useState, useEffect } from 'react';
import './ItemDetailContainer.css';
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { getProduct } from "../../firebase/firebase.js";
import { Link } from 'react-router-dom';

function ItemDetailContainer(props) {
	const [producto, setProducto] = useState(null);
	const [error, setError] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		getProduct(id).then((producto) => {
			if(producto)
				setProducto(producto);
			else
				setError(true);
		})
	}, [id]);

	return (
		<div className="row">
			{!producto && !error ? <div className="alert alert-primary text-center" role="alert">CARGANDO...</div> : ''}
			{ !producto && error &&
				<>
					<div className="alert alert-primary text-center" role="alert">EL PRODUCTO NO EXISTE</div>
					<div className="row">
						<div className="col-12 text-center">
							<Link to={`/`} className="btn mt-2">Volver a productos</Link>
						</div>
					</div>
				</>
			}
			<div className="col-12">
				{producto ? <ItemDetail producto={producto} /> : ''}
			</div>
		</div>
	);
}

export default ItemDetailContainer;