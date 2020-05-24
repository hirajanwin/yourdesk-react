import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { clearAllDeskProducts } from '../../redux/actions';
import { uploadImage, CREATE_DESK_PRODUCTS, CREATE_DESK } from '../../util/api';
import { useAuth0 } from "../../react-auth0-spa";
import { useMutation } from '@apollo/react-hooks';
import { URI } from '../../util/api';

export default function ShareForm(props) {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    const deskProducts = useSelector(store => store.deskProducts);
    const dispatch = useDispatch();
    const { onSuccessfulUpload } = props; 
    const [isLoading, setLoading] = useState(false);

    const [createDeskProducts] = useMutation(CREATE_DESK_PRODUCTS);
    const [createDesk] = useMutation(CREATE_DESK);

    const handleSubmit = event => {
        event.preventDefault();

        // Can't create desk unless authenticated
        if (!isAuthenticated) {
            loginWithRedirect({ redirect_uri: URI + "share"});
            return;
        }
        setLoading(true);
        
        // Extract share form properties
        const form = event.currentTarget;
        let properties = {};
        for (let i = 0; i < form.elements.length; i++) {
          if (form.elements[i].id) {
            properties[form.elements[i].id] = form.elements[i].value;
          }
        }

        // Construct clean DeskProduct objects for GraphQL mutation
        let cleanDeskProducts = Object.values(deskProducts.byIds).map(
            x => {
                let {deskProduct:dp} = x;
                return {
                    product: dp.product._id,
                    coordX: dp.coordX,
                    coordY: dp.coordY,
                    pros: dp.pros,
                    cons: dp.cons,
                }
            }
        )
    
        // Upload the image first
        uploadImage(props.image.file).then((resp) => {
            let url = resp.data.url;

            // Then create desk products
            createDeskProducts({
                variables: {
                    newDeskProducts: cleanDeskProducts
                }
            }).then(
                ({ error, data })=> {
                    if (error) {
                        console.log("Failed to create desk products!");
                        return;
                    } else {
                        var desk = {
                            desk_products: data.deskProductCreateMany.recordIds,
                            ...properties,
                            user: user.sub,
                            img: url,
                            date_created: new Date(),
                        }
                        
                        // Finally create the desk object
                        createDesk({
                            variables: {
                                newDesk: desk
                            }
                        }).then(
                            ({error}) => {
                                if (error) {
                                    console.log("Error creating desk!");
                                    console.log(error);
                                } else {
                                    console.log("Creating desk was a success!");
                                    
                                    // Cleanup after yourself
                                    onSuccessfulUpload();
                                    dispatch(clearAllDeskProducts());
                                }
                            }
                        )
                    }
                }
            )
        }).catch(function (error) {
            console.log("Error uploading image...");
            console.log(error);
        });
    }

    return (
        <Form className={props.show ? "MainForm" : "hidden"} onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Give this desk a name!</Form.Label>
                <Form.Control type="text" defaultValue="Big Bertha"/>
            </Form.Group>
            
            <Form.Group controlId="use">
                <Form.Label>What do you use this desk for?</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue="WFH, Gaming, Programming..."/>
            </Form.Group>
            
            <Form.Group controlId="favorite">
                <Form.Label>Which is your favorite product?</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue="My Macbook!"/>
            </Form.Group>

            <Button loading={isLoading.toString()} variant="primary" type="submit" disabled={isLoading || !props.image}> 
            {isLoading ? 'Uploading...' : 'Submit'}
            </Button>
        </Form>
    )
}