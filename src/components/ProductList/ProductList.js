import React from 'react';
import { Card, Accordion, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectDeskProduct, deselectDeskProduct, deleteDeskProduct } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

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
                                onClick={props.clickable ? () => handleClick(deskProduct.product._id) : null}
                                onMouseOver={() => handleMouse(selected, deskProduct)}
                                onMouseOut={() => handleMouse(selected, deskProduct)}
                                eventKey={i} style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                }}>
                                {deskProduct.product.title.length > 40 ? deskProduct.product.title.slice(0, 35) + "..." : deskProduct.product.title}

                                <i>{"$" + (deskProduct.product.prices[0] ? deskProduct.product.prices[0].value : 0)}</i>

                                <div>
                                    {props.share && <Button variant="outline-danger" size="sm" onClick={() => handleDelete(deskProduct)}>Delete</Button>}
                                </div>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey={i} in={selected}>

                                <Card.Body>

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
            <i>{"Total cost: $" + total.toFixed(2).toString()}</i>
            </Accordion>
        </div >
    )
}