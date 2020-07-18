import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT } from '../../util/api';
import { Card, Image, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export default function Desk(props) {
    let path = props.location.pathname.split("/");
    let productId = path[2];

    const { data } = useQuery(GET_PRODUCT, {
        variables: {
            filter: {
                _id: productId,
            }
        }
    });
    let product = data ? data.productOne : null;

    let count = 0;

    return (
        <div className="Body">
            <div className="DeskBody">
                {
                    product &&
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Card style={{ padding: 20, width: "30vw", height: "100%" }}>
                            <h5>{product.title}</h5>
                            <p>ASIN: {product.asin}</p>
                            <p>Amazon Rating: &nbsp;
                                <StarRatings
                                    rating={product.rating}
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension={20}
                                    starSpacing={1}
                                />
                            </p>
                            <p>ID: {product._id}</p>
                            <p>Price: ${product.prices[0] ? product.prices[0].value : 0}</p>
                            <div>
                                <Button href={product.link} target="_blank" variant="success">Buy</Button>
                            </div>
                        </Card>
                        <div>
                            <Image style={{ width: 400, padding: 20 }} src={product.image} />
                        </div>
                        <div>
                            <Card style={{ padding: 20, width: "30vw" }}>
                                <b>As seen in {count} desks:</b>
                            </Card>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}