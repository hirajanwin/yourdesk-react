import React from 'react';
import { Image } from 'react-bootstrap';
import './ProductCard.css'

export default function ProductCard(props) {
    let { product } = props;
    return (
        <div className="ProductCard">
            <Image height="150px" src={product.image} />
        </div>
    )
}