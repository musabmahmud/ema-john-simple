import React, { useEffect, useState } from 'react';
import "./Home.css";
import Product from "../Product/Product";
import Data from "../../Data/products";
import { addToDb, getStoredCart } from "../../utilities/db";

const Home = () => {
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
        <div className="home-container">
            <div className="products">
                {
                    products.map( pdValue => <Product handleAddProduct={handleAddProduct} product={pdValue} key={pdValue.key}></Product>)
                }
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

export default Home;