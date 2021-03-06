import React from 'react';
import { Row } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useMutation } from '@apollo/react-hooks';
import { TOGGLE_LIKE_DESK } from '../../util/api';
import { useAuth0 } from "../../util/react-auth0-spa";

import './Util.css'


export default function Likes({ desk }) {

    const { user, loginWithPopup } = useAuth0();
    const [toggleLikeDesk] = useMutation(TOGGLE_LIKE_DESK);

    const notLiked = <FaRegHeart size="1.3em" />;
    const liked = <FaHeart color="#ED4955" size="1.3em" />;

    function toggleLike(e) {
        // Prevent inner onclick to trigger outer onclick
        if (!e) e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        if (!user) {
            loginWithPopup();
            return;
        }

        toggleLikeDesk({
            variables: {
                user: user.sub,
                id: desk._id
            }
        }).then(() => {
            window.location.reload();
        });
    }

    return (
        <Row className="LikeRow" onClick={toggleLike}>
            <p  >{desk.likes.length}&nbsp;
            {user ?
                    (desk.likes.includes(user.sub) ? liked : notLiked) :
                    notLiked}
            </p>
        </Row>
    )
}