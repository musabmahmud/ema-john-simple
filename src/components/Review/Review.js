import React, { useEffect, useState } from 'react';
import Product from "../Product/Product";
import Data from "../../Data/products";
import "./Review.css";
import { addToDb, getStoredCart } from "../../utilities/db";
import Cart from '../Cart/Cart';
const Review = () => {

    useEffect( () => {
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( exist => {
            const product = Data.find(pd => pd.key === exist);
            product.quantity = savedCart[exist];
            return product;
        })
        setCart(previousCart);
    },[])

    const [cart, setCart] = useState([]);

    console.log(cart);
    return (
        <div className="review-container">
            <div className="product-container">
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;