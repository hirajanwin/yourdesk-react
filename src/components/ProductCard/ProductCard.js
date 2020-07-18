import React from 'react';
import { Image } from 'react-bootstrap';
import './ProductCard.css'

export default function ProductCard(props) {
    let { product } = props;
    return (
        <div className="ProductCard">
            <Image
                style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
                src={product.image} />
        </div>
    )
}