import React from 'react';

function ItemDetail({producto}) {
    return (
        <div className="container pt-5">
        	<div className="detalle row">
        		<div className="col-12 col-sm-6">
                    <img alt={producto.titulo} src={'../images/'+producto.imagen} />
                </div>
                <div className="col-12 col-sm-6">
                    <h1>{producto.titulo}</h1>
                    <h3>${producto.precio}</h3>
                    <p>{producto.descripcion}</p>
                    <p className="text-muted">Stock: {producto.stock}</p>
                    {/*Agregar itemcount*/}
                </div>
          	</div>
        </div>
    );
}

export default ItemDetail;