import React from 'react';
import './DeskDetails.css';

export default function DeskDetails(props) {
    let { desk } = props;
    let date = new Date(desk.date_created).toLocaleDateString("en-US");
    return (
        <div className="DeskDetails">
            {
            desk &&
            <div>
                <p>
                    <b>{desk.name}</b>
                </p>
                <p>
                    <i>{desk.user.name}</i>
                </p>
                <p><b>Date:</b> {date}</p>
                <b>What do you use this desk for?</b>
                <p>{desk.use}</p>
                <b>Which is your favorite product?</b>
                <p>{desk.favorite}</p>
            </div>
            }   
        </div>
    )
}