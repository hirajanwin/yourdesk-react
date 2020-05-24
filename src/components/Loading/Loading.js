import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loading.css'

export default function Loading() {

    return (
        <div className="Loading">
            <Spinner animation="border" />
        </div>
    )
}