import React from 'react';
import Item from '../Item/Item.jsx';

function ItemList({productos}) {
    return (
    	<ul className="productos">
    		{productos.map(p => <Item key={p.id} producto={p} />)}
      	</ul>
    );
}

export default ItemList;