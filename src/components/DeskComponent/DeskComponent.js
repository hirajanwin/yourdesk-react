import React from 'react';
import Canvas from '../../components/Canvas/Canvas';
import ProductList from '../../components/ProductList/ProductList';
import DeskDetails from '../../components/DeskDetails/DeskDetails';
import { useDispatch } from 'react-redux';
import { addDeskProduct, clearAllDeskProducts } from '../../redux/actions';
import { useAuth0 } from "../../util/react-auth0-spa";
import { Form, Button, Card, Col, Image } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';

import './DeskComponent.css'
import { CREATE_COMMENT } from '../../util/api';

export default function DeskComponent({ desk, commentSection }) {
    const dispatch = useDispatch();
    const { user } = useAuth0();
    const [createComment] = useMutation(CREATE_COMMENT);

    if (desk) {
        dispatch(clearAllDeskProducts());
        desk.desk_products.forEach(dp => {
            dispatch(addDeskProduct(dp, true, false));
        });
    }

    function handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        let comment = form.elements[0].value;
        if (comment) {
            createComment({
                variables: {
                    userId: user.sub,
                    deskId: desk._id,
                    comment: comment,
                    date: new Date(),
                }
            });
            form.reset();
            window.location.reload(false);
        }
    }

    return (
        <div className="Body">
            {
                desk &&
                <>
                    <div className="NewBody">
                        <DeskDetails desk={desk} />
                        <Canvas show={true} image={desk.img} />
                        <ProductList show={true} clickable />
                    </div>
                    <div className="CommentSection">
                        {commentSection && (<div>
                            {/* Write your own comment */}
                            {user ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Row>
                                        <Col xs={9}>
                                            <Form.Control size="sm" placeholder="Leave a comment." className="my-1" />
                                        </Col>
                                        <Col>
                                            <Button type="submit" size="sm" variant="secondary" className="my-1">Submit</Button>
                                        </Col>
                                    </Form.Row>
                                </Form>) :
                                (<div><p>Sign in to leave a comment.</p></div>)
                            }
                            {/* Comments */}
                            {desk.comments.sort((a, b) => b.date - a.date).map(
                                (comm, i) => {
                                    let { comment, user, date } = comm;
                                    const profilePicture = (user && user.picture) &&
                                        <Image src={user.picture} style={{ width: "30px", height: "30px" }} alt="" roundedCircle />
                                    return (
                                        <Card key={i} style={{ marginTop: 5, marginBottom: 5 }}>
                                            {user && <div className="Comment">
                                                {profilePicture}
                                                <div className="CommentDetails">
                                                    <p><a href={`/profile/${user.user_id}`}>{user.name}</a></p>
                                                    <p className="Date">{new Date(date).toDateString()}</p>
                                                </div>
                                                <div className="CommentComment">
                                                    <p>{comment}</p>
                                                </div>
                                            </div>}
                                        </Card>
                                    );
                                }
                            )}
                        </div>)}
                    </div>
                </>
            }
        </div>
    )
}