import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { clearAllDeskProducts } from '../../redux/actions';
import { uploadImage, CREATE_DESK_PRODUCTS, CREATE_DESK } from '../../util/api';
import { useAuth0 } from "../../util/react-auth0-spa";
import { useMutation } from '@apollo/react-hooks';
import Hashtags from '../Util/Hashtags';
import { useHistory } from 'react-router-dom';

export default function ShareForm(props) {
    const { isAuthenticated, loginWithPopup, user } = useAuth0();
    const deskProducts = useSelector(store => store.deskProducts);
    const dispatch = useDispatch();
    const history = useHistory();
    const { onSuccessfulUpload } = props;
    const [isLoading, setLoading] = useState(false);
    const [hashtags, setHashtags] = useState([]);
    const [currentHashtag, setCurrentHashtag] = useState("");

    const [createDeskProducts] = useMutation(CREATE_DESK_PRODUCTS);
    const [createDesk] = useMutation(CREATE_DESK);

    const handleSubmit = event => {
        event.preventDefault();

        // Can't create desk unless authenticated
        if (!isAuthenticated || !user) {
            loginWithPopup();
            return;
        }
        setLoading(true);


        // Extract share form properties
        const form = event.currentTarget;
        let properties = {
            name: user ? user.name + "'s Desk" : "New User's Desk",
            about: "None",
        };
        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].id && form.elements[i].value) {
                properties[form.elements[i].id] = form.elements[i].value;
            }
        }

        // Construct clean DeskProduct objects for GraphQL mutation
        let cleanDeskProducts = Object.values(deskProducts.byIds).map(
            x => {
                let { deskProduct: dp } = x;
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
            if (cleanDeskProducts && cleanDeskProducts.length > 0) {
                createDeskProducts({
                    variables: {
                        newDeskProducts: cleanDeskProducts
                    }
                }).then(
                    ({ error, data }) => {
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
                                hashtags: hashtags,
                                likes: [],
                            }
                            console.log(desk);
                            // Finally create the desk object
                            createDesk({
                                variables: {
                                    newDesk: desk
                                }
                            }).then(
                                (payload) => {
                                    let { error, data } = payload;
                                    let newDeskId = data.deskCreateOne.recordId;
                                    if (error) {
                                        alert("Error creating desk!");
                                        console.log(error);
                                    } else {
                                        console.log("Creating desk was a success!");

                                        // Cleanup after yourself
                                        onSuccessfulUpload();
                                        dispatch(clearAllDeskProducts());
                                        history.push("/desk/" + user.sub + "/" + newDeskId);
                                    }
                                }
                            )
                        }
                    }
                )
            } else {
                var desk = {
                    desk_products: [],
                    ...properties,
                    user: user.sub,
                    img: url,
                    date_created: new Date(),
                    hashtags: hashtags,
                }
                console.log(desk);
                // Finally create the desk object
                createDesk({
                    variables: {
                        newDesk: desk
                    }
                }).then(
                    ({ error, data }) => {
                        if (error) {
                            console.log("Error creating desk!");
                            console.log(error);
                        } else {
                            console.log("Creating desk was a success!");
                            let newDeskId = data.deskCreateOne.recordId;
                            // Cleanup after yourself
                            onSuccessfulUpload();
                            dispatch(clearAllDeskProducts());

                            history.push("/desk/" + user.sub + "/" + newDeskId);
                        }
                    }
                ).catch(e => {
                    console.log(e);
                    alert(e);
                })
            }

        }).catch(function (error) {
            alert("Error uploading image...");
            console.log(error);
        });
    }

    function onHashtagClick() {
        if (currentHashtag === "") {

        } else if (currentHashtag === "featured") {
            props.alert("Being featured is a privilege!");
        } else {
            setHashtags(oldHashtags => [...oldHashtags, currentHashtag]);
            setCurrentHashtag("");
        }
    }

    function onHashtagChange(e) {
        setCurrentHashtag(e.target.value);
    }

    return (
        <Form className={props.show ? "MainForm" : "hidden"} onSubmit={handleSubmit}>

            <p><b>Product tagging does not work on mobile yet.</b> <br /><br /></p>

            <Form.Group controlId="name">
                <Form.Label>Give your desk a name.</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="about">
                <Form.Label style={{ marginBottom: 0 }}>Tell us about your desk.</Form.Label>
                <Form.Label style={{ fontSize: "80%" }}>What do you do on it? Which products could you not live without?</Form.Label>
                <Form.Control as="textarea" rows="2" />
            </Form.Group>

            <Hashtags hashtags={hashtags} />

            <Form.Label>Give your desk a few tags.</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={currentHashtag}
                    onChange={onHashtagChange}
                    aria-label="hashtag"
                    aria-describedby="basic-addon1"
                />
                &nbsp;
                <Button onClick={onHashtagClick} variant="secondary">Add</Button>
            </InputGroup>

            <Button loading={isLoading.toString()} variant="primary" type="submit" disabled={isLoading || !props.image}>
                {isLoading ? 'Uploading...' : 'Share!'}
            </Button>
        </Form>
    )
}