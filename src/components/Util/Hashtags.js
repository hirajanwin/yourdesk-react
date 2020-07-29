import React from 'react';

import { Badge } from 'react-bootstrap';

import './Util.css';

const customColors = {
    featured: "#559977",
    cool: "#4baddd",
    wfh: "#fbb901",
    fb: "#3b5998",
    fbinterns: "#3b5998",
    fbinterns2020: "#3b5998",
    facebook: "#3b5998",
    minimal: "#DDDDDD",
    bad: "#905424",
    gaming: "#ce494a",
    lol: "#F9C72B",
    hipster: "#feb6ff",
    pokimane: "#eeaaaa",
    design: "#7F64B8",
}

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

function getColor(hashtag) {
    return customColors[hashtag] || stringToColour(hashtag);
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
                            marginRight: 2,
                            fontSize: "small"
                        }}>#{hashtag}</Badge>
                )}
            </div>
        </h5>
    )
}