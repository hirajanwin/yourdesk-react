import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_DESK } from '../../util/api';
import DeskComponent from '../../components/DeskComponent/DeskComponent';

export default function Desk(props) {
    let path = props.location.pathname.split("/");
    let username = path[2];
    let deskId = path[3];

    const { data } = useQuery(GET_DESK, {
        variables: {
            filter: {
                _id: deskId,
                user: username
            }
        }
    });
    let desk = data ? data.deskOne: null;

    return (
        <div className="DeskBody">
            <DeskComponent desk={desk} commentSection={true}/>
        </div>
    )
}