import React, {useContext, useEffect, useState} from 'react';
import CartContext from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Gracias() {
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const [orden, setOrden] = useState(null);

    useEffect(() => {
        if(!cartCtx.orden)
            navigate('/');
        setOrden(cartCtx.orden);
        cartCtx.ordenRecibida(null);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="row mt-5">
            <div className="col-10 col-sm-6 offset-sm-3 mt-5">
                <div className="card" style={{backgroundColor: 'transparent'}}>
                    <div className="card-body text-center">
                        <h2 className="card-title slab">¡Su compra fue recibida!</h2>
                        <p className="card-text">Recibirá el pedido con ID {orden} muy pronto</p>
                        <Link to={'/'} className="btn alt mt-2">Volver a productos</Link>
                        <Link to={'/ordenes/'+orden} className="btn mt-2 ms-4">Ver estado de mi orden</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gracias;