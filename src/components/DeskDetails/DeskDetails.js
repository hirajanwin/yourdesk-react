import React from 'react';
import './DeskDetails.css';
import { Card } from 'react-bootstrap';
import Hashtags from '../Util/Hashtags';
import Likes from '../Util/Likes';

export default function DeskDetails(props) {
    let { desk } = props;
    let date = new Date(desk.date_created).toDateString();
    return (
        <div className="DeskDetails">
            <Card body className="DeskDetailsCard" >
                {
                    desk &&
                    <div>
                        <p style={{ fontSize: 25 }}>
                            <b>{desk.name}</b>
                        </p>
                        <p style={{ fontSize: 20 }}>
                            <a style={{ color: "black" }} href={`/profile/${desk.user.user_id}`}>{desk.user.name}</a>
                        </p>
                        <p>{date}</p>
                        <p>{desk.about}</p>

                        {!desk.approved && <b style={{color: "red"}}>This desk has not been approved yet. Only you can view it.</b>}

                        <Hashtags hashtags={desk.hashtags} block />
                        <div style={{paddingLeft: 15}}>
                            <Likes desk={desk} />
                        </div>
                    </div>
                }
            </Card>
        </div>
    )
}