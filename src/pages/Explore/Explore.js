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
        <div className="body">
            <Form>
            <Row>
                <Col xs={6}>
                    <Form.Group controlId="search">
                        <Form.Control type="email" placeholder="Search for desks, @users, products, #tags, brands"/>
                        <Form.Text className="text-muted">This is some informative text.</Form.Text>
                    </Form.Group>
                </Col>
                <Col>
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
                </Col>
            </Row>
            </Form>

            <div className="DeskGrid">
                {desks.map((desk, i) => <DeskCard key={i} desk={desk}/>)}
            </div>
        </div>
    );
}