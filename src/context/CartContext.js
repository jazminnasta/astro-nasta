import {createContext, useState, useEffect} from 'react';

const CartContext = createContext({
	products: [],
	addItem: () => {},
	removeItem: () => {},
	clear: () => {},
	isInCart: () => {}
});

export const CartContextProvider = ({children}) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		console.log(products);
	}, [products]);

	const addItem = (q, p) => {
		if(isInCart(p.id)) {
			let cantidad = p.q;
			let original = products.find(i => parseInt(i.id) === parseInt(p.id));
			let removed = products.filter(i => parseInt(i.id) !== parseInt(p.id));
			const newProduct = {id: p.id, q: original.q + q, p: p}
			setProducts([newProduct, ...removed]);
		} else {
			const newProduct = {id: p.id, q: q, p: p}
			setProducts([newProduct, ...products]);
		}
	}

	const removeItem = (id) => {
		setProducts(products.filter(i => parseInt(i.id) !== parseInt(id)));
	}


	const clear = () => {
		setProducts([]);
	}


	const isInCart = (id) => {
		const index = products.findIndex(e => {
			if (parseInt(e.id) === parseInt(id)) 
				return true;
			return false;
		});
		return index !== -1;
	}

	return (
		<CartContext.Provider value={{
			products,
			addItem,
			removeItem,
			clear,
			isInCart
		}}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext;