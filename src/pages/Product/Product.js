import React from 'react';

import DeskCard from '../../components/DeskCard/DeskCard';
import { Card, Image, Button } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

import { useQuery } from '@apollo/react-hooks';
import { GET_PRODUCT, GET_DESKS_WITH_PRODUCTS } from '../../util/api';


export default function Desk(props) {
    let path = props.location.pathname.split("/");
    let productId = path[2];

    // Retrieve product
    const { data } = useQuery(GET_PRODUCT, {
        variables: {
            filter: {
                _id: productId,
            }
        }
    });
    let product = data ? data.productOne : null;

    // Retrieve desks with this product
    const { data: deskData } = useQuery(GET_DESKS_WITH_PRODUCTS);
    const desks = deskData ? deskData.deskMany : [];
    const featuredDesks = desks.filter(desk => {
        let productIds = desk.desk_products.map(dp => dp.product._id);
        return productIds.includes(productId);
    })
    // Count how many
    let count = featuredDesks.length;

    return (
        <div className="DeskBody">
            {
                product &&
                <div className="NewBody">
                    <Card style={{ padding: 20, margin: 20, height: "100%", maxWidth: 400 }}>
                        <h5>{product.title}</h5>
                        <p>ASIN: {product.asin}</p>
                        Amazon Rating:
                        {product.rating && <StarRatings
                            rating={product.rating}
                            starRatedColor="orange"
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing="1px"
                        />}
                        <p>ID: {product._id}</p>
                        {product.prices[0] && <p>Price: ${product.prices[0].value}</p>}
                        <div>
                            <Button href={product.link} target="_blank" variant="success">Buy</Button>
                        </div>

                        <br />

                        {/* Extract and display reviews */}
                        {featuredDesks.map(
                            desk => {
                                let { user } = desk;
                                let productIds = desk.desk_products.map(dp => dp.product._id);
                                let index = productIds.indexOf(productId);
                                let deskProduct = desk.desk_products[index];
                                let { pros, cons } = deskProduct;
                                return (
                                    <div>
                                        {(pros || cons) && <p><i>{user.name} said:</i></p>}
                                        {pros && <p><b>Pros:</b> {pros}</p>}
                                        {cons && <p><b>Cons:</b> {cons}</p>}
                                    </div>
                                )
                            }
                        )}
                    </Card>
                    <div>
                        <Image style={{ width: 400, padding: 20 }} src={product.image} />
                    </div>
                    <div style={{ padding: 5, margin: 20, height: "100%" }}>
                        &nbsp;
                        &nbsp;
                        <b>{count > 0 ?
                            count === 1 ? `As seen on ${count} desk:` : `As seen on ${count} desks:` :
                            "Not found on any desks!"}
                        </b>
                        {featuredDesks.map(desk => <DeskCard desk={desk} />)}
                    </div>
                </div>
            }
        </div>
    )
}