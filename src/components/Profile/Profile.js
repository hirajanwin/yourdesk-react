import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Image } from 'react-bootstrap';


const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body">
        <Image src={user.picture} style={{width: "200px", height: "200px"}} alt="Profile"/>
        <h2>{user.name}</h2>
        <p>For transparency, this is all the information stored by Auth0 <strong>(other users cannot view this)</strong>:</p>
        {Object.keys(user).map((k, i) => <p key={i}>{k + ": " + user[k]}</p>)}
    </div>
  );
};

export default Profile;