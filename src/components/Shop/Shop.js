import React, { useEffect, useState } from 'react';
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import Data from "../../Data/products";
import { addToDb, getStoredCart } from "../../utilities/db";
import { Link } from 'react-router-dom';

const Shop = () => {
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let newCart;
        if(sameProduct){
            sameProduct.quantity = sameProduct.quantity + 1;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        setCart(newCart);
        addToDb(product.key);
    }

    const [products,setProducts] = useState([]);

    useEffect(() => {
        setProducts(Data);
    },[])


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
                {
                    products.map( pdValue => <Product handleAddProduct={handleAddProduct} product={pdValue} key={pdValue.key}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                <Link to={'/review'}><button className="order-Button">Order Review</button></Link>
            </div>
        </div>
    );
};

// function setProducts(Data) {
//     let currentIndex = Data.length,  randomIndex;
//     // While there remain elements to shuffle...
//     while (currentIndex !== 0) {
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex--;
  
//       // And swap it with the current element.
//       [Data[currentIndex], Data[randomIndex]] = [Data[randomIndex], Data[currentIndex]];
//     }
//     return props.product;
// }

export default Shop;