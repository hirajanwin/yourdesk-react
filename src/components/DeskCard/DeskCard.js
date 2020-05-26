import React from 'react';
import { Card, Button, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function DeskCard(props) {
    const { desk } = props;
    let date = new Date(desk.date_created).toLocaleDateString("en-US");
    const history = useHistory();

    const handleClick = () => {
        history.push("/desk/" + desk.user.user_id + "/"+ desk._id);
    }
    
    return (
        <div>
            { <Button 
            variant="light" 
            href={(desk && desk.user && desk.user.user_id) && "/desk/" + desk.user.user_id + "/"+ desk._id}  as={Card} 
            style={{ width: '18rem', margin: '10px', cursor:'pointer' }} 
            onClick={handleClick}>
            <Card.Img variant="top" src={desk.img} thumbnail="true" height="200px"/>
            <Card.Body>
                <Card.Title>{desk.name}</Card.Title>
                <Row style={{margin: '0 auto', justifyContent: 'center'}}>
                    {(desk && desk.user && desk.user.picture) && <Image src={desk.user.picture} style={{width: "30px", height: "30px"}} alt="" roundedCircle/>}
                    &nbsp;
                    <Card.Text>{(desk && desk.user && desk.user.picture) && desk.user.name}</Card.Text>
                </Row>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted">Created {date}</small>
            </Card.Footer>
            </Button>}
        </div>
    );
}