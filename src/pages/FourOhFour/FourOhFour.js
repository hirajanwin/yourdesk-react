import React from 'react';

import image from '../../assets/lost-tourist.png'
import './FourOhFour.css';

export default function FourOhFour() {
    return (
        <div className="ContentBody">
            <div className="FourBody">
                <img src={image} alt="" width={800}/>
                <h1 className="FourText">404!</h1>
            </div>
        </div>
    );
}