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
    for (i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

function getColor(hashtag) {
    return customColors[hashtag] || stringToColour(hashtag);
}

const redBlue = "linear-gradient(45deg, red, blue)"
const niceIg = "linear-gradient(45deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
const megatron = "linear-gradient(135deg, #000046, #1cb5e0)"

const customImages = {
    fbintern: niceIg,
    fbinterns2020: niceIg,
    facebook: redBlue,
    thicczucc: megatron,
}

function getImage(hashtag) {
    return customImages[hashtag];
}

export default function Hashtags({ hashtags, overflowHidden, block }) {

    let style = { display: "flex", flexDirection: "row", minHeight: 15 }
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
                            backgroundImage: getImage(hashtag),
                            backgroundColor: getColor(hashtag),
                            marginLeft: 2,
                            marginRight: 2,
                            fontSize: "x-small"
                        }}>#{hashtag}</Badge>
                )}
            </div>
        </h5>
    )
}