import React from 'react';
import { Card, Image, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Hashtags from '../Util/Hashtags';
import { useAuth0 } from "../../util/react-auth0-spa";
import { useMutation } from '@apollo/react-hooks';
import Likes from '../Util/Likes';

import { DELETE_DESK, APPROVE_DESK } from '../../util/api';
import { FaRegCommentDots } from 'react-icons/fa';

import "./DeskCard.css"


export default function DeskCard({ desk, notLikeable }) {
    const history = useHistory();
    const { user } = useAuth0();
    const [deleteDesk] = useMutation(DELETE_DESK);
    const [approveDesk] = useMutation(APPROVE_DESK);

    const handleClick = () => {
        history.push("/desk/" + desk.user.user_id + "/" + desk._id);
    }

    const profilePicture = (desk && desk.user && desk.user.picture) &&
        <Image src={desk.user.picture} style={{ width: "30px", height: "30px" }} alt="" roundedCircle />

    let date = new Date(desk.date_created).toDateString("en-US");

    function deleteButton(e) {
        // Prevent inner onclick to trigger outer onclick
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

        if (user.sub !== desk.user.user_id) {
            console.log("Trying to delete desk that is not yours!");
            return;
        }
        deleteDesk({
            variables: {
                deskId: desk._id,
                deskProductIds: desk.desk_products.map(dp => dp._id),
            }
        }).then(() => {
            window.location.reload();
        })
    }

    function approveButton(e) {
        // Prevent inner onclick to trigger outer onclick
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

        approveDesk({
            variables: {
                record: {
                    approved: true
                },
                filter: {
                    _id: desk._id
                }
            }
        }).then(() => {
            window.location.reload();
        })

    }

    return (
        <div className="DeskCardWrapper">
            <Card
                variant="light"
                className="DeskCard"
                onClick={handleClick}
            >
                <Card.Header style={{ padding: 0 }}>
                    <Row style={{ margin: 0, justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {profilePicture} &nbsp;
                            <div className="DeskCardHeader">
                                <h6>{(desk && desk.user && desk.user.picture) && desk.user.name.split("@")[0]}</h6>
                                <p>{date}</p>
                            </div>
                        </div>
                        <div>
                            {
                                notLikeable ?
                                    <div>
                                        <Button variant="outline-danger" size="sm" onClick={deleteButton}>Delete</Button>
                                    </div> :
                                    <div className="LikesAndComments">
                                        {(desk.comments && desk.comments.length > 0 &&
                                            <Row style={{ float: "left", marginRight: 25 }}>
                                                <p>{desk.comments.length} &nbsp;</p>
                                                <FaRegCommentDots size="1.3em" />
                                            </Row>)}
                                        <Likes desk={desk} />
                                    </div>
                            }

                            {
                                !desk.approved && user && user.sub === "google-oauth2|116860243559583177702" && (
                                    <button onClick={approveButton}>Approve</button>
                                )
                            }
                        </div>
                    </Row>
                </Card.Header>
                <div className="DeskCardImageWrapper">
                    <Card.Img variant="top" src={desk.img} className="DeskCardImage" />
                </div>
                <Card.Body style={{ paddingTop: "10px", padding: "5px" }}>
                    <Card.Title style={{ fontSize: "100%" }}>
                        {desk.name}
                    </Card.Title>
                    <Hashtags hashtags={desk.hashtags} overflowHidden />
                </Card.Body>
            </Card>
        </div>
    );
}