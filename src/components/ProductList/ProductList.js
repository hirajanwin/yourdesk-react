import React from 'react';
import { Card, Accordion, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectDeskProduct, deselectDeskProduct, deleteDeskProduct, setCurrentDeskProduct, showProductModal } from '../../redux/actions';

export default function ProductCard(props) {

    const dispatch = useDispatch();
    const deskProducts = useSelector(store => store.deskProducts);

    let total = 0;
    for (let i = 0; i < deskProducts.allIds.length; i++) {
        let deskProduct = deskProducts.byIds[deskProducts.allIds[i]].deskProduct;
        if (deskProduct.product) {
            if (deskProduct.product.price) {
                total += parseFloat(deskProduct.product.price);
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

    const handleEdit = deskProduct => {
        dispatch(setCurrentDeskProduct(deskProduct));
        dispatch(showProductModal());
    }
    return (
    <div className={props.show ? "ProductList" : "hidden"}>
        <Accordion>
            {deskProducts.allIds.map((id, i) =>  
                {
                    let { deskProduct, saved, selected  } = deskProducts.byIds[id];
                    return (
                    saved &&
                    <Card key={i}>
                        <Accordion.Toggle as={Card.Header} onMouseOver={() => handleMouse(selected, deskProduct)} onMouseOut={() => handleMouse(selected, deskProduct)} 
                            eventKey={i} style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            
                            {deskProduct.product.title.slice(0, 40)}{deskProduct.product.title.length > 40 ? "..." : null} {"$" + (deskProduct.product.price ? deskProduct.product.price : "0")}

                            <div>
                                {props.share && <Button variant="outline-primary" size="sm" onClick={() => handleEdit(deskProduct)}>Edit</Button>}
                                &nbsp;
                                {props.share && <Button variant="outline-danger" size="sm" onClick={() => handleDelete(deskProduct)}>Delete</Button>}
                            </div>
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey={i} in={selected}>
                        
                        <Card.Body>

                            {/* Image of the selected product */}
                            {deskProduct.product.image &&
                            <div className="ProductImageContainer">
                            <Image src={deskProduct.product.image} rounded fluid className="ProductImage"/>
                            </div>}

                            <p>Pros:</p>
                            <p>{deskProduct.pros}</p>
                            <p>Cons:</p>
                            <p>{deskProduct.cons}</p>
                        </Card.Body>

                        </Accordion.Collapse>
                    </Card>
                    );
            }
            )}        
        <hr/>
            {"Total cost: $" + total.toString()}
        </Accordion>
  </div>
  )
}