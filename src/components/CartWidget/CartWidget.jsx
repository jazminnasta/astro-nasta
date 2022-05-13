import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import cart from './Cart.svg';
import './CartWidget.css';
import CartContext from '../../context/CartContext';

function CartWidget() {
  const cartCtx = useContext(CartContext);
  return (
    <Link to={`/cart`} className={cartCtx.totalQ ? 'visible transparent position-relative' : 'invisible transparent position-relative'}>
      <img alt="" src={cart} />
      <span className="count">{cartCtx.totalQ}</span>
    </Link>
  );
}

export default CartWidget;