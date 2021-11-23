import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
// import Product from '../Product/Product';
import "./Cart.css";

const Cart = (props) => {
    const cart = props.cart;
    let shippingCost = 0;
    let tax = 0;
    let total = 0;

    const subtotal = cart.reduce((subtotal, pdt) => subtotal + pdt.price, 0);

    if (subtotal > 0) {
        shippingCost = 80;
        tax = subtotal * 0.15;
        total = shippingCost + tax + subtotal;
    }

    const format = num => {
        const precision = Math.round(num);
        return Number(precision);
    }

    

    return (
        <div>
            <h3 className="title">Order Summary</h3>
            <hr />
            <h4 className="title">Ordered Items: {cart.length}</h4>

            <table className="CartTable">
                <tbody>
                    <tr>
                        <td>Sub Total</td>
                        <td>{format(subtotal)}</td>
                    </tr>
                    <tr>
                        <td>Shipping Cost</td>
                        <td>{format(shippingCost)}</td>
                    </tr>
                    <tr>
                        <td>Tax + vat(15%)</td>
                        <td>{format(tax)}</td>
                    </tr>
                    <tr>
                        <td>
                            <hr />Total Price : </td>
                        <td><hr />{format(total)}</td>
                    </tr>
                </tbody>
            </table>
            <Link to={'/review'}><button className="order-Button">Order Review</button></Link>
        </div>
    );
};

export default Cart;