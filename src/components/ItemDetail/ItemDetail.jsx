import React, {useContext} from 'react';
import ItemCount from '../ItemCount/ItemCount.jsx';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

function ItemDetail({producto}) {
    const cartCtx = useContext(CartContext);

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
                    <p className="text-muted fst-italic">Stock: {producto.stock}</p>
                    <ItemCount onAdd={cartCtx.addItem} stock={producto.stock} initial={1} producto={producto} />
                    {cartCtx.isInCart(producto.id) ? <Link to={`/cart`} className="btn mt-2">Ver resumen</Link> : '' }
                </div>
          	</div>
        </div>
    );
}

export default ItemDetail;