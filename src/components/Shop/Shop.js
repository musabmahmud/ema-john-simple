import React, { useEffect, useState } from 'react';
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import Data from "../../Data/products";

const Shop = () => {
    
    const first10 = Data.slice(0,10);
    
    
    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    const [products,setProducts] = useState(first10);

    const [cart, setCart] = useState([]);
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map( pdValue => <Product handleAddProduct={handleAddProduct} product={pdValue} key={pdValue.key}>{pdValue.name}</Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
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