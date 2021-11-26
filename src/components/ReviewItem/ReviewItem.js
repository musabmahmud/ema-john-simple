import { faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,price,key} = props.product;
    return (
        <>
            <tr>
                <td className="numVal">{props.id + 1}</td>
                <td>{name}</td>
                <td className="numVal"><button onClick={() => props.addProduct(props.product)}><FontAwesomeIcon icon={faPlus} /></button>
                </td>
                <td className="numVal">{quantity}</td>
                <td className="numVal">
                    <button onClick={() => props.removeProduct(props.product)}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                </td>
                <td className="priceVal">${Math.round(price)}</td>
                <td className="priceVal">${Math.round(price * quantity)}</td>
            </tr>
        </>
    );
};

export default ReviewItem;