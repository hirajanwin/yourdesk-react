import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './ProductCard.css'

export default function ProductCard(props) {
    let { product } = props;
    const history = useHistory();

    const handleClick = () => {
        history.push("/product/" + product._id);
    }

    return (
        <div className="ProductCard">
            <Button 
            onClick={handleClick}
            variant="white"
            >
                <Image
                    style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
                    src={product.image} />
            </Button>
        </div>
    )
}