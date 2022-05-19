import React, {useContext, useEffect, useState} from 'react';
import CartContext from '../../context/CartContext';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import {collection, addDoc, getFirestore} from 'firebase/firestore';

function Checkout() {
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const [subtotal, setSubtotal] = useState(0);
    const [buyer, setBuyer] = useState({nombre: '', telefono: '', email: ''});
    const [productos, setProductos] = useState(null);
    const [cargando, setCargando] = useState(false);

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

    const changeInputValue = (e) => {
        setBuyer({...buyer, [e.target.name]: e.target.value});
    }

    const enviarDatos = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setCargando(true);

        const db = getFirestore();
        const orderDB = collection(db, 'orders');

        try {
            const orden = await addDoc(orderDB, {
                buyer: buyer,
                items: productos,
                date: new Date(),
                total: subtotal
            })
            setCargando(false);
            if(orden.id) {
                cartCtx.ordenRecibida(orden.id);
            } else {
                alert('Hubo un error. Por favor, intente de nuevo');
            }
        } catch (e) {
            console.log('error', e);
        }
    }

    useEffect(() => {
        if(!cartCtx.products.length)
            navigate('/');
        let temp = cartCtx.products.map((p) => {
            let a = {};
            a.cantidad = p.q;
            a.id = parseInt(p.id);
            a.titulo = p.p.titulo;
            a.precio = p.p.precio;
            return a;
        });
        setProductos(temp);
        var forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } 
            form.classList.add('was-validated');
          }, false);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSubtotal(getSubtotal());
    }, [cartCtx.products]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="row">
            <div className="col-12">
                <div className="alert alert-primary text-center" role="alert">CHECKOUT</div>
                {cartCtx.products.length > 0 &&
                    <div className="container mt-5" id="cart">
                        <div className="table-responsive shopping-cart">
                            <h5 className="mt-5">Tu pedido</h5>
                            <table className="table">
                                <tbody>
                                    {cartCtx.products.map(p => {
                                        return ([
                                            <tr key={p.id}>
                                                <td className="text-left">
                                                    {p.q} x {p.p.titulo}
                                                </td>
                                                <td className="text-left text-lg text-medium">${p.p.precio * p.q}</td>
                                            </tr>
                                        ]);
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="shopping-cart-footer">
                            <div className="column text-lg">Subtotal: <span className="text-medium">${subtotal}</span></div>
                        </div>
                    </div>
                }
                <form className="container mt-5 needs-validation" id="cart" noValidate onSubmit={enviarDatos}>
                    <div className="table-responsive shopping-cart">
                        <h5 className="mt-5 mb-3">Tus datos</h5>
                        <div className="form-group row mb-3">
                            <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Nombre</label>
                            <div className="col-sm-10">
                                <input type="text" name="nombre" className="form-control" id="inputNombre" placeholder="Nombre" onChange={changeInputValue} required />
                                <div className="invalid-feedback">
                                    El nombre es obligatorio.
                                </div>
                            </div>
                          </div>
                          <div className="form-group row mb-3">
                            <label htmlFor="inputTelefono" className="col-sm-2 col-form-label">Teléfono</label>
                            <div className="col-sm-10">
                                <input type="text" name="telefono" className="form-control" id="inputTelefono" placeholder="Teléfono" onChange={changeInputValue} />
                            </div>
                          </div>
                          <div className="form-group row mb-3">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" name="email" className="form-control" id="inputEmail" placeholder="Email" required onChange={changeInputValue} />
                                <div className="invalid-feedback">
                                    El e-mail es obligatorio.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shopping-cart-footer">
                        <div className="column">
                            <button className="btn" type="submit">{cargando ? 'Enviando' : 'Finalizar compra'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Checkout;