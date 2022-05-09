import React from 'react';
import { Link } from 'react-router-dom';
import cart from './Cart.svg';
import './CartWidget.css';

function CartWidget() {
    return (
      <Link to={`/cart`} className="transparent">
        <img alt="" src={cart} />
      </Link>
    );
}

export default CartWidget;