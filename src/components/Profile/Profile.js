import React from "react";
import { useAuth0 } from "../../util/react-auth0-spa";
import { Image, Card } from 'react-bootstrap';

import "./Profile.css"

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Body">
      <div className="ProfileBody">
        <Card style={{padding: 10, maxWidth: 500, margin: "0 auto", textAlign: "left"}}> 
          <Image src={user.picture} style={{width: "200px", height: "200px"}} alt="Profile"/>
          <h2>{user.name}</h2>
          {Object.keys(user).map((k, i) => <p key={i}><b>{k}</b>{": " + user[k]}</p>)}
          <i>This is all the information safely stored in <a href="https://auth0.com/">Auth0</a>.</i>
        </Card>
      </div>
    </div>
  );
};

export default Profile;