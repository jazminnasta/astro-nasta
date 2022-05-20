import React, { useState, useEffect } from 'react';
import './ItemListContainer.css';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { getProducts } from "../../firebase/firebase.js";

function ItemListContainer(props) {
	const [productos, setProductos] = useState([]);
	const { id } = useParams();
	const [cargando, setCargando] = useState(true);

	function ordenar( a, b ) {
	  if ( a.id < b.id ){
	    return -1;
	  }
	  if ( a.id > b.id ){
	    return 1;
	  }
	  return 0;
	}

	useEffect(() => {
		getProducts(id).then((productos) => {
			if(productos) {
				setProductos(productos.sort(ordenar));
				setCargando(false);
			}
		})
	}, [id]);

	return (
		<div className="row">
			<div className="col-12">
				<div className="alert alert-primary text-center" role="alert">{cargando ? 'CARGANDO...' : id ? id : 'BIENVENIDO A ASTROSHOP'}</div>
				{!productos.length && !cargando ? <p className="text-center">No hay resultados</p> : <ItemList productos={productos} />}
			</div>
		</div>
	);
}

export default ItemListContainer;