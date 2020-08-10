import React from 'react';
import DeskCard from '../../components/DeskCard/DeskCard';
import { Row } from 'react-bootstrap';
import { GET_DESKS } from '../../util/api';
import { useQuery } from '@apollo/react-hooks';
import "./Explore.css";


export default function Explore() {
    const { data } = useQuery(GET_DESKS, {
        variables: {
            filter: {
                approved: true,
            }
        },
        pollInterval: 300
    });
    let desks = data ? data.deskMany : [];

    desks = desks.sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created);
    });

    // Group into list of lists of desks to fit formatting of grid below
    let groupedDesks = [];
    let groupSize = 2;
    for (let i = 0; i < desks.length; i++) {
        if (i % groupSize === 0) {
            groupedDesks.push([])
        }
        groupedDesks[groupedDesks.length - 1].push(desks[i]);
    }

    return (
        <div className="ContentBody">
            {/* <Form className="ExploreSearchBar">
                <Row>
                    <Col>
                        <Form.Group controlId="search">
                            <Form.Control type="email" placeholder="Search for desks, @users, products, #tags, brands" />
                            <Form.Text className="text-muted">&nbsp;Search not implemented yet. Use ⌘F.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Button style={{marginLeft: -10, height: 38}}disabled={true} variant="primary" type="submit">
                        Search
                    </Button>
                </Row>
            </Form> */}

            <div className="DeskGrid">
                {groupedDesks.map((desks, i) => {
                    return (<Row key={i}>
                        {desks.map((desk, ii) => <DeskCard key={ii} desk={desk} />)}
                    </Row>);
                })}
            </div>
        </div>
    );
}