import {createContext, useState, useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CartContext = createContext({
	totalQ: 0,
	products: [],
	addItem: () => {},
	removeItem: () => {},
	clear: () => {},
	isInCart: () => {}
});

export const CartContextProvider = ({children}) => {
	const [products, setProducts] = useState([]);
	const [orden, setOrden] = useState(null);
	const [totalQ, setTotalQ] = useState(10);
	const notify = (q, p) => {
        toast(q + ' x ' + p.titulo +' en carrito', {
            duration: 3000,
            position: 'top-right'}
        );
    }

	useEffect(() => {
		setTotalQ(getTotal);
	}, [products]); // eslint-disable-line react-hooks/exhaustive-deps

	const addItem = (q, p, overwrite = null) => {
		if(isInCart(p.id)) {
			let original = products.find(i => parseInt(i.id) === parseInt(p.id));
			let removed = products.filter(i => parseInt(i.id) !== parseInt(p.id));
			let final = q;
			if(!overwrite) {
				final = original.q + q;
			}
			const newProduct = {id: p.id, q: final, p: p}
			setProducts([newProduct, ...removed]);
		} else {
			const newProduct = {id: p.id, q: q, p: p}
			setProducts([newProduct, ...products]);
		}
		notify(q, p);
	}

	const removeItem = (id) => {
		setProducts(products.filter(i => parseInt(i.id) !== parseInt(id)));
	}

	const clear = () => {
		setProducts([]);
	}

	const getTotal = () => {
		const sum = products.reduce((t, e) => {
  			return t + e.q;
		}, 0);
		return sum;
	}

	const isInCart = (id) => {
		const index = products.findIndex(e => {
			if (parseInt(e.id) === parseInt(id)) 
				return true;
			return false;
		});
		return index !== -1;
	}

	const getQItem = (id) => {
		let total = 0;
		products.findIndex(e => {
			if(parseInt(e.id) === parseInt(id)) {
				total = e.q;
			}
			return total;
		});
		return total;
	}

	const ordenRecibida = (id) => {
		setOrden(id);
		setProducts([]);
	}

	return (
		<CartContext.Provider value={{
			totalQ,
			products,
			addItem,
			removeItem,
			clear,
			isInCart,
			getQItem,
			ordenRecibida,
			orden
		}}>
			<Toaster/>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext;