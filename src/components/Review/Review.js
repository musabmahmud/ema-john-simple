import React, { useEffect, useState } from 'react';
import Product from "../Product/Product";
import Data from "../../Data/products";
import "./Review.css";
import { addToDb, getStoredCart } from "../../utilities/db";
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
const Review = () => {
    const [cart, setCart] = useState([]);
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
    return (
        <div className="shop-container">
            <div className="product-container">
            <table border="1" cellPadding="20">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>quantity</th>
                        <th>price</th>
                        <th>Total</th>
                        <th>Add</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cart.map((pd,index)=> <ReviewItem key={pd.key} id={index} product={pd}></ReviewItem>)
                }
                </tbody>
            </table>
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Review;