import React from 'react';
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const { img, name, seller, price, stock,key } = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4><Link to={'/product/'+ key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <p>Price: ${price}</p>
                <p>Only Stock: {stock} left in stock</p>
                <p>Reviews: </p>
                <button className="add-Button" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> added to cart</button>
            </div>
        </div>
    );
};

// npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome


export default Product;