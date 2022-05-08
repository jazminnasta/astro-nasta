import React, {useEffect, useState} from 'react';
import ItemCount from '../ItemCount/ItemCount.jsx';
import { Link } from 'react-router-dom';

function ItemDetail({producto}) {
    const [agregados, setAgregados] = useState({});

    function addToCart(cantidad) {
        console.log('agregar '+cantidad+' '+ producto.titulo +' al carrito');
        const nuevoProducto = {cantidad: cantidad, producto: producto}
        setAgregados({[producto.id]: nuevoProducto});
    }

    useEffect(() => console.log(agregados), [agregados]);

    return (
        <div className="container pt-5">
        	<div className="detalle row">
        		<div className="col-12 col-sm-6">
                    <img alt={producto.titulo} src={'../images/'+producto.imagen} />
                </div>
                <div className="col-12 col-sm-6">
                    <h1>{producto.titulo}</h1>
                    <h3>${producto.precio}</h3>
                    <p>{producto.descripcion}</p>
                    <p className="text-muted">Stock: {producto.stock}</p>
                    {Object.keys(agregados).length ? <Link to={`/cart`} className="btn">Comprar</Link> : <ItemCount onAdd={addToCart} stock={producto.stock} initial={1} /> }
                </div>
          	</div>
        </div>
    );
}

export default ItemDetail;