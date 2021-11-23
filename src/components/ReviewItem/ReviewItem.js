import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity,price} = props.product;
    return (
        <>
            <tr>
                <td className="numVal">{props.id + 1}</td>
                <td>{name}</td>
                <td className="numVal">{quantity}</td>
                <td className="priceVal">${Math.round(price)}</td>
                <td className="priceVal">${Math.round(price * quantity)}</td>
                <td>add</td>
                <td>remove</td>
            </tr>
        </>
    );
};

export default ReviewItem;