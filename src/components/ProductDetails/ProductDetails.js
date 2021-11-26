import React from 'react'
import Data from "../../Data/products";
import Product from "../Product/Product";
import { useParams } from 'react-router';
function ProductDetails() {
    let { productKey } = useParams();
    const product = Data.find(pd => pd.key === productKey);
    const handleAddProduct = (product)=>{
        console.log(product);
    }
return (
        <div>
            <h1>Your Product Details</h1>
            <Product product={product} key={product.key} handleAddProduct={handleAddProduct}></Product>
        </div>
    )
}

export default ProductDetails