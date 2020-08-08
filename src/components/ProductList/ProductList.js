import React from 'react';
import { Card, Accordion, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectDeskProduct, deselectDeskProduct, deleteDeskProduct } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

import './ProductList.css'


export default function ProductCard(props) {

    const dispatch = useDispatch();
    const deskProducts = useSelector(store => store.deskProducts);

    let total = 0;
    for (let i = 0; i < deskProducts.allIds.length; i++) {
        let deskProduct = deskProducts.byIds[deskProducts.allIds[i]].deskProduct;
        if (deskProduct.product) {
            if (deskProduct.product.prices) {
                total += deskProduct.product.prices[0] ? deskProduct.product.prices[0].value : 0;
            }
        }
    }

    const handleMouse = (selected, deskProduct) => {
        if (selected) {
            dispatch(deselectDeskProduct(deskProduct));
        } else {
            dispatch(selectDeskProduct(deskProduct));
        }
    }

    const handleDelete = deskProduct => {
        dispatch(deleteDeskProduct(deskProduct));
    }

    const history = useHistory();

    const handleClick = (id) => {
        history.push("/product/" + id);
    }
    var maxTextLength = 30

    return (
        <div className={props.show ? "ProductList" : "hidden"}>
            <Accordion>
                {deskProducts.allIds.map((id, i) => {
                    let { deskProduct, saved, selected } = deskProducts.byIds[id];
                    let { pros, cons } = deskProduct;
                    return (
                        saved &&
                        <Card key={i}>
                            <Accordion.Toggle as={Card.Header}
                                className="ProductListItem"
                                onClick={props.clickable ? () => handleClick(deskProduct.product._id) : null}
                                onMouseOver={() => handleMouse(selected, deskProduct)}
                                onMouseOut={() => handleMouse(selected, deskProduct)}
                                eventKey={i} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                }}>
                                <p style={{ marginBottom: 0, marginTop: ".2rem" }}>
                                    {deskProduct.product.title.length > maxTextLength ?
                                        deskProduct.product.title.slice(0, maxTextLength - 3) + "..." :
                                        deskProduct.product.title}
                                </p>
                                &nbsp;
                                <div>
                                    <p style={{ marginBottom: 0, marginTop: ".05rem" }}>
                                        {"$" + (deskProduct.product.prices[0] ? deskProduct.product.prices[0].value : 0)} &nbsp;
                                    {props.share && <Button variant="outline-danger" size="sm" onClick={() => handleDelete(deskProduct)}>Delete</Button>}
                                    </p>
                                </div>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey={i} in={selected}>

                                <Card.Body style={{ maxWidth: "25vw" }}>

                                    {/* Image of the selected product */}
                                    {deskProduct.product.image &&
                                        <div className="ProductImageContainer">
                                            <Image src={deskProduct.product.image} rounded fluid className="ProductImage" />
                                        </div>}

                                    {pros && <p><b>Pros:</b> {pros}</p>}
                                    {cons && <p><b>Cons:</b> {cons}</p>}
                                </Card.Body>

                            </Accordion.Collapse>
                        </Card>
                    );
                }
                )}
                <hr />
                {"Total cost: $" + total.toFixed(2).toString()}
            </Accordion>
        </div >
    )
}