import React, { useEffect, useState } from 'react';
import "./Shop.css";
import Product from "../Product/Product";
import Data from "../../Data/products.json";

const Shop = () => {
    
    const first10 = Data.slice(0,10);
    
    const [products,setProducts] = useState(first10);
    console.log(products);
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map( pdValue => <Product product={pdValue} key={pdValue.key}>{pdValue.name}</Product>)
                }
            </div>
            <div className="cart-container">

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