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
	const [totalQ, setTotalQ] = useState(10);
	const notify = (q, p) => {
        toast(q + ' x ' + p.titulo +' agregado', {
            duration: 3000,
            position: 'top-right'}
        );
    }

	useEffect(() => {
		setTotalQ(getTotal);
	}, [products]);

	const addItem = (q, p) => {
		if(isInCart(p.id)) {
			let original = products.find(i => parseInt(i.id) === parseInt(p.id));
			let removed = products.filter(i => parseInt(i.id) !== parseInt(p.id));
			const newProduct = {id: p.id, q: original.q + q, p: p}
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

	return (
		<CartContext.Provider value={{
			totalQ,
			products,
			addItem,
			removeItem,
			clear,
			isInCart
		}}>
			<Toaster/>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext;