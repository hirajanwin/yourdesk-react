import React from 'react';
import DeskCard from '../../components/DeskCard/DeskCard';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { GET_DESKS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';
import "./Explore.css";


export default function Explore() {
    const { data } = useQuery(GET_DESKS);
    let desks = data ? data.deskMany : [];

    return (
        <div className="Body">
            <Form>
                <Row>
                    <Col xs={6}>
                        <Form.Group controlId="search">
                            <Form.Control type="email" placeholder="Search for desks, @users, products, #tags, brands" />
                            <Form.Text className="text-muted">&nbsp;Search is not working yet "Command F" for now <span role="img" aria-label="laughing-emoji">😂</span>.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Button style={{marginLeft: -8, height: 38}}disabled={true} variant="primary" type="submit">
                        Search
                    </Button>
                </Row>
            </Form>

            <div className="DeskGrid">
                {desks.map((desk, i) => <DeskCard key={i} desk={desk} />)}
            </div>
        </div>
    );
}