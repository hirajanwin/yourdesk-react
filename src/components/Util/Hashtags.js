import React from 'react';

import { Badge } from 'react-bootstrap';

import './Util.css';

const colors = {
    featured: "#45ca66",
    cool: "#4baddd",
    wfh: "#fbb901",
    fb: "#3b5998",
    fbinterns: "#3b5998",
    fbinterns2020: "#3b5998",
    facebook: "#3b5998",
    minimal: "#DDDDDD",
    bad: "#905424",
    gaming: "#ce494a",
    lol: "#ffe700",
    hipster: "#feb6ff",
}

function getColor(hashtag) {
    return colors[hashtag]  || "gray"
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