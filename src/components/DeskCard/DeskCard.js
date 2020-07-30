import React from 'react';
import { Card, Button, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Hashtags from '../Util/Hashtags';

import "./DeskCard.css"

export default function DeskCard({desk}) {
    const history = useHistory();

    const handleClick = () => {
        history.push("/desk/" + desk.user.user_id + "/" + desk._id);
    }

    const profilePicture = (desk && desk.user && desk.user.picture) &&
        <Image src={desk.user.picture} style={{ width: "30px", height: "30px" }} alt="" roundedCircle />

    let date = new Date(desk.date_created).toLocaleDateString("en-US");

    return (
        <div>
            {<Card
                variant="light"
                className="DeskCard"
                onClick={handleClick}>
                <Card.Header>
                    <Row style={{margin: 0}}>
                        {profilePicture} &nbsp;
                        
                        <div className="DeskCardHeader">
                            <h6>{(desk && desk.user && desk.user.picture) && desk.user.name}</h6>
                            <p>{date}</p>
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
            </Card>}
        </div>
    );
}