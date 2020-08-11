import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_DESK } from '../../util/api';
import DeskComponent from '../../components/DeskComponent/DeskComponent';
import { useAuth0 } from '../../util/react-auth0-spa';

export default function Desk(props) {
    let path = props.location.pathname.split("/");
    let username = path[2];
    let deskId = path[3];

    let { user, loading } = useAuth0();

    const { data } = useQuery(GET_DESK, {
        variables: {
            filter: {
                _id: deskId,
                user: username
            }
        },
    });
    let desk = data ? data.deskOne : null;

    if (!loading) {
        if (user && desk && !desk.approved && user.sub !== desk.user.user_id) {
            return <></>;
        } else if (!user && desk && !desk.approved) {
            return <></>;
        }
    }

    return (
        <div className="ContentBody">
            <div className="DeskBody">
                <DeskComponent desk={desk} commentSection={true} />
            </div>
        </div>
    )
}