import React from 'react';
import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget.js';

function NavBar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
		  <div className="container-fluid">
		    <a className="navbar-brand" href="/">AstroShop</a>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarShop" aria-controls="navbarShop" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarShop">
		      <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
		        <li className="nav-item">
		          <a className="nav-link active" aria-current="page" href="/">Home</a>
		        </li>
		        <li className="nav-item">
		          <a className="nav-link" href="/remeras">Remeras</a>
		        </li>
		        <li className="nav-item">
		          <a className="nav-link" href="/posters">Pósters</a>
		        </li>
		        <li className="nav-item">
		          <a className="nav-link" href="/tazas">Tazas</a>
		        </li>
		      </ul>
		    </div>
		    <div>
		    <CartWidget />
		    </div>
		  </div>
		</nav>
	);
}

export default NavBar;