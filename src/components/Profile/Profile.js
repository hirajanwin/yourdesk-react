import React from "react";
import { Image, Card } from 'react-bootstrap';
import { GET_DESKS_BY_USER } from '../../util/api';
import DeskCard from '../../components/DeskCard/DeskCard';

import { useAuth0 } from "../../util/react-auth0-spa";
import { useQuery } from '@apollo/react-hooks';

import "./Profile.css"


function Profile(props) {
  let path = props.location.pathname.split("/");
  let userId = path[2];

  const { loading, user } = useAuth0();
  const { data } = useQuery(GET_DESKS_BY_USER, {
    variables: {
      userId: userId
    },
  });

  if (loading || !user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="Body">
      <div className="ProfileBody">
        <Card style={{ margin: 10, padding: 10, minWidth: 300, textAlign: "left" }}>
          <Image src={user.picture} style={{ width: "100px", height: "100px" }} alt="Profile" />
          <h2>{user.name}</h2>
          <p>Published desks: {data && data.deskMany.length.toString()} </p>
        </Card>
        {
          data &&
          <div className="ProfileDesks">
            {data.deskMany.map((desk, i) => {
              return <DeskCard key={i} notLikeable={user.sub === desk.user.user_id} desk={desk} />
            })}
          </div>
        }
      </div>
    </div>
  );
};

export default Profile;