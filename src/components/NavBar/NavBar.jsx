import React from 'react';
import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget.jsx';
import { NavLink } from 'react-router-dom';

function NavBar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
		  <div className="container-fluid">
		    <NavLink to={`/`} className="navbar-brand">AstroShop</NavLink>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarShop" aria-controls="navbarShop" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarShop">
		      <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
		        <li className="nav-item">
		          	<NavLink to={`/category/fuego`} className="fuego">
		          		<span><img src="./../iconos/icono_fuego.png" /></span>
		          		<span>Fuego</span>
		          	</NavLink>
		        </li>
		        <li className="nav-item">
		        	<NavLink to={`/category/tierra`} className="tierra">
		          		<span><img src="./../iconos/icono_tierra.png" /></span>
		          		<span>Tierra</span>
		          	</NavLink>
		        </li>
		        <li className="nav-item">
		        	<NavLink to={`/category/aire`} className="aire">
		        		<span><img src="./../iconos/icono_aire.png" /></span>
		        		<span>Aire</span>
		        	</NavLink>
		        </li>
		        <li className="nav-item">
		        	<NavLink to={`/category/agua`} className="agua">
		        		<span><img src="./../iconos/icono_agua.png" /></span>
		        		<span>Agua</span>
		        	</NavLink>
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