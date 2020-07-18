import React from 'react';

import { Badge } from 'react-bootstrap';

import './Util.css';


function getColor(hashtag) {
    switch (hashtag) {
        case "featured":
            return "#17A2B8"
        case "cool":
            return "red"
        case "minimal":
            return "#DDDDDD"
        case "bad":
            return "#CD6155"
        case "gaming":
            return "#E74C3C"
        case "hipster":
            return "#D5F5E3"
        case "hipster":
            return "#D5F5E3"
        case "hipster":
            return "#D5F5E3"
        case "hipster":
            return "#D5F5E3"
        default:
            return "gray"
    }
}


export default function Hashtags({ hashtags, overflowHidden, block }) {

    let style = { display: "flex", flexDirection: "row" }
    if (overflowHidden) {
        style.overflow = "hidden"
    }

    if (block) {
        style = {}
    }

    return (
        <h5>
            <div style={style}>
                {hashtags.map(
                    (hashtag, i) => <Badge key={i}
                        className="Hashtag"
                        style={{
                            fontWeight: "light",
                            color: "white",
                            backgroundColor: getColor(hashtag),
                            marginLeft: 2,
                            marginRight: 2
                        }}>#{hashtag}</Badge>
                )}
            </div>
        </h5>
    )
}