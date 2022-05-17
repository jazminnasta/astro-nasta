import React, {useContext, useEffect, useState} from 'react';
import CartContext from '../../context/CartContext';
import './Cart.css';
import { Link } from 'react-router-dom';

function Cart() {
    const cartCtx = useContext(CartContext);
    const [subtotal, setSubtotal] = useState(0);

    function getSubtotal() {
        if(cartCtx.products.length > 0) {
            let sum = 0;
            cartCtx.products.forEach(e => {
                sum += e.p.precio * e.q;
            });
            return sum;
        }
        return 0;
    }

    useEffect(() => {
        setSubtotal(getSubtotal());
    }, [cartCtx.products]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="row">
            <div className="col-12">
                
                {cartCtx.products.length > 0 &&
                    <div className="container mt-5" id="cart">
                        <div className="table-responsive shopping-cart">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th className="text-center">Cantidad</th>
                                        <th className="text-center">Subtotal</th>
                                        <th className="text-center">&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartCtx.products.map(p => {
                                        return ([
                                            <tr key={p.id}>
                                                <td>
                                                    <div className="product-item">
                                                        <img className="product-thumb" src={'../images/'+p.p.imagen} alt={p.p.titulo} />
                                                        <div className="product-info">
                                                            <h4 className="product-title"><Link to={'/item/'+p.p?.id}>{p.p.titulo}</Link></h4><span className="capitalize"><em>Categoría:</em> {p.p.categoria}</span><span><em>Tamaño:</em> 10.5</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <div className="count-input">
                                                        {p.q}
                                                    </div>
                                                </td>
                                                <td className="text-center text-lg text-medium">${p.p.precio * p.q}</td>
                                                <td className="text-center"><small><button className="btn" onClick={() => {cartCtx.removeItem(p.id)}}>Eliminar</button></small></td>
                                            </tr>
                                        ]);
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="shopping-cart-footer">
                            <div className="column text-lg">Subtotal: <span className="text-medium">${subtotal}</span></div>
                        </div>
                        <div className="shopping-cart-footer">
                            <div className="column">
                                <button className="btn" onClick={cartCtx.clear}>Vaciar carrito</button>
                                <button className="btn" onClick={() => {alert('comprar')}}>Comprar</button>
                            </div>
                        </div>
                    </div>
                }
                {cartCtx.products.length < 1 && 
                    <p className="m-4 text-center">
                        <span className="d-block p-5">No hay ítems en el carrito</span>
                        <Link to={`/`} className="btn mt-2">Ver productos</Link>
                    </p>
                }
            </div>
        </div>
    );
}

export default Cart;