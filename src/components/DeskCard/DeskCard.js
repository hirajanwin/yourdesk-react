import React from 'react';
import { Card, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Hashtags from '../Util/Hashtags';
import { useAuth0 } from "../../util/react-auth0-spa";
import { useMutation } from '@apollo/react-hooks';

import "./DeskCard.css"
import { TOGGLE_LIKE_DESK } from '../../util/api';

export default function DeskCard({ desk }) {
    const history = useHistory();
    const { user } = useAuth0();
    const [toggleLikeDesk] = useMutation(TOGGLE_LIKE_DESK);

    const handleClick = () => {
        history.push("/desk/" + desk.user.user_id + "/" + desk._id);
    }

    const profilePicture = (desk && desk.user && desk.user.picture) &&
        <Image src={desk.user.picture} style={{ width: "30px", height: "30px" }} alt="" roundedCircle />

    let date = new Date(desk.date_created).toLocaleDateString("en-US");

    function toggleLike(e) {
        // Prevent inner onclick to trigger outer onclick
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        toggleLikeDesk({
            variables: {
                user: user.sub,
                id: desk._id
            }
        });
        window.location.reload(false);
    }


    return (
        <div className="DeskCardWrapper">
            <Card
                variant="light"
                className="DeskCard"
                onClick={handleClick}>
                <Card.Header style={{ padding: 0 }}>
                    <Row style={{ margin: 0, justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            {profilePicture} &nbsp;
                            <div className="DeskCardHeader">
                                <h6>{(desk && desk.user && desk.user.picture) && desk.user.name}</h6>
                                <p>{date}</p>
                            </div>
                        </div>
                        <div>
                            {desk.likes.length} <button onClick={toggleLike}>{user ? (desk.likes.includes(user.sub) ? "Unlike" : "Like") : "Like"}</button>
                        </div>
                    </Row>
                </Card.Header>
                <Card.Img variant="top" src={desk.img} thumbnail="true" height="200px" />
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