import React, { useEffect, useState } from 'react';
import Product from "../Product/Product";
import Data from "../../Data/products";
import "./Review.css";
import { addToDb, deleteFromDb, getStoredCart } from "../../utilities/db";
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
    const addProduct = (product) =>{
        const sameProduct = cart.find(pd => pd.key === product.key);
        sameProduct.quantity = sameProduct.quantity + 1;
        const others = cart.filter(pd => pd.key !== product.key);
        const newCart = [...others, sameProduct];
        setCart(newCart);
        addToDb(product.key);
    }
    const removeProduct = (product) => {
        if(product.quantity > 1){
            product.quantity = product.quantity - 1;
            const others = cart.filter(pd => pd.key !== product.key);
            const newCart = [...others,product];
            setCart(newCart);
        }
        else{
            const newCart = cart.filter(pd=> pd.key !== product.key);
            setCart(newCart);
        }
        deleteFromDb(product.key); 
    }
    return (
        <div className="shop-container">
            <div className="product-container">
            <table border="1" cellPadding="20">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Add</th>
                        <th>quantity</th>
                        <th>Remove</th>
                        <th>price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                {
                    cart.map((pd,index)=> <ReviewItem key={pd.key} id={index} product={pd} removeProduct={removeProduct} addProduct={addProduct}></ReviewItem>)
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