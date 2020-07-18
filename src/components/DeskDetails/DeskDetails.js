import React from 'react';
import './DeskDetails.css';
import { Card } from 'react-bootstrap';

export default function DeskDetails(props) {
    let { desk } = props;
    let date = new Date(desk.date_created).toLocaleDateString("en-US");
    return (
        <div className="DeskDetails">
            <Card body style={{marginRight: 20}}>
                {
                    desk &&
                    <div>
                        <p style={{fontSize: 25}}>
                            <b>{desk.name}</b>
                        </p>
                        <p style={{fontSize: 20}}>
                            <i>{desk.user.name}</i>
                        </p>
                        <p>{date}</p>
                        <b>What do you use this desk for?</b>
                        <p>{desk.use}</p>
                        <b>Which is your favorite product?</b>
                        <p>{desk.favorite}</p>
                    </div>
                }
            </Card>
        </div>
    )
}