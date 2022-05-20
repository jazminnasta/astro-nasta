import React, { useEffect, useState } from 'react';
import './Historial.css';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getOrder } from "../../firebase/firebase.js";

function Historial() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const {state} = useLocation();
    const [orden, setOrden] = useState(null);
    const [ordenID, setOrdenID] = useState(null);
    const { id } = useParams();

    function goTo() {
        let q = document.getElementById('inputID').value;
        navigate('/ordenes', { state: { id: q } });
    }

    useEffect(() => {
        if(id)
            navigate('/ordenes', { state: { id: id } });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setCargando(true);
        if(state) {
            setOrdenID(state.id);
            getOrder(state.id).then((orden) => {
                setCargando(false);
                if(orden)
                    setOrden(orden);
            })
        } else {
            setCargando(false);
        }
    }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(orden) 
            setProductos(orden.items)
    }, [orden]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="row">
            <div className="col-12">
                <div className="alert alert-primary text-center" role="alert">{cargando ? 'CARGANDO...' : 'BUSCADOR DE ÓRDENES'}</div>
                {(ordenID && productos.length > 0) &&
                    <div className="container mt-5" id="cart">
                        <div className="table-responsive shopping-cart">
                            <h5 className="mt-5 ps-2 slab">Orden ID: {orden.id}</h5>
                            <h5 className="mt-1 ps-2 slab">Estado: {orden.estado}</h5>
                            <h5 className="mt-1 ps-2 slab">Total: ${orden.total}</h5>
                            <h5 className="mt-1 ps-2 slab">Items:</h5>
                            <table className="table mb-5">
                                <tbody>
                                    {productos.map(p => {
                                        return ([
                                            <tr key={p.id}>
                                                <td className="text-left">
                                                    {p.cantidad} x {p.titulo}
                                                </td>
                                                <td className="text-left text-lg text-medium">${p.precio * p.cantidad}</td>
                                            </tr>
                                        ]);
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {(ordenID && !productos.length) &&
                    <div className="text-center">
                        <p>No hay órdenes con ese ID</p>
                        <Link to={`/`} className="btn mt-2">Volver a productos</Link>
                    </div>
                }
                {!ordenID && 
                    <div className="text-center">
                        <p>Introduzca el ID de la orden a buscar</p>
                        <input className="form-control_" id="inputID" type="text" name="orden" />
                        <button type="button" className="btn" onClick={() => goTo()}>Buscar</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Historial;