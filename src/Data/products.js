import data from "./data.json";

const Products = [...data];


const shuffleArray = Products => {
    for (let i = Products.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [Products[i-1], Products[j]] = [Products[j],Products[i-1]];
    }
}
 
shuffleArray(Products);


export default Products;