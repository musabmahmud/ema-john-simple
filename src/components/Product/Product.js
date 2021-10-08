import React from 'react';
import "./Product.css";

const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4>{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: ${price}</p>
                <p>Only Stock: {stock} left in stock</p>
                <p>Reviews: </p>
                <button className="add-Button">added to cart</button>
            </div>
        </div>
    );
};


export default Product;